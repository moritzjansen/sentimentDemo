const button = document.querySelector("#submit")
const textArea = document.querySelector("#textInput")
const sentimentSpan = document.querySelector("#sentimentValue")

button.addEventListener("click", (e) => {
    e.preventDefault();
    postData("http://localhost:5000/sentiment", { text: textArea.value })
        .then(data => {
            sentimentSpan.innerText = data.sentiment
        })
        .catch(error => {
            console.log(error)
        })
})

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}