
const botonMas = document.querySelector('.boton-mas');
const botonMenos = document.querySelector('.boton-menos');
const itemInput = document.querySelector('.item_input');
const botonCarrito = document.querySelector(".boton-carrito");

botonMas.addEventListener('click', e => {
    let value = itemInput.value
    value < 99 ? itemInput.value = ++value:"";
});

botonMenos.addEventListener('click', e => {
    let value = itemInput.value
    value > 0 ? itemInput.value = --value:"";
});

botonCarrito.addEventListener('click', e => {
    let value = parseInt(itemInput.value);
    let id = document.URL
    id = parseInt(id.substring(id.lastIndexOf('/')+1));
    
    let storage = localStorage.getItem("carrito");
    let carrito = {}
    if(storage){
        carrito = JSON.parse(storage);
        Object.hasOwn(carrito, id) ? carrito[id] += value : carrito[id] = value;
    }else{
        carrito[id] = value;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.href ="/shop";
});