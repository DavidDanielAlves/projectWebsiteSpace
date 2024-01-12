import { alternarMenu } from '../app/functions/AlternarMenu.js';
alternarMenu();

const paragraphDescription = document.getElementById('paragraph')
const nameRocket = document.getElementById('rocket-name');
const mainImage = document.getElementById('main-image');
const containers = document.querySelectorAll('.container-navegation');

let intervalId = null
let contador = 0;
let dadosJson;
let startX = 0;

function acrescentarMaisUm() {
    contador += 1;
    if (contador >= dadosJson.length) {
        contador = 0;
    }
}

function updateContent() {
    const containerActive = document.querySelector('.container-navegation.active');
    containerActive.classList.remove('active');
    containers[contador].classList.add('active');

    paragraphDescription.innerHTML = `${dadosJson[contador].description}`
    nameRocket.innerHTML = `${dadosJson[contador].name}`
    mainImage.setAttribute('src', `${dadosJson[contador].images.portrait}`);
    
}

async function crewInterativo() {
    const dados = await fetch('http://localhost:3000/technology');
    dadosJson = await dados.json();

    updateContent();
    setInterval(() => {
        acrescentarMaisUm();
        updateContent();
    }, 10000);

    console.log(dadosJson);
}

containers.forEach((container, index) => {
    container.addEventListener('click', () => {
        clearInterval(intervalId);
        contador = index;
        updateContent();
        intervalId = setInterval(() => {
            acrescentarMaisUm();
            updateContent();
        }, 10000);
    });

    // Adiciona eventos de toque
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
});

function handleTouchStart(event) {
    startX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    const endX = event.changedTouches[0].screenX;
    const deltaX = endX - startX;

    if (deltaX > 50) {
        // Deslizar para a direita
        clearInterval(intervalId);
        acrescentarMaisUm();
        updateContent();
        intervalId = setInterval(() => {
            acrescentarMaisUm();
            updateContent();
        }, 10000);
    } else if (deltaX < -50) {
        // Deslizar para a esquerda
        clearInterval(intervalId);
        contador = contador === 0 ? dadosJson.length - 1 : contador - 1;
        updateContent();
        intervalId = setInterval(() => {
            acrescentarMaisUm();
            updateContent();
        }, 10000);
    }
}

crewInterativo();