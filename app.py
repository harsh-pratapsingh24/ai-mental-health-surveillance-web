import re
import math
import time
import random
from datetime import datetime, timedelta
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ==============================================================================
# In-Memory Clinical State & Anonymized Storage
# ==============================================================================
STATE = {
    "consent_given": False,
    "current_language": "en",  # 'en' or 'hi'
    "active_user_token": "USR-8941",
    "rolling_history": [
        {"date": "Day -6", "dpi": 0.28, "valence": 4, "arousal": 3, "pronoun_density": 0.04, "absolutist_score": 0.01},
        {"date": "Day -5", "dpi": 0.32, "valence": 4, "arousal": 3, "pronoun_density": 0.05, "absolutist_score": 0.02},
        {"date": "Day -4", "dpi": 0.39, "valence": 3, "arousal": 4, "pronoun_density": 0.07, "absolutist_score": 0.03},
        {"date": "Day -3", "dpi": 0.44, "valence": 3, "arousal": 4, "pronoun_density": 0.08, "absolutist_score": 0.04},
        {"date": "Day -2", "dpi": 0.58, "valence": 2, "arousal": 5, "pronoun_density": 0.11, "absolutist_score": 0.06},
        {"date": "Day -1", "dpi": 0.72, "valence": 2, "arousal": 5, "pronoun_density": 0.14, "absolutist_score": 0.08},
        {"date": "Today", "dpi": 0.84, "valence": 1, "arousal": 5, "pronoun_density": 0.18, "absolutist_score": 0.12},
    ],
    "counselor_queue": [
        {
            "case_id": "CASE-8941",
            "alias_token": "Anonymized Subject 8941",
            "tier": "Critical",
            "dpi": 0.84,
            "velocity": "+0.45/wk (Rapid Acceleration)",
            "pronoun_density": "18.2%",
            "absolutist_score": "12.0%",
            "crisis_intercept": True,
            "last_checkin": "12 minutes ago",
            "summary": "Reported overwhelming feelings of hopelessness, severe panic, and persistent reliving of trauma.",
            "status": "SEV-1 Triage Needed",
            "notes": "Triggered regex crisis intercept: Severe panic and inward cognitive withdrawal.",
            "room_url": "https://meet.jit.si/AegisMind-Case-8941"
        },
        {
            "case_id": "CASE-6210",
            "alias_token": "Anonymized Subject 6210",
            "tier": "Moderate",
            "dpi": 0.54,
            "velocity": "+0.08/wk (Stable Elevated)",
            "pronoun_density": "8.5%",
            "absolutist_score": "4.2%",
            "crisis_intercept": False,
            "last_checkin": "3 hours ago",
            "summary": "Moderate anxiety regarding relocation timeline; practicing 4-7-8 breathing regularly.",
            "status": "Routine Monitoring",
            "notes": "Responding well to peer community circles.",
            "room_url": "https://meet.jit.si/AegisMind-Case-6210"
        },
        {
            "case_id": "CASE-4103",
            "alias_token": "Anonymized Subject 4103",
            "tier": "Low",
            "dpi": 0.22,
            "velocity": "-0.12/wk (De-escalating)",
            "pronoun_density": "3.1%",
            "absolutist_score": "1.0%",
            "crisis_intercept": False,
            "last_checkin": "Yesterday",
            "summary": "Engaged in vocational peer training. Feeling grounded and sleeping restfully.",
            "status": "Maintenance",
            "notes": "Stable trajectory over past 14 days.",
            "room_url": "https://meet.jit.si/AegisMind-Case-4103"
        }
    ],
    "community_posts": [
        {
            "id": "post-1",
            "alias": "CalmRiver_42",
            "time_ago": "25 mins ago",
            "content": "Had a rough evening yesterday with loud thunder triggering old memories. Did the 4-7-8 breathing pacer twice and felt my pulse settle. We are stronger than our hardest moments.",
            "reactions": {"solidarity": 14, "strength": 9, "care": 21},
            "reported": False
        },
        {
            "id": "post-2",
            "alias": "QuietDawn_88",
            "time_ago": "2 hours ago",
            "content": "Just wanted to share a gentle reminder: healing isn't linear. Some days are about surviving, and that is more than enough. Sending peace to everyone in the relief centers.",
            "reactions": {"solidarity": 32, "strength": 18, "care": 45},
            "reported": False
        },
        {
            "id": "post-3",
            "alias": "SteadyOak_19",
            "time_ago": "5 hours ago",
            "content": "Reaching out to a counselor through Tele-MANAS took a lot of courage, but speaking to someone who truly listened made the burden feel lighter today.",
            "reactions": {"solidarity": 19, "strength": 27, "care": 31},
            "reported": False
        }
    ]
}

