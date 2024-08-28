import Pokemon from "./domain/pokemon.js";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const form = document.querySelector(`#form`);
const idField = document.querySelector(`#id`);
const nameField = document.querySelector(`#name`);
const heightField = document.querySelector(`#height`);
const weightField = document.querySelector(`#weight`);
const typesField = document.querySelector(`#types`);
const abilitiesField = document.querySelector(`#abilities`);
const spriteImage = document.querySelector(`#sprite`);
const previousButton = document.querySelector(`#previous`);
const nextButton = document.querySelector(`#next`);

let currentId = "1";

const getByIdOrName = async (baseUrl, input) => {
    try {
        const response = await fetch(`${baseUrl}/${input}`);
        const data = await response.json();
        // console.log(data);
        const pokemon = createPokemon(data);
        displayPokemon(pokemon);
        currentId = pokemon.id;
    } catch (error) {
        console.error(error);
    }
}

function createPokemon(data) {
    const id = data.id;
    const name = `${data.name}`;
    const height = data.height;
    const weight = data.weight;
    const types = data.types.map((element) => element.type.name);
    const abilities = data.abilities.map((element) => element.ability.name);
    const sprite = `${data.sprites.front_default}`;

    return new Pokemon(id, name, height, weight, types, abilities, sprite);
}

function displayPokemon(pokemon) {
    idField.textContent = `${pokemon.id}`;
    nameField.textContent = `${pokemon.name}`;
    heightField.textContent = `${pokemon.height} dm`;
    weightField.textContent = `${pokemon.weight} hg`;
    typesField.textContent = `${pokemon.types}`;
    abilitiesField.textContent = `${pokemon.abilities}`;
    spriteImage.src = `${pokemon.sprite}`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formattedInput = form["userInput"].value.trim().toLowerCase();
    getByIdOrName(BASE_URL, formattedInput);
    form.reset();
})

previousButton.addEventListener("click", (e) => {
    if (currentId > 1) {
        getByIdOrName(BASE_URL, --currentId);
    }
});

nextButton.addEventListener("click", (e) => {
    if (currentId < 1025) {
        getByIdOrName(BASE_URL, ++currentId);
    }
});

getByIdOrName(BASE_URL, currentId);