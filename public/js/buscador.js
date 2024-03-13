const buscador = document.querySelector('.buscador_input');
let listaDeItems = document.querySelector('.list_container_ul');
let itemsLi = document.querySelector('.list_item');

buscador.addEventListener('keyup', async (e) => {
    let valorBuscado = e.target.value;
    const items = await serchData(valorBuscado); 
    while(listaDeItems.childElementCount > 0){
        listaDeItems.removeChild(listaDeItems.lastChild);
    }
    items.forEach(item => {
        listaDeItems.insertAdjacentHTML("beforeend", HTMLinjection(item, valorBuscado));
    });
})

const serchData = async (data) => {
    try{
        const valores = await fetch(`./search?search=${data}`);
        return valores.json();
    }catch(err){
        // Falta agregar que redirija a la pag de error standar
        console.log("Error en el fetch al buscar los datos",err);
}}


/* HTML a insertar */
const HTMLinjection = ({product_id, sku, product_name, category_name}, valorBuscado) =>{
    // {product_id, sku, product_name, category_name}
let datos = [sku, product_name, category_name];
let regexp = new RegExp(valorBuscado, "gi");        //Genero un REGEXP para la busqueda "g" global "i" no discrimina entre mayusculas y minusculas

datos = datos.map( dato =>{
    console.log("dato: ",dato)
    
    let datoBuscado = [...dato.matchAll(regexp)];  
    
    console.log("dato buscado:",datoBuscado);
    if(datoBuscado.length){
        console.log("tesitng ",datoBuscado[0].index);
        let startindex = datoBuscado[0].index
        let lastindex = startindex + valorBuscado.length;              
        let spanStart = "<span class='amarillo'>";
        let spanEnd = "</span>";

        dato = insertString(dato, lastindex, spanEnd);
        dato = insertString(dato, startindex, spanStart); 
        console.log("dato antes del return ", dato)
        return dato;
    }else{
        return dato
    }   
})

console.log("datos",datos)
return (`<li class="list_item">
            <p class="list_id">${product_id}</p>
            <p class="list_codigo">${datos[0]}</p>
            <p class="list_nombre">${datos[1]}</p>
            <p class="list_categoria">${datos[2]}</p> 
            <div class="list_div_icono">          
                <a href="/admin/edit/${product_id}">
                    <svg class="icono icono_lapiz" role="img">  
                        <use xlink:href="/icons/icons.svg#pencil" alt="lapiz"></use>     
                    </svg>
                </a>
                <form action="/admin/delete/${product_id}" method="POST"> 
                    <button input class="boton-delete" type="submit">
                        <svg class="icono icono_papelera" role="img">
                            <use xlink:href="/icons/icons.svg#trash" alt="papelera"></use>
                        </svg>
                    </button>
                </form>
            </div>
        </li>`)


// return (`<li class="list_item">
//             <p class="list_id">${product_id}</p>
//             <p class="list_codigo">${sku}</p>
//             <p class="list_nombre">${product_name}</p>
//             <p class="list_categoria">${category_name}</p> 
//             <div class="list_div_icono">          
//                 <a href="/admin/edit/${product_id}">
//                     <svg class="icono icono_lapiz" role="img">  
//                         <use xlink:href="/icons/icons.svg#pencil" alt="lapiz"></use>     
//                     </svg>
//                 </a>
//                 <form action="/admin/delete/${product_id}" method="POST"> 
//                     <button input class="boton-delete" type="submit">
//                         <svg class="icono icono_papelera" role="img">
//                             <use xlink:href="/icons/icons.svg#trash" alt="papelera"></use>
//                         </svg>
//                     </button>
//                 </form>
//             </div>
//         </li>`)

}


const insertString = (texto, index, valor) => {                 //funcion creada para agregar texto
    return texto.slice(0, index) + valor + texto.slice(index);
}