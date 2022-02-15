let api = 'https://pokeapi.co/api/v2/pokemon?limit=6&offset=0';
let currentData = {};
(async _ => {

    currentData = await getPokemons(api);
    insertPokemons(currentData.results);
    // localStorage.setItem("data", JSON.stringify(currentData))

})();


const prev = document.getElementById('ant');
const next = document.getElementById('sig');

prev.addEventListener("click", goPrevious);
next.addEventListener("click", goNext);


async function getPokemons(link) {
        let page = link;
    try {
        let data = await fetch(page).then(response => response.json());
        console.log(data);
        return data; 
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}

function selectPokemon(i = 1) {
    return (ev) => {
        ev.preventDefault();
        console.log("click");
        const pokemon = currentData.results[i];
        try {
            const imgUrl = pokemon.imgUrl;
            const name = pokemon.name;
            const abilities = pokemon.info.abilities;
            const height = pokemon.info.height;
            const weight = pokemon.info.weight;
            let pokemonInfo = {
                imgUrl,
                name,
                abilities,
                height,
                weight
            };
            localStorage.setItem("pokemonInfo", JSON.stringify(pokemonInfo));
            window.location.href= ev.target.href;
    } catch (err) {
        console.log(`Error: ${err}`);
    }
    }
    
}

async function goPrevious(ev){
    ev.preventDefault();
    console.log("previous");
    if (currentData.previous != null){
       api = currentData.previous;
       currentData = await getPokemons(api);
       insertPokemons(currentData.results);
    }
}

async function goNext(ev){
    ev.preventDefault();
    console.log("next")
    if (currentData.next != null){
        api = currentData.next;
        currentData = await getPokemons(api);
        insertPokemons(currentData.results);
    }
}


async function insertPokemons(pokemons) {
    const container = document.getElementById('pokemons');
    container.innerHTML = "";
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        try {
            const info = await fetch(pokemon.url).then(response => response.json());
            console.log(info);
            pokemon.info = info;
            const images = await fetch(info.forms[0].url).then(response => response.json());
            console.log(images);
            const imgUrl = images.sprites.front_default;
            pokemon.imgUrl = imgUrl;
            const block = createElement(pokemon.name, imgUrl, i);
            container.appendChild(block);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
    } 
}



function createElement(name, imgUrl, i) {
    const divPokemon = document.createElement('div');
    const divFoto = document.createElement('div');
    const img = document.createElement('img');
    const nombreH3 = document.createElement('h3');
    const divButton = document.createElement('div');
    const a = document.createElement('a');
    


    divPokemon.classList.add('cartaPokemon');
    divFoto.classList.add('marco');
    img.classList.add('foto');
    nombreH3.classList.add('nombre');
    divButton.classList.add('boton')
    a.classList.add('verMas')

    img.setAttribute('src', imgUrl);
    img.setAttribute('alt', 'Profile photo');
    a.setAttribute('href', `file:///C:/Users/Jessica%20Ramos/Documents/proyecto%20pkm/plantilla2pkm.html?index=${i}`);
    
    a.addEventListener("click", selectPokemon(i));
    
    nombreH3.innerText = name.toUpperCase();
    a.innerText = "Ver más";
    
    divFoto.appendChild(img);
    divButton.appendChild(a);

    divPokemon.append(divFoto, nombreH3, divButton);

    return divPokemon;

}

