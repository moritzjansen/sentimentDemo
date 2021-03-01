const button = document.querySelector("#submit")
const textArea = document.querySelector("#textInput")
const sentimentSpan = document.querySelector("#sentimentValue")
const calcText = document.querySelector("#calcText")

button.addEventListener("click", (e) => {
    e.preventDefault();
    button.disabled = true;
    button.innerText = "Loading..."
    postData("http://localhost:5000/sentiment", { text: textArea.value })
        .then(data => {
            sentimentSpan.innerText = data.sentiment
            calcText.classList.remove("invisible")
            button.disabled = false;
            button.innerText = "Calculate Sentiment";
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