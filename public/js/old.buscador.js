const buscador = document.querySelector('.buscador_input');
let ListaDeItems = document.querySelector('.list_container_ul');

const insertString = (texto, index, valor) => {                 //funcion creada para agregar texto
    return texto.slice(0, index) + valor + texto.slice(index);
}

buscador.addEventListener('keyup', e => {
    let valorBuscado = e.target.value;
    let valorDeLista = [...ListaDeItems.childNodes];
    console.log(valorDeLista);
    let valorDeListaLI = [];
    valorDeLista.forEach((element, index) => {
        if(element.nodeName == 'LI'){
            let texto = element.textContent;
            let regexp = new RegExp(valorBuscado, "gi");    //Genero un REGEXP para la busqueda "g" global "i" no discrimina entre mayusculas y minusculas
            let result = [...texto.matchAll(regexp)];       //Detecta las coincidencias y crea un array con ellas (dentro del array esta el indice)
            result.reverse();           // para no modificar el index del matchAll hay que agregar los Span de atras hacia adelante
            result.forEach( res => {
                let startindex = res.index
                let lastindex = startindex + valorBuscado.length;              
                let spanStart = "<span class='amarillo'>";
                let spanEnd = "</span>";
                
                texto = insertString(texto, lastindex, spanEnd);
                texto = insertString(texto, startindex, spanStart);                    
            });
            console.log("Texto modificado: ", texto);
            element.innerHTML = texto;
        }
    })
})
