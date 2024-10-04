let input = document.querySelector('#chatInput');
let button = document.querySelector('#submit');
let response_area = document.querySelector('.response');

async function getResponse() {
    const question = input.value;
    let p1 = document.createElement('p');
    // p1.textContent = `Question: ${question}`;
    // append <p> with question
    response_area.append(p1);

    let p2 = document.createElement('p');
    p2.textContent = "Getting Response...";

    const requestBody = JSON.stringify({ question: question });
    console.log(requestBody)

    const response = await fetch(`http://127.0.0.1:8000/info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    });

    const responseData = await response.json();
    console.log(responseData);

    // append <p> with answer
    p2.textContent = `Answer: ${responseData}`;

    
    response_area.append(p2);

    // chatHistory()
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

/*
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


chatHistory()
*/