const container = document.querySelector(".pokemon-container");
const inputFiltrado = document.querySelector("#filtrar");
const buscar = document.querySelector("#buscar");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");

let offset = 1;
let limit = 8;

let pokemon = []

function fetchPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      mostrarPokemons(data);
    });
}

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function mostrarPokemons(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card-pokemon");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;

  imgContainer.appendChild(img);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(imgContainer);
  card.appendChild(number);
  card.appendChild(name);

  pokemon - container.appendChild(card);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


function filtrarPokemons () {
  inputFiltrado.addEventListener("keyup", (e) =>{
    if(e.target.matches("#filtrar")){
      console.log(e.target.value);

      inputFiltrado.querySelectorAll(".pokemon-container").forEach(el =>{
        el.textContent.toLowerCase().includes(e.target.value)
        ?mostrarPokemons()
        :removeChildNodes()
      })
    }
  })
}





previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(container);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(container);
  fetchPokemons(offset, limit);
});

fetchPokemons(offset, limit);
filtrarPokemons("#filtrar", ".pokemon-container")