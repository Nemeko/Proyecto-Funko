const buscador = document.querySelector('.buscador_input');
const opciones = document.querySelector('.opciones');
const precioMin = document.querySelector('.precioMin');
const precioMax = document.querySelector('.precioMax');
const form = document.querySelector('.formulario');

let listaDeItems = document.querySelector('.cards_ul_shop');
let itemsLi = document.querySelector('.list_item');

const filter = async () => {
    let valorBuscado = buscador.value;
    let valorOpciones = opciones.value;
    let valorPrecioMin = precioMin.value;
    let valorPrecioMax = precioMax.value;

    const items = await serchData(valorBuscado, valorOpciones, valorPrecioMin, valorPrecioMax)
    
    while(listaDeItems.childElementCount > 0){
        listaDeItems.removeChild(listaDeItems.lastChild);
    }
    items.forEach(item => {
        listaDeItems.insertAdjacentHTML("beforeend", HTMLinjection(item, valorBuscado));
    });
}

buscador.addEventListener('keyup', () => filter()); 
opciones.addEventListener('click', () => filter()); 
precioMin.addEventListener('focusout', () => filter());
precioMax.addEventListener('focusout', () => filter());
precioMin.addEventListener('keyup', (e) => {e.key == "Enter" ? filter():false;});
precioMax.addEventListener('keyup', (e) => {e.key == "Enter" ? filter():false;});


const serchData = async (valorBuscado, valorOpciones, valorPrecioMin, valorPrecioMax) => {
    try{
        const data = {
            valorBuscado:valorBuscado,
            valorOpciones:valorOpciones,
            valorPrecioMin:valorPrecioMin,
            valorPrecioMax:valorPrecioMax
        };

        const valores = await fetch(`./shop/search`, {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        });
        
        return valores.json();
    
    }catch(err){
        // Falta agregar que redirija a la pag de error standar
        console.log("Error en el fetch al buscar los datos",err);
}}


/* HTML a insertar */
const HTMLinjection = (item, valorBuscado) =>{
let datos = [item.product_name, item.licence_name];
let regexp = new RegExp(valorBuscado, "gi");        //Genero un REGEXP para la busqueda "g" global "i" no discrimina entre mayusculas y minusculas

datos = datos.map( dato =>{
    let datoBuscado = [...dato.matchAll(regexp)];  
    
    if(datoBuscado.length){
        let startindex = datoBuscado[0].index
        let lastindex = startindex + valorBuscado.length;              
        let spanStart = "<span class='amarillo'>";
        let spanEnd = "</span>";

        dato = insertString(dato, lastindex, spanEnd);
        dato = insertString(dato, startindex, spanStart); 
        return dato;
    }else{
        return dato
    }   
})

let html = "";
if(item.dues){
    html = `<h6 class="item_cuotas" >${item.dues} Cuotas</h6>`
}

return (`<li class="item_container_card">
                    <a class="item_container_card_link" href="/shop/item/${item.product_id}">
                        <img class="item_container_img" src='${item.image_front}' alt="">
                        <div class="item_container_card_info">
                            <h6 class="item_categoria" >${datos[1]}</h6>
                            <h5 class="item_titulo" >${datos[0]}</h5>
                            <h6 class="item_precio">${item.price}</h6>
                            ${html}
                        </div>
                    </a>
                </li>`)
}


const insertString = (texto, index, valor) => {                 //funcion creada para agregar texto
    return texto.slice(0, index) + valor + texto.slice(index);
}