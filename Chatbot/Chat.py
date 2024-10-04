from fastapi.responses import FileResponse, HTMLResponse
import google.generativeai as genai
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from collections import OrderedDict
from pydantic import BaseModel

API_KEY = "AIzaSyD8EgCN-1GvwGUPJ5r_TS7_k5mqs5OL1oU"

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-pro")

app = FastAPI()

chat_history = OrderedDict()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class RequestBody(BaseModel):
    question: str


@app.post('/system')
async def get_answer(body: RequestBody):

    try:
        question = body.question
        chat = model.start_chat()
        if not question:
            return 'Please provide a message'
        message = chat.send_message(question)
        response = message.text
        return response

    except Exception as e:
        return e


@app.post('/questions')
async def get_answer(body: RequestBody):

    try:
        question = body.question
        chat = model.start_chat()
        if not question:
            return 'Please provide a message'
        message = chat.send_message(question)
        response = message.text
        chat_history[question] = response
        return response

    except Exception as e:
        return e


@app.get('/chats')
def get_chat_history():
    if not chat_history:
        print("Inside chats")
        return {'No chats were found!'}
    return chat_history


@app.get('/', response_class=HTMLResponse)
async def index():
    return FileResponse("C:\\Users\\Atabur\\python\\Chatbot\\index.html")


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
