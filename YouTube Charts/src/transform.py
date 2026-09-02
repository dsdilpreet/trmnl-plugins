from datetime import datetime, timedelta, timezone
import requests


CHART_URL = "https://charts.youtube.com/youtubei/v1/browse?alt=json"
REQUEST_TIMEOUT_SECONDS = 4
DEFAULT_COUNTRY_CODE = "global"
DEFAULT_COUNTRY_NAME = "Global"
DEFAULT_TOP_N = 16
TARGET_TOP_VIEWS_LIST_TYPE = "TOP_VIEWS_CHART"
TARGET_TRENDING_LIST_TYPE = "TRENDING_CHART"
TARGET_CHART_PERIOD_TYPE_DAILY = "CHART_PERIOD_TYPE_DAILY"
TARGET_CHART_PERIOD_TYPE_WEEKLY = "CHART_PERIOD_TYPE_WEEKLY"
COUNTRY_CODE_MAP = {
    "argentina": "AR",
    "australia": "AU",
    "austria": "AT",
    "belgium": "BE",
    "bolivia": "BO",
    "brazil": "BR",
    "canada": "CA",
    "chile": "CL",
    "colombia": "CO",
    "costa_rica": "CR",
    "czechia": "CZ",
    "denmark": "DK",
    "dominican_republic": "DO",
    "ecuador": "EC",
    "egypt": "EG",
    "el_salvador": "SV",
    "estonia": "EE",
    "finland": "FI",
    "france": "FR",
    "germany": "DE",
    "guatemala": "GT",
    "honduras": "HN",
    "hong_kong": "HK",
    "hungary": "HU",
    "iceland": "IS",
    "india": "IN",
    "indonesia": "ID",
    "ireland": "IE",
    "israel": "IL",
    "italy": "IT",
    "japan": "JP",
    "kenya": "KE",
    "luxembourg": "LU",
    "malaysia": "MY",
    "mexico": "MX",
    "netherlands": "NL",
    "new_zealand": "NZ",
    "nicaragua": "NI",
    "nigeria": "NG",
    "norway": "NO",
    "panama": "PA",
    "paraguay": "PY",
    "peru": "PE",
    "philippines": "PH",
    "poland": "PL",
    "portugal": "PT",
    "romania": "RO",
    "russia": "RU",
    "saudi_arabia": "SA",
    "serbia": "RS",
    "singapore": "SG",
    "south_africa": "ZA",
    "south_korea": "KR",
    "spain": "ES",
    "sweden": "SE",
    "switzerland": "CH",
    "taiwan": "TW",
    "tanzania": "TZ",
    "thailand": "TH",
    "turkey": "TR",
    "uganda": "UG",
    "ukraine": "UA",
    "united_arab_emirates": "AE",
    "united_kingdom": "GB",
    "united_states": "US",
    "uruguay": "UY",
    "vietnam": "VN",
    "zimbabwe": "ZW",
}


def normalize_country_key(country):
    if not isinstance(country, str):
        return ""

    normalized = country.strip().lower()
    if not normalized:
        return ""

    # Accept either spaces or underscores from settings and normalize to map keys.
    return normalized.replace(" ", "_")


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

    country_key = normalize_country_key(country)
    if not country_key:
        return DEFAULT_COUNTRY_CODE

    return COUNTRY_CODE_MAP.get(country_key, DEFAULT_COUNTRY_CODE)


def get_country_name(input_data):
    country = (
        input_data.get("trmnl", {})
        .get("plugin_settings", {})
        .get("custom_fields_values", {})
        .get("country", "")
    )

    country_key = normalize_country_key(country)
    if not country_key:
        return DEFAULT_COUNTRY_NAME

    return country_key.replace("_", " ").title()


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


def format_view_count(value):
    if value is None:
        return "-"

    if isinstance(value, int):
        numeric_value = value
    elif isinstance(value, str):
        normalized = value.strip().lower().replace(",", "")
        if normalized.endswith(" views"):
            normalized = normalized[:-6]
        if not normalized.isdigit():
            return value
        numeric_value = int(normalized)
    else:
        return value

    suffixes = (
        (1_000_000_000, "b"),
        (1_000_000, "m"),
        (1_000, "k"),
    )
    for threshold, suffix in suffixes:
        if numeric_value >= threshold:
            short_value = numeric_value / threshold
            if short_value >= 10 or numeric_value % threshold == 0:
                return f"{int(short_value)}{suffix}"
            return f"{short_value:.1f}".rstrip("0").rstrip(".") + suffix

    return str(numeric_value)


def format_release_date(release_date):
    if not isinstance(release_date, dict):
        return "-"

    year = release_date.get("year")
    month = release_date.get("month")
    day = release_date.get("day")

    try:
        year = int(year)
        month = int(month)
        day = int(day)
    except (TypeError, ValueError):
        return "-"

    if year <= 0:
        return "-"

    try:
        parsed_date = datetime(year, month, day)
    except ValueError:
        return "-"

    return parsed_date.strftime("%Y-%m-%d")


def extract_thumbnail(track):
    thumbnail_obj = track.get("thumbnail")
    if not isinstance(thumbnail_obj, dict):
        return None

    thumbnails = thumbnail_obj.get("thumbnails", [])
    if not thumbnails:
        return None

    best_thumbnail = max(
        thumbnails,
        key=lambda item: item.get("width", 0) * item.get("height", 0),
    )
    return best_thumbnail.get("url")


