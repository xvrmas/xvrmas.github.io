

const btnCart = document.querySelector('.contenidor-icona');
const btnContenidor = document.querySelector('.contenidor-cart-productes');

btnCart.addEventListener('click', () => {
    btnContenidor.classList.toggle('hiden-cart');
})