const botonNext = document.getElementById('next');
const botonPrev = document.getElementById('prev');

const mover = (e, IzqDer = 0) => { 
    
    let bloqueoBoton = e.target.id;
    bloqueoBoton == "next" ? bloqueoBoton = botonNext : bloqueoBoton = botonPrev;
    bloqueoBoton.setAttribute("disabled", "true");
    
    const itemWidth = document.querySelector('.tarjetas').offsetWidth;
    const containerTarjetas = document.querySelector('.seccion_tarjetas_container')
    IzqDer == 1 ? containerTarjetas.scrollLeft += itemWidth : containerTarjetas.scrollLeft -= itemWidth;
    
    setTimeout(()=>{bloqueoBoton.removeAttribute("disabled")},400);
}

botonPrev.addEventListener("click", (e)=>{mover(e)});
botonNext.addEventListener("click", (e)=>{mover(e,1)});