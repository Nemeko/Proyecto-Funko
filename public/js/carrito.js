
// localStorage.clear();
// localStorage.removeItem("carrito");
const redireccion = document.querySelector(".link_carrito")

let carrito =  JSON.parse(localStorage.getItem("carrito"));
let baloon = document.querySelector(".baloon");
let totalItems = 0;
let values = false;

if(carrito){ 
    values = Object.values(carrito);
}

if(values.length > 0){
    values.forEach(v => totalItems += v)
};

if(totalItems){
    // console.log(baloon.innerHTML);
    baloon.innerHTML = totalItems;
    baloon.classList.remove("oculto");
}else{
    baloon.classList.add("oculto");
}

redireccion.addEventListener('click', e => {
    
    /* Creamos el form */
    let form = document.createElement('form');
    form.name = 'carrito';
    form.method = 'POST';
    form.enctype = 'application/x-www-form-urlencoded';
    form.action = '/shop/carrito';
    
    /* obtenemos los datos del localstorage */
    let data = localStorage.getItem("carrito");    
    data = JSON.parse(data);
    
    /* creamos un input, asignamos la info y lo agregamos al form */ 
    let inputData = document.createElement("input");
    inputData.name = "data";
    inputData.value = JSON.stringify(data);
    form.append(inputData);
    
    /* asignamos el fomr al document y enviamos el form */
    document.body.appendChild(form);
    form.submit();      
})


/* alternativa con featch */
//     let data = localStorage.getItem("carrito");    
//     data = JSON.parse(data);

//     fetch("./shop/carrito", {
//         method : 'POST',
//         headers : {
//             "content-type" : "application/json"
//         },
//         body: JSON.stringify(data)
//     })

// });