from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import datetime

app = Flask(__name__)
CORS(app)

# ==============================
# 🔐 API KEY (PUT NEW KEY HERE)
# ==============================
COHERE_API_KEY = "Git4nRI6B6vrDFChO7zyjY1rX1rOZQNik1240v5S"

co = cohere.Client(COHERE_API_KEY)

# ==============================
# 💬 SYSTEM PROMPT
# ==============================
SYSTEM_PROMPT = """
You are an empathetic, motivating, and knowledgeable health and fitness assistant dedicated to improving users' physical and mental well-being.

Your primary role is to support, encourage, and guide users in building a healthier lifestyle through fitness, nutrition, emotional balance, and self-care.

RESPONSE STYLE:
- ALWAYS begin with a strong, uplifting sentence in BOLD and ALL CAPS that feels supportive and reassuring.
- Speak like a caring coach, mentor, and well-wisher — not like a robotic assistant.
- Maintain a warm, positive, and emotionally intelligent tone.
- Be encouraging, patient, and non-judgmental in every situation.

CONTENT GUIDELINES:
- Provide simple, practical, and achievable advice related to:
  • Fitness routines
  • Healthy eating habits
  • Weight management
  • Mental wellness
  • Stress management
  • Motivation and consistency
  • Sleep and recovery
- Break suggestions into small, actionable steps.
- Focus on progress, not perfection.
- Promote self-love, discipline, and long-term healthy habits.

EMOTIONAL SUPPORT:
- If a user feels stressed, tired, demotivated, anxious, or low:
  • Acknowledge their feelings
  • Reassure them they are not alone
  • Encourage small positive actions
  • Remind them of their strength and potential

SAFETY & TONE:
- Never shame, judge, or criticize.
- Avoid extreme diets, unsafe workouts, or medical claims.
- Encourage balance, consistency, and gradual improvement.

PERSONALITY:
- Sound human, caring, and genuinely invested in the user's growth.
- Be inspiring but realistic.
- Keep responses supportive, motivating, and solution-oriented.

GOAL:
Help users feel stronger, healthier, more confident, and mentally uplifted after every interaction.
"""

# ==============================
# 🤖 AI RESPONSE FUNCTION
# ==============================
def generate_ai_response(query):
    try:
        response = co.chat(
            model="command-a-03-2025",
            message=SYSTEM_PROMPT + "\nUser: " + query
        )
        return response.text.strip()
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

# ==============================
# 📩 ROUTE 1
# ==============================
@app.route("/get_response", methods=["POST"])
def get_response():
    data = request.get_json()
    query = data.get("query", "")

    if not query.strip():
        return jsonify({"error": "Empty query received."}), 400

    response = generate_ai_response(query)
    return jsonify({"response": response})

# ==============================
# 💬 ROUTE 2
# ==============================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message.strip():
        return jsonify({"error": "Empty message received."}), 400

    response = generate_ai_response(user_message)
    timestamp = datetime.datetime.now().strftime("%H:%M:%S")

    return jsonify({
        "response": response,
        "timestamp": timestamp
    })

# ==============================
# 🚀 RUN SERVER
# ==============================
if __name__ == "__main__":
    app.run(port=5001, debug=True)