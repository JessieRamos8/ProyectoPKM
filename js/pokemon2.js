let pokemonInfo = localStorage.getItem("pokemonInfo");
pokemonInfo = JSON.parse(pokemonInfo);

console.log(pokemonInfo);


function insertInfo () {
    const profilePhoto = document.getElementById('img');
    const pokemonName = document.getElementById('nombre');
    const weightInfo = document.getElementById('peso');
    const heightInfo = document.getElementById('altura');

    pokemonName.innerText = pokemonInfo.name.toUpperCase();
    weightInfo.innerText = pokemonInfo.weight;
    heightInfo.innerText = pokemonInfo.height;
    profilePhoto.setAttribute('src', pokemonInfo.imgUrl);

}

function insertAbilities (){
    const abilitiesContainer = document.querySelector('.habilidades');
    abilitiesContainer.innerHTML = "";
    for (let ability of pokemonInfo.abilities) {
        const divAbility = document.createElement('div');
        const nameAbility = document.createElement('p');

        divAbility.classList.add('habilidad');

        nameAbility.innerText = ability.ability.name;

        divAbility.appendChild(nameAbility);

        abilitiesContainer.append(divAbility)
    }

} 
insertInfo();
insertAbilities();
