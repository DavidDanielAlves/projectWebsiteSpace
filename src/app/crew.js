import { alternarMenu } from '../app/functions/AlternarMenu.js';
alternarMenu();

const img = document.getElementById('imagem-principal');
const office = document.getElementById('office');
const name = document.getElementById('name');
const description = document.getElementById('description');
const balls = document.querySelectorAll('.ball');

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
    const ballActive = document.querySelector('.ball.active');
    ballActive.classList.remove('active');
    balls[contador].classList.add('active');
    office.innerHTML = `${dadosJson[contador].role}`;
    name.innerHTML = `${dadosJson[contador].name}`;
    description.innerHTML = `${dadosJson[contador].bio}`;
    img.setAttribute('src', `${dadosJson[contador].images.png}`);
    img.setAttribute('alt', `Imagem de ${dadosJson[contador].name}`);
}

async function crewInterativo() {
    const dados = await fetch('http://localhost:3000/crew');
    dadosJson = await dados.json();

    updateContent();
    setInterval(() => {
        acrescentarMaisUm();
        updateContent();
    }, 10000);
}

balls.forEach((ball, index) => {
    ball.addEventListener('click', () => {
        clearInterval(intervalId);
        contador = index;
        updateContent();
        intervalId = setInterval(() => {
            acrescentarMaisUm();
            updateContent();
        }, 10000);
    });

    // Adiciona eventos de toque
    ball.addEventListener('touchstart', handleTouchStart);
    ball.addEventListener('touchend', handleTouchEnd);
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