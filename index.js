const input = document.querySelector('input');
const header = document.querySelector('#header');
const form = document.querySelector('form');
const container = document.querySelector("#container");
let animeName = document.querySelector('#anime');
let characterName = document.querySelector('#character');
const quotesList = document.querySelector('#quotes');

let characterInfo = '';

const getInfo = async (userInput) => {
    if (userInput !== '') {
        return await fetch(`https://animechan.vercel.app/api/quotes/character?name=${userInput}`)
            .then(response => response.json())
            .then(quotes => quotes)

    } else {
        return {error: "Blank Field"};
    }
}

const showInfo = (quotes) => {
    console.log(characterInfo);
    header.classList.add('d-none');
    form.classList.add('d-none');
    container.classList.remove('d-none');
    animeName.innerHTML = quotes[0].anime;
    characterName.innerHTML = quotes[0].character;
    console.log(animeName, characterName);
    for (let item of quotes) {
        const quote = document.createElement('li');
        quote.classList.add('list-group-item');
        quote.classList.add('list-item');
        quote.classList.add('text-break');
        quote.innerText = item.quote;
        quotesList.appendChild(quote);
    }
    document.body.style.zoom = 0.8;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    characterInfo = await getInfo(input.value);
    input.value = '';
    if (!characterInfo.error) {
        showInfo(characterInfo);
    } else {
        alert(`${characterInfo.error}`);
    }
})





