import google.generativeai as genai

# api_key_filepath = r".\Api.txt"
# with open(api_key_filepath, 'r', encoding='utf-8') as file:
#     api_key = "AIzaSyAPy5X6x-wVgkQRVNgErySk9MGP0MdPpoQ"
# print(api_key)



genai.configure(api_key="AIzaSyAPy5X6x-wVgkQRVNgErySk9MGP0MdPpoQ",transport='rest')

generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

chat = model.start_chat(history=[])

print("Chatbot: Hey! How may I help you?")

while True:
  prompt = input("User: ")
  response = chat.send_message(content=prompt)
  for msg in chat.history:
    print(f"Chatbot:", {msg.parts[0].text})