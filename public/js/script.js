const evento = document.querySelector('#evnt-carga')

evento.addEventListener('change', e => {
    const imagen = e.target.parentNode.children[1];    
    if(e.target.files[0]){
        const imagen = e.target.parentNode.children[1];         // Selecciono la etiqueta img correspondiente
        const imgName = e.target.parentNode.children[2];
        const name = e.target.files[0].name;
        const file = new FileReader();                          // FileReader metodo para leer ficheros en buffer
        file.readAsDataURL(e.target.files[0]);                  // Lee el documento en base64
        file.onload = (e) => {
            imagen.src = e.target.result;      // Cuando lee el archivo sactifactoriamente asigna img.src 
            imgName.textContent = name;      
        }
    // console.log(e.target.parentNode.children[2]);
    // console.log("-----------");
    // console.log(e.target.files[0].name);
    }
})


/*

document.querySelector("#files").onchange = function() {
    const fileName = this.files[0]?.name;
    const label = document.querySelector("label[for=files]");
    label.innerText = fileName ?? "Browse Files";
  };


*/