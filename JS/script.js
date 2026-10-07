const input = document.querySelector("input");
const form = document.querySelector("form");
const clearBtn = document.querySelector(".btn-danger");
const invalidInputH1 = document.querySelector(".invalidInput");
const memeDiv = document.querySelector(".meme");

const api = "https://api.imgflip.com/get_memes";

function validInput(value) {
    if (value == "" || value == null) { return false; }
    if (value.includes(".")) { return false; }
    if (value[0] === '0' && value != "0") { return false; }
    value = +value;
    if (isNaN(value)) { return false; }
    if (value >= 0 && value < 100) { return true; }
    return false;
}

function clear() {
    invalidInputH1.classList.add("d-none");
    memeDiv.classList.replace("d-flex", "d-none");
}

form.addEventListener("submit", (e) => {
    clear();
    e.preventDefault();
    let value = input.value;
    if (!validInput(value)) {
        invalidInputH1.classList.remove("d-none");
    }
    else {
        fetch(api)
            .then(response => response.json())
            .then(data => data.data.memes)
            .then((memes) => {
                memeDiv.innerHTML = `
                    <h1 class="text-center">${memes[value].name}</h1>
                    <img src="${memes[value].url}" class="w-60">
                `;
                memeDiv.classList.replace("d-none", "d-flex");
            });
    }
});

clearBtn.addEventListener("click", () => {
    input.value = "";
    clear();
});