const btOpenMenu = document.getElementById('open-menu');
const btCloseMenu = document.getElementById('button-close-menu');

export function alternarMenu() {
    btOpenMenu.addEventListener('click', () => {
        const menuEscondido = document.querySelector('.container-navbar.hidden')
        menuEscondido.classList.remove('hidden');
    })

    btCloseMenu.addEventListener('click', () => {
        const menuVisivel = document.querySelector('.container-navbar');
        menuVisivel.classList.add('hidden');
    })
}




