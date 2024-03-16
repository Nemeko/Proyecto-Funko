
const botonMas = document.querySelector('.boton-mas');
const botonMenos = document.querySelector('.boton-menos');
const itemInput = document.querySelector('.item_input');


botonMas.addEventListener('click', e => {
    let value = itemInput.value
    value < 99 ? itemInput.value = ++value:"";
})

botonMenos.addEventListener('click', e => {
    let value = itemInput.value
    value > 0 ? itemInput.value = --value:"";
})