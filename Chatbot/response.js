
let input = document.querySelector('#chatInput');
let button = document.querySelector('#submit');
let response_area = document.querySelector('.response');
flag = true


async function provideInformation() {

    let p2 = document.createElement('p');

    //requestBody = "You will be provided with a paragraph delimited by triple quotes. Your task is to answer the question using only the provided document and to cite the passage(s) of the document used to answer the question. If the document does not contain the information needed to answer this question then simply write: 'Insufficient information!'";

    const requestBody = {
        question: "You will be provided with a paragraph delimited by triple quotes. Your task is to answer the user's "
            + "question using only the provided document and to cite the passage(s) of the document used to answer the "
            + "question. If the document does not contain the information needed to answer the question, simply write: "
            + "'Insufficient information!' \n"
            + "First, please provide the document by entering it between triple quotes. Once the document is provided, you can ask the user to provide their query."
    }

    const response = await fetch(`http://127.0.0.1:8000/system`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    console.log("Information:", responseData);

    // append <p> with answer
    p2.textContent = `Answer: ${responseData}`;

    response_area.append(p2);

    getResponse()

};

async function getResponse() {
    const inputQuestion = input.value;

    const requestBody = {
        question: inputQuestion
    }

    console.log("question = ", question)
    let p1 = document.createElement('p');
    p1.textContent = `Question: ${question}`;
    // append <p> with question
    response_area.append(p1);

    let p2 = document.createElement('p');
    p2.textContent = "Getting Response...";
    response_area.append(p2);

    const response = await fetch(`http://127.0.0.1:8000/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    console.log("responseData:", responseData);

    // append <p> with answer
    p2.textContent = `Answer: ${responseData}`;

    response_area.append(p2);

    chatHistory()
    flag = false
};

button.addEventListener("click", function () {
    response_area.textContent = null
    getResponse();
});

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        response_area.textContent = null
        getResponse();
    }
});


let chat_history = document.querySelector('.chat_history')

function chatHistory() {
    fetch('http://127.0.0.1:8000/chats')
        .then(res => {
            return res.json();
        })
        .then(data => {
            // data = JSON.stringify(data)
            getChats(data)
            console.log("data = " + data);
        })
        .catch(error => {
            console.log("error = " + error)
        });
}

function getChats(data) {
    chat_history.textContent = ""
    let keys = Object.keys(data).reverse()
    keys.forEach(key => {
        console.log("key = " + key)
        console.log("data[key] = " + data[key])
        let p1 = document.createElement('p');
        p1.textContent = `Question: ${key}`;
        let p2 = document.createElement('p');
        p2.textContent = `Answer: ${data[key]}`;
        chat_history.append(p1);
        chat_history.append(p2);
    })
}

if (flag) chatHistory()

provideInformation()