# ==============================================================================
# Psycholinguistic & Trajectory Engine (Deterministic Logic)
# ==============================================================================
PRONOUNS_1ST_PERSON = {"i", "me", "my", "myself", "mine", "im", "i'm"}
ABSOLUTIST_WORDS = {
    "always", "never", "completely", "nothing", "everyone", "impossible",
    "everything", "totally", "entirely", "constantly", "forever", "nobody", "nowhere"
}
CRISIS_REGEX = re.compile(
    r"\b(want\s+to\s+die|kill\s+myself|end\s+it\s+all|better\s+off\s+dead|can'?t\s+go\s+on|suicide|take\s+my\s+life|hang\s+myself|hurt\s+myself)\b",
    re.IGNORECASE
)

def evaluate_psycholinguistics(text: str, valence: int, arousal: int, voice_cadence: float = None):
    words = re.findall(r"\b\w+\b", (text or "").lower())
    total_words = max(len(words), 1)

    # 1. Pronoun Density (Inward Cognitive Withdrawal)
    pronoun_count = sum(1 for w in words if w in PRONOUNS_1ST_PERSON)
    pronoun_density = pronoun_count / total_words

    # 2. Absolutist Scanner (Cognitive Rigidity)
    absolutist_count = sum(1 for w in words if w in ABSOLUTIST_WORDS)
    absolutist_ratio = absolutist_count / total_words

    # 3. Crisis Regex Intercept
    crisis_match = bool(CRISIS_REGEX.search(text or ""))

    # 4. Distress Prediction Index (DPI: 0.00 to 1.00)
    # Valence: 1 (very unpleasant) to 5 (very pleasant) -> (5 - valence) / 4
    # Arousal: 1 (calm/exhausted) to 5 (hyperaroused/agitated) -> (arousal - 1) / 4
    val_component = (5 - valence) / 4.0
    aro_component = (arousal - 1) / 4.0
    ling_component = min(1.0, (pronoun_density * 3.5) + (absolutist_ratio * 4.0))

    if voice_cadence is not None:
        cadence_component = max(0.0, min(1.0, (1.0 - voice_cadence)))
        raw_dpi = (0.35 * val_component) + (0.20 * aro_component) + (0.30 * ling_component) + (0.15 * cadence_component)
    else:
        raw_dpi = (0.45 * val_component) + (0.25 * aro_component) + (0.30 * ling_component)

    if crisis_match:
        dpi = max(0.88, min(0.99, raw_dpi + 0.35))
    else:
        dpi = max(0.05, min(0.95, raw_dpi))

    # 5. Risk Matrix Triage
    if dpi >= 0.70 or crisis_match:
        tier = "Critical"
        recommendation = "CRITICAL: Immediate UI safety protocol engaged. SEV-1 counselor queue routing & emergency hotline dispatch."
    elif dpi >= 0.40:
        tier = "Moderate"
        recommendation = "MODERATE: Guided 4-7-8 breathing, peer support forum prompts, and proactive counselor review."
    else:
        tier = "Low"
        recommendation = "LOW: Psychoeducational grounding, positive reinforcement, and maintenance check-in cadence."

    return {
        "dpi": round(dpi, 2),
        "tier": tier,
        "pronoun_density": round(pronoun_density * 100, 1),
        "absolutist_ratio": round(absolutist_ratio * 100, 1),
        "crisis_intercept": crisis_match,
        "recommendation": recommendation,
        "words_analyzed": total_words
    }

# ==============================================================================
# Routes & API Endpoints
# ==============================================================================
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/telemetry/consent", methods=["POST"])
def set_consent():
    data = request.get_json() or {}
    STATE["consent_given"] = bool(data.get("consent", True))
    return jsonify({"status": "success", "consent_given": STATE["consent_given"]})

