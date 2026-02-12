import re
from collections import defaultdict


class ChatbotEngine:
    """
    Advanced rule-based NLP engine with:
    - Phrase detection
    - Weighted scoring
    - Intent priority resolution
    """

    INTENT_CONFIG = {
        "patient_support": {
            "phrases": [
                "need blood",
                "urgent blood",
                "medical emergency",
                "require medicine",
                "need help",
            ],
            "keywords": [
                "need", "urgent", "emergency",
                "require", "surgery", "patient",
                "hospital", "medicine"
            ],
            "weight_phrase": 5,
            "weight_keyword": 2,
            "priority": 3
        },

        "volunteer": {
            "phrases": [
                "donate blood",
                "become volunteer",
                "ready to donate",
                "want to volunteer",
            ],
            "keywords": [
                "volunteer", "donate",
                "willing", "join",
                "ready", "support"
            ],
            "weight_phrase": 5,
            "weight_keyword": 2,
            "priority": 2
        },

        "contact": {
            "phrases": [],
            "keywords": ["contact", "message", "inquiry", "reach"],
            "weight_phrase": 0,
            "weight_keyword": 1,
            "priority": 1
        },

        "faq": {
            "phrases": [
                "what services",
                "how does this work",
                "where are you located"
            ],
            "keywords": ["what", "how", "where", "services"],
            "weight_phrase": 3,
            "weight_keyword": 1,
            "priority": 0
        }
    }

    @staticmethod
    def clean_text(text):
        text = text.lower()
        text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
        return text

    @classmethod
    def score_intents(cls, message):
        cleaned_message = cls.clean_text(message)
        tokens = cleaned_message.split()

        scores = defaultdict(int)

        for intent, config in cls.INTENT_CONFIG.items():

            # Phrase scoring
            for phrase in config["phrases"]:
                if phrase in cleaned_message:
                    scores[intent] += config["weight_phrase"]

            # Keyword scoring
            for token in tokens:
                if token in config["keywords"]:
                    scores[intent] += config["weight_keyword"]

        return scores

    @classmethod
    def resolve_intent(cls, scores):
        if not scores:
            return "unknown", 0

        max_score = max(scores.values())

        if max_score == 0:
            return "unknown", 0

        # Collect intents with max score
        top_intents = [
            intent for intent, score in scores.items()
            if score == max_score
        ]

        if len(top_intents) == 1:
            return top_intents[0], max_score

        # If tie, resolve by priority
        sorted_by_priority = sorted(
            top_intents,
            key=lambda i: cls.INTENT_CONFIG[i]["priority"],
            reverse=True
        )

        return sorted_by_priority[0], max_score

    @classmethod
    def process_message(cls, message):
        scores = cls.score_intents(message)
        intent, confidence = cls.resolve_intent(scores)

        responses = {
            "patient_support": {
                "response": "It seems you are requesting medical assistance. Please fill out the Patient Support form.",
                "route": "/patient"
            },
            "volunteer": {
                "response": "Thank you for offering support. Please register using the Volunteer Registration form.",
                "route": "/volunteer"
            },
            "contact": {
                "response": "You may reach out through the Contact form.",
                "route": "/contact"
            },
            "faq": {
                "response": "We provide healthcare assistance, emergency coordination, and volunteer support services.",
                "route": None
            },
            "unknown": {
                "response": "I’m not fully sure what you need. Could you clarify your request?",
                "route": None
            }
        }

        result = responses.get(intent, responses["unknown"])

        return {
            "intent": intent,
            "response": result["response"],
            "suggested_route": result["route"],
            "confidence_score": confidence
        }
