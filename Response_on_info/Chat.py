from fastapi.responses import FileResponse, HTMLResponse
import google.generativeai as genai
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

API_KEY = "AIzaSyD8EgCN-1GvwGUPJ5r_TS7_k5mqs5OL1oU"

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-pro")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

chat = model.start_chat()


@app.get('/', response_class=HTMLResponse)
async def index():
    return FileResponse("Response_on_info/index.html")


@app.post('/info')
async def TrainMachine(request: Request):
  print("Inside API!!!")
  try:
    global chat
    question_json = await request.json()
    # print(question_json)
    question = question_json.get('question')
    question += ". Please provide answers of below questions based on the provided information. If the question is not related to the provided context then show 'Irrelevent question!'"
    print("question = " + question)
    if not question:
      return 'Please provide a message'
    message = chat.send_message(question)
    response = message.text
    return response
  
  except Exception as e:
    return e
  

@app.post('/questions')
async def get_answer(question: str):
  
  try:
    global chat
    if not question:
      return 'Please provide a message'
    message = chat.send_message(question)
    response = message.text
    return response
  
  except Exception as e:
    return e
  