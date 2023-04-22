const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const fetchPokemon = async (pokemon) => {
  const APIRespose = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = (await APIRespose).json();
  return data;
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  pokemonNumber.innerHTML = data.id;
  pokemonName.innerHTML = data.name;
  pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
};

renderPokemon(25);