@app.route("/api/checkin", methods=["POST"])
def handle_checkin():
    data = request.get_json() or {}
    text = data.get("text", "")
    valence = int(data.get("valence", 3))
    arousal = int(data.get("arousal", 3))
    voice_cadence = data.get("voice_cadence")
    if voice_cadence is not None:
        voice_cadence = float(voice_cadence)

    results = evaluate_psycholinguistics(text, valence, arousal, voice_cadence)

    # Calculate Trajectory Velocity (ΔDPI vs historical 7-day baseline)
    baseline_avg = sum(h["dpi"] for h in STATE["rolling_history"][:6]) / 6.0
    delta_dpi = results["dpi"] - baseline_avg
    velocity_str = f"{'+' if delta_dpi >= 0 else ''}{round(delta_dpi, 2)} ΔDPI"

    # Update rolling history
    today_record = {
        "date": "Today",
        "dpi": results["dpi"],
        "valence": valence,
        "arousal": arousal,
        "pronoun_density": results["pronoun_density"] / 100.0,
        "absolutist_score": results["absolutist_ratio"] / 100.0
    }
    STATE["rolling_history"][-1] = today_record

    # If critical, update counselor queue item
    if results["tier"] == "Critical":
        STATE["counselor_queue"][0]["dpi"] = results["dpi"]
        STATE["counselor_queue"][0]["velocity"] = f"{velocity_str} (Critical Spike)"
        STATE["counselor_queue"][0]["pronoun_density"] = f"{results['pronoun_density']}%"
        STATE["counselor_queue"][0]["absolutist_score"] = f"{results['absolutist_ratio']}%"
        STATE["counselor_queue"][0]["crisis_intercept"] = results["crisis_intercept"]
        STATE["counselor_queue"][0]["summary"] = text or "Severe acute distress flag with elevated psycholinguistic density."
        STATE["counselor_queue"][0]["status"] = "SEV-1 Triage Needed"

    return jsonify({
        "status": "success",
        "analysis": results,
        "velocity": velocity_str,
        "rolling_history": STATE["rolling_history"]
    })

@app.route("/api/cases", methods=["GET"])
def get_cases():
    return jsonify({
        "status": "success",
        "queue": STATE["counselor_queue"],
        "rolling_history": STATE["rolling_history"]
    })

@app.route("/api/cases/<case_id>/escalate", methods=["POST"])
def escalate_case(case_id):
    data = request.get_json() or {}
    channel = data.get("channel", "Tele-MANAS Outbound")
    for item in STATE["counselor_queue"]:
        if item["case_id"] == case_id:
            item["status"] = f"Escalated via {channel}"
            item["escalated_at"] = datetime.now().strftime("%H:%M:%S")
            return jsonify({"status": "success", "case": item})
    return jsonify({"status": "error", "message": "Case not found"}), 404

@app.route("/api/cases/<case_id>/notes", methods=["POST"])
def update_case_notes(case_id):
    data = request.get_json() or {}
    notes = data.get("notes", "")
    for item in STATE["counselor_queue"]:
        if item["case_id"] == case_id:
            item["notes"] = notes
            return jsonify({"status": "success", "case": item})
    return jsonify({"status": "error", "message": "Case not found"}), 404

@app.route("/api/community/posts", methods=["GET", "POST"])
def handle_community():
    if request.method == "POST":
        data = request.get_json() or {}
        content = data.get("content", "").strip()
        if not content:
            return jsonify({"status": "error", "message": "Content required"}), 400
        
        # Check crisis regex on peer posts for safety intercept
        if CRISIS_REGEX.search(content):
            return jsonify({
                "status": "crisis_intercept",
                "message": "It sounds like you are carrying severe distress. We want to connect you to confidential care right away.",
                "redirect_to_help": True
            }), 200

        alias_prefixes = ["GentleBreeze", "SilentRiver", "BraveHeart", "KindSoul", "MorningSun", "SteadyPath"]
        new_post = {
            "id": f"post-{int(time.time())}",
            "alias": f"{random.choice(alias_prefixes)}_{random.randint(10, 99)}",
            "time_ago": "Just now",
            "content": content,
            "reactions": {"solidarity": 1, "strength": 1, "care": 1},
            "reported": False
        }
        STATE["community_posts"].insert(0, new_post)
        return jsonify({"status": "success", "post": new_post})
    
    return jsonify({"status": "success", "posts": STATE["community_posts"]})

@app.route("/api/community/posts/<post_id>/react", methods=["POST"])
def react_post(post_id):
    data = request.get_json() or {}
    reaction_type = data.get("type", "solidarity")
    for post in STATE["community_posts"]:
        if post["id"] == post_id:
            if reaction_type in post["reactions"]:
                post["reactions"][reaction_type] += 1
            return jsonify({"status": "success", "reactions": post["reactions"]})
    return jsonify({"status": "error", "message": "Post not found"}), 404

@app.route("/api/community/posts/<post_id>/report", methods=["POST"])
def report_post(post_id):
    for post in STATE["community_posts"]:
        if post["id"] == post_id:
            post["reported"] = True
            return jsonify({"status": "success", "message": "Post flagged for clinical moderator review."})
    return jsonify({"status": "error", "message": "Post not found"}), 404

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "engine": "AegisMind Psycholinguistic Triage v2.4"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
