const button = document.querySelector("#submit")
const textArea = document.querySelector("#textInput")
const sentimentSpan = document.querySelector("#sentimentValue")


button.addEventListener("click", async (e) => {

    //set button to loading state
    button.disabled = true;
    button.innerText = "Loading..."

    const data = await postData("http://localhost:5000/sentiment", { text: textArea.value })
        .catch(error => {
            console.log(error)
            sentimentSpan.innerText = "Sorry, something went wrong."
        })

    if (data) {
        sentimentSpan.innerText = data.sentiment
    }
    //reset button
    button.disabled = false;
    button.innerText = "Calculate Sentiment";
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