def build_top_track(track):
    meta = track.get("chartEntryMetadata", {})
    thumbnail_url = extract_thumbnail(track)

    return {
        "title": track.get("name", "Unknown"),
        "artists": format_artists(track.get("artists", [])),
        "thumbnailUrl": thumbnail_url,
        "viewCount": format_view_count(track.get("viewCount")),
        "currentPosition": meta.get("currentPosition", "-"),
        "previousPosition": meta.get("previousPosition", "-"),
        "percentViewsChange": format_change(meta.get("percentViewsChange")),
        "periodsOnChart": meta.get("periodsOnChart", "-"),
    }


def build_video_view(video):
    meta = video.get("chartEntryMetadata", {})
    thumbnail_url = extract_thumbnail(video)
    release_date = video.get("releaseDate")
    return {
        "title": video.get("title", "Unknown"),
        "artists": format_artists(video.get("artists", [])),
        "thumbnailUrl": thumbnail_url,
        "releaseDate": format_release_date(release_date),
        "viewCount": format_view_count(video.get("viewCount")),
        "currentPosition": meta.get("currentPosition", "-"),
        "previousPosition": meta.get("previousPosition", "-"),
        "percentViewsChange": format_change(meta.get("percentViewsChange")),
        "periodsOnChart": meta.get("periodsOnChart", "-"),
    }


def build_track_chart_type(track_type, top_n):
    track_views = []
    for track in track_type.get("trackViews", [])[:top_n]:
        track_views.append(build_top_track(track))

    return {
        "listType": track_type.get("listType"),
        "chartPeriodType": track_type.get("chartPeriodType"),
        "endDate": track_type.get("endDate"),
        "trackViews": track_views,
    }


def build_video_chart_type(track_type, top_n):
    video_views = []
    for video in track_type.get("videoViews", [])[:top_n]:
        video_views.append(build_video_view(video))

    return {
        "listType": track_type.get("listType"),
        "chartPeriodType": track_type.get("chartPeriodType"),
        "endDate": track_type.get("endDate"),
        "videoViews": video_views,
    }


def find_chart_type(track_types, list_type, chart_period_type=None):
    for track_type in track_types:
        if track_type.get("listType") != list_type:
            continue
        if chart_period_type is not None and track_type.get("chartPeriodType") != chart_period_type:
            continue
        return track_type
    return None


def build_custom_chart_json(api_data, country_code, country_name, top_n):
    section_contents = (
        api_data.get("contents", {})
        .get("sectionListRenderer", {})
        .get("contents", [])
    )

    all_track_types = []
    all_video_types = []
    for section in section_contents:
        renderer = section.get("musicAnalyticsSectionRenderer", {})
        content = renderer.get("content", {})
        all_track_types.extend(content.get("trackTypes", []))
        all_video_types.extend(content.get("videos", []))

    tracks_daily = find_chart_type(all_track_types, TARGET_TOP_VIEWS_LIST_TYPE, TARGET_CHART_PERIOD_TYPE_DAILY)
    tracks_weekly = find_chart_type(all_track_types, TARGET_TOP_VIEWS_LIST_TYPE, TARGET_CHART_PERIOD_TYPE_WEEKLY)
    videos_daily = find_chart_type(all_video_types, TARGET_TOP_VIEWS_LIST_TYPE, TARGET_CHART_PERIOD_TYPE_DAILY)
    videos_weekly = find_chart_type(all_video_types, TARGET_TOP_VIEWS_LIST_TYPE, TARGET_CHART_PERIOD_TYPE_WEEKLY)
    videos_trending = find_chart_type(all_video_types, TARGET_TRENDING_LIST_TYPE)

    return {
        "country": {
            "name": country_name,
            "code": country_code,
        },
        "tracksDaily": build_track_chart_type(tracks_daily, top_n) if tracks_daily else None,
        "tracksWeekly": build_track_chart_type(tracks_weekly, top_n) if tracks_weekly else None,
        "videosDaily": build_video_chart_type(videos_daily, top_n) if videos_daily else None,
        "videosWeekly": build_video_chart_type(videos_weekly, top_n) if videos_weekly else None,
        "videosTrending": build_video_chart_type(videos_trending, top_n) if videos_trending else None,
    }


def run(input):
    country_code = get_country_code(input)
    country_name = get_country_name(input)
    top_n = DEFAULT_TOP_N
    last_updated_local_time = get_user_local_time(input)

    try:
        api_data = fetch_chart_data(country_code, input)
        output = build_custom_chart_json(api_data, country_code, country_name, top_n)
        output["lastUpdatedLocalTime"] = last_updated_local_time
        return output
    except requests.RequestException as exc:
        return {
            "error": "Request failed",
            "country": {
                "name": country_name,
                "code": country_code,
            },
            "lastUpdatedLocalTime": last_updated_local_time,
            "message": str(exc),
        }
    except ValueError as exc:
        return {
            "error": "Invalid JSON response",
            "country": {
                "name": country_name,
                "code": country_code,
            },
            "lastUpdatedLocalTime": last_updated_local_time,
            "message": str(exc),
        }