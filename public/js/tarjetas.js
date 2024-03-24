const botonNext = document.getElementById('next');
const botonPrev = document.getElementById('prev');


const mover = (IzqDer = 0) => {
    const itemWidth = document.querySelector('.tarjetas').offsetWidth;
    const containerTarjetas = document.querySelector('.seccion_tarjetas_container')
    IzqDer == 1 ? containerTarjetas.scrollLeft += itemWidth : containerTarjetas.scrollLeft -= itemWidth;
}

botonPrev.addEventListener("click", ()=>{mover(0)});
botonNext.addEventListener("click", ()=>{mover(1)});