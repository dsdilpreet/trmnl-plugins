from datetime import datetime, timedelta, timezone
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests


BASE_URL = "https://health.googleapis.com/v4/users/me/dataTypes"
REQUEST_TIMEOUT_SECONDS = 4.0
MAX_WORKERS = 5


def get_auth_header(input):
    access_token = input["trmnl"]["oauth"]["access_token"]
    if access_token.startswith("Bearer "):
        return access_token
    return f"Bearer {access_token}"


def get_user_timezone(input):
    user_data = input.get("trmnl", {}).get("user", {})
    utc_offset_seconds = user_data.get("utc_offset", 0)
    return timezone(timedelta(seconds=utc_offset_seconds))


def get_payload(from_local, to_local):
    return {
        "range": {
            "start": {
                "date": {
                    "year": from_local.year,
                    "month": from_local.month,
                    "day": from_local.day
                },
                "time": {"hours": 0, "minutes": 0, "seconds": 0, "nanos": 0}
            },
            "end": {
                "date": {
                    "year": to_local.year,
                    "month": to_local.month,
                    "day": to_local.day
                },
                "time": {"hours": 23, "minutes": 59, "seconds": 59, "nanos": 0}
            }
        },
        "windowSizeDays": 1
    }


def call_google_health_api(auth_header, endpoint, method="GET", payload=None, params=None):
    url = f"{BASE_URL}/{endpoint.lstrip('/')}"
    headers = {
        "Authorization": auth_header,
    }

    response = requests.request(
        method=method.upper(),
        url=url,
        headers=headers,
        json=payload,
        params=params,
        timeout=REQUEST_TIMEOUT_SECONDS,
    )

    return response


def parse_response_json(response):
    try:
        return response.json()
    except ValueError:
        return {
            "error": "Invalid JSON response",
            "statusCode": response.status_code,
            "body": response.text,
        }


def execute_health_request(request_config, auth_header):
    key = request_config["key"]
    try:
        response = call_google_health_api(
            auth_header=auth_header,
            endpoint=request_config["endpoint"],
            method=request_config["method"],
            payload=request_config.get("payload"),
            params=request_config.get("params"),
        )
        return key, parse_response_json(response)
    except requests.RequestException as exc:
        return key, {
            "error": "Request failed",
            "message": str(exc),
        }


def run(input):
    auth_header = get_auth_header(input)
    user_tz = get_user_timezone(input)

    to_local = datetime.now(user_tz)
    from_local = to_local
    #from_local = to_local - timedelta(days=7)

    payload = get_payload(from_local, to_local)

    request_configs = [
        {
            "key": "steps",
            "endpoint": "steps/dataPoints:dailyRollUp",
            "method": "POST",
            "payload": payload,
        },
        {
            "key": "totalCalories",
            "endpoint": "total-calories/dataPoints:dailyRollUp",
            "method": "POST",
            "payload": payload,
        },
        {
            "key": "activeZoneMinutes",
            "endpoint": "active-zone-minutes/dataPoints:dailyRollUp",
            "method": "POST",
            "payload": payload,
        },
        {
            "key": "restingHeartRate",
            "endpoint": "daily-resting-heart-rate/dataPoints:reconcile?pageSize=1",
            "method": "GET",
        },
        {
            "key": "heartRateVariability",
            "endpoint": "heart-rate-variability/dataPoints:reconcile?pageSize=1",
            "method": "GET",
        },
        {
            "key": "sleep",
            "endpoint": "sleep/dataPoints:reconcile?pageSize=1",
            "method": "GET",
        },
    ]

    results = {}
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = [
            executor.submit(execute_health_request, request_config, auth_header)
            for request_config in request_configs
        ]
        for future in as_completed(futures):
            key, value = future.result()
            results[key] = value

    results["lastUpdatedLocalTime"] = to_local.isoformat()

    return results