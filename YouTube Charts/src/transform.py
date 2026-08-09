from datetime import datetime, timedelta, timezone
import requests


CHART_URL = "https://charts.youtube.com/youtubei/v1/browse?alt=json"
REQUEST_TIMEOUT_SECONDS = 4
DEFAULT_COUNTRY_CODE = "global"
DEFAULT_TOP_N = 10
COUNTRY_CODE_MAP = {
    "argentina": "AR",
}


def get_trmnl_user(input_data):
    return input_data.get("trmnl", {}).get("user", {})


def get_user_timezone_name(input_data):
    user = get_trmnl_user(input_data)
    timezone_name = user.get("time_zone_iana") or user.get("time_zone")
    if isinstance(timezone_name, str) and timezone_name.strip():
        return timezone_name.strip()
    return "UTC"


def get_user_utc_offset_minutes(input_data):
    user = get_trmnl_user(input_data)
    raw_offset = user.get("utc_offset", 0)

    try:
        offset_value = int(raw_offset)
    except (TypeError, ValueError):
        return 0

    # TRMNL user.utc_offset is in seconds; YouTube header expects minutes.
    return int(offset_value / 60)


def build_request_headers(input_data):
    return {
        "Content-Type": "application/json",
        "X-YouTube-Time-Zone": get_user_timezone_name(input_data),
        "X-YouTube-Utc-Offset": str(get_user_utc_offset_minutes(input_data)),
    }


def get_user_local_time(input_data):
    utc_offset_seconds = get_trmnl_user(input_data).get("utc_offset", 0)

    try:
        offset_seconds = int(utc_offset_seconds)
    except (TypeError, ValueError):
        offset_seconds = 0

    user_tz = timezone(timedelta(seconds=offset_seconds))
    return datetime.now(user_tz).isoformat()


def get_country_code(input_data):
    country = (
        input_data.get("trmnl", {})
        .get("plugin_settings", {})
        .get("custom_fields_values", {})
        .get("country", "")
    )

    if not isinstance(country, str) or not country.strip():
        return DEFAULT_COUNTRY_CODE

    return COUNTRY_CODE_MAP.get(country.strip().lower(), DEFAULT_COUNTRY_CODE)


def build_request_payload(country_code):
    return {
        "context": {
            "client": {
                "clientName": "WEB_MUSIC_ANALYTICS",
                "clientVersion": "2.0",
                "hl": "en-US",
                "gl": "US",
                "theme": "MUSIC",
            },
            "capabilities": {},
            "request": {
                "internalExperimentFlags": [],
            },
        },
        "browseId": "FEmusic_analytics_charts_home",
        "query": (
            "flags=MusicCharts__enable_apac_and_shorts_charts_expansion"
            "&perspective=CHART_HOME"
            f"&chart_params_country_code={country_code}"
        ),
    }


def fetch_chart_data(country_code, input_data):
    headers = build_request_headers(input_data)
    payload = build_request_payload(country_code)

    response = requests.post(
        CHART_URL,
        json=payload,
        headers=headers,
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    response.raise_for_status()
    return response.json()


def format_artists(artists):
    if not artists:
        return "Unknown"
    return ", ".join(artist.get("name", "Unknown") for artist in artists)


def format_change(value):
    if value is None:
        return "-"
    return f"{value * 100:+.2f}%"


def extract_thumbnail(track):
    thumbnail_obj = track.get("thumbnail")
    if not isinstance(thumbnail_obj, dict):
        return None, None

    thumbnails = thumbnail_obj.get("thumbnails", [])
    if not thumbnails:
        return thumbnail_obj, None

    best_thumbnail = max(
        thumbnails,
        key=lambda item: item.get("width", 0) * item.get("height", 0),
    )
    return thumbnail_obj, best_thumbnail.get("url")


def build_custom_chart_json(api_data, country_code, top_n):
    section_contents = (
        api_data.get("contents", {})
        .get("sectionListRenderer", {})
        .get("contents", [])
    )

    custom_track_types = []
    for section in section_contents:
        renderer = section.get("musicAnalyticsSectionRenderer", {})
        track_types = renderer.get("content", {}).get("trackTypes", [])

        for track_type in track_types:
            top_tracks = []
            for track in track_type.get("trackViews", [])[:top_n]:
                meta = track.get("chartEntryMetadata", {})
                thumbnail_obj, thumbnail_url = extract_thumbnail(track)

                top_tracks.append(
                    {
                        "title": track.get("name", "Unknown"),
                        "artists": format_artists(track.get("artists", [])),
                        "thumbnail": thumbnail_obj,
                        "thumbnailUrl": thumbnail_url,
                        "viewCount": track.get("viewCount", "-"),
                        "currentPosition": meta.get("currentPosition", "-"),
                        "previousPosition": meta.get("previousPosition", "-"),
                        "percentViewsChange": format_change(meta.get("percentViewsChange")),
                        "periodsOnChart": meta.get("periodsOnChart", "-"),
                    }
                )

            custom_track_types.append(
                {
                    "listType": track_type.get("listType"),
                    "chartPeriodType": track_type.get("chartPeriodType"),
                    "endDate": track_type.get("endDate"),
                    "topTracks": top_tracks,
                }
            )

    return {
        "countryCode": country_code,
        "trackTypes": custom_track_types,
    }


def run(input):
    country_code = get_country_code(input)
    top_n = DEFAULT_TOP_N
    last_updated_local_time = get_user_local_time(input)

    try:
        api_data = fetch_chart_data(country_code, input)
        output = build_custom_chart_json(api_data, country_code, top_n)
        output["lastUpdatedLocalTime"] = last_updated_local_time
        return output
    except requests.RequestException as exc:
        return {
            "error": "Request failed",
            "countryCode": country_code,
            "lastUpdatedLocalTime": last_updated_local_time,
            "message": str(exc),
        }
    except ValueError as exc:
        return {
            "error": "Invalid JSON response",
            "countryCode": country_code,
            "lastUpdatedLocalTime": last_updated_local_time,
            "message": str(exc),
        }