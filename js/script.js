const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIRespose = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if ((await APIRespose).status == 200) {
    const data = (await APIRespose).json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNumber.innerHTML = "";
  pokemonName.innerHTML = "Loading...";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "";
    pokemonImage.style.display = "none";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
