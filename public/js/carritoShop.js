const botones = document.querySelector('.items_carrito');

botones.addEventListener('click', e => {
  
    let itemID = e.target.id;
    let botonID = e.target.classList[1];
    let precioTotal = document.getElementById('precio_total'+itemID) ?? 0;
    let precioUnitario = document.getElementById('precio_unitario'+itemID) ?? 0;
    let cantidad = document.getElementById('cantidad'+itemID) ?? 0;
    
    let cantidadValue = parseFloat(cantidad.value);
    let precioUnitarioValue = precioUnitario.innerText;

    if (botonID == "boton-mas"){
        
        cantidadValue < 99 ? cantidad.value = ++cantidadValue:99;
        precioTotal.innerText = parseFloat(precioUnitarioValue * cantidadValue).toFixed(2);
        guardar(cantidadValue, itemID);        
    
    }else if(botonID == "boton-menos"){
    
        cantidadValue > 1 ? cantidad.value = --cantidadValue:1;
        precioTotal.innerText = parseFloat(precioUnitarioValue * cantidadValue).toFixed(2);
        guardar(cantidadValue, itemID);     

    }else if(botonID == "boton-delete"){

        const borrarElemento = document.getElementById(itemID);
        borrarElemento.remove();
        guardar(0, itemID, true);
    } 
})



const guardar = (data, id, borrar = false) => {
    let storage = localStorage.getItem("carrito");
    storage = JSON.parse(storage);
    const guardado = (storage) => localStorage.setItem("carrito", JSON.stringify(storage));
    
    if(borrar){
        console.log("borrando ...");
        delete storage[id];
        guardado(storage);
        resumen()
        return
    }

    storage[id] = data;
    guardado(storage);
    resumen()
    return
}



document.addEventListener("DOMContentLoaded", () => {
    resumen();  
});

const resumen = () => {
    const totales = document.querySelectorAll('.precio_total');
    const precioTotal = document.querySelector('.item_list_carrito_resumen-total');
    const precioSubTotal = document.querySelector('.item_list_carrito_resumen-subtotal');
    const cantidadDeItems = document.querySelector('.item_list_carrito_resumen-items');

    let buffer = 0;
    totales.forEach(item => {
        buffer += parseFloat(item.textContent);
    });
    precioTotal.textContent = "$ " + buffer.toFixed(2);
    precioSubTotal.textContent = "$ " + buffer.toFixed(2);
    cantidadDeItems.textContent = totales.length;
}



const botonPagos = document.querySelector('.item_boton-pagos');

botonPagos.addEventListener('click', () => {
    if(window.confirm("DEMO: \n\nPago realizado con exito")){
        localStorage.removeItem("carrito");
        location.href ="/";
    };
})