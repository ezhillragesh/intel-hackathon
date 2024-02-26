from fastapi import FastAPI
from transcript import getTranscript
from app import summaryBot, chatBot
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}

@app.post("/video/summary")
async def video_summary(urlink : str):
    try:
        l = summaryBot(urlink)
        transcript = l[0]
        summary = l[1]
        return {"summary": summary, "transcript" : transcript}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/video/chats")
async def video_chats(data : dict):
    try:
        prompt  = data.get("prompt")
        history = data.get("history")
        summary = chatBot(prompt, history)
        return {"summary": summary}
    except Exception as e:
        return {"error": str(e)}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, debug=True)
