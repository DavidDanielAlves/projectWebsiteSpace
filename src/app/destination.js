import { alternarMenu } from "./functions/AlternarMenu.js";

alternarMenu();

const namePlanet = document.getElementById('name-planet');
const descriptionPlanet = document.getElementById('paragraph-description');
const spanDistance = document.getElementById('distance');
const travel = document.getElementById('days');
const imagePlanet = document.getElementById('image-planet');

const itens = document.querySelectorAll('.item-planet');

export function alternarNavBarPlanets() {
    const buttonsNavbar = document.querySelectorAll('.item-planet');

    buttonsNavbar.forEach(button => {
        button.addEventListener('click', () => {
            const botaoSelecionado = document.querySelector('.item-planet.active');

            botaoSelecionado.classList.remove('active');
            button.classList.add('active');
        })
    })
}


export function adicionarElementoNaPosicao (elemento, elementoNaPosicao) {
    elemento.innerHTML = elementoNaPosicao
}

export function adicionarImgsNaPosicao (img, url, texto) {
    img.setAttribute('src', url);
    img.setAttribute('alt', texto);
}

async function alterarDestination() {
    const dados = await fetch('http://localhost:3000/destinations');
    const dadosJson = await dados.json();

    alternarNavBarPlanets();

    itens.forEach((item, index) => {
        item.addEventListener('click', () => {
            const position = item = index;

            adicionarElementoNaPosicao(namePlanet, `${dadosJson[position].name}`)
            adicionarElementoNaPosicao(descriptionPlanet, `${dadosJson[position].description}`)
            adicionarElementoNaPosicao(spanDistance, `${dadosJson[position].distance}`)
            adicionarElementoNaPosicao(travel, `${dadosJson[position].travel}`)
            adicionarImgsNaPosicao(imagePlanet, `${dadosJson[position].images.png}`, `imagem do planeta ${dadosJson[position].name}`)
        })
    })
    
}


alterarDestination();
