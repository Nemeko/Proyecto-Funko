const inputF = document.getElementById('inpF');
const imgFront = document.getElementById('imgF');

const inputB = document.getElementById('inpB');
const imgBack = document.getElementById('imgB');


inputF.addEventListener( 'change', e =>{
    console.log(e.target.files[0]);
    if(e.target.files[0]){
        const file = new FileReader();
        file.onload = (e) => imgFront.src = e.target.result;
        file.readAsDataURL(e.target.files[0]);
    }    
})

inputB.addEventListener( 'change', e =>{
    console.log(e.target.files[0]);
    if(e.target.files[0]){
        const file = new FileReader();
        file.onload = (e) => imgBack.src = e.target.result;
        file.readAsDataURL(e.target.files[0]);
    }    
})


// console.log("testing");

/*FileReader()    /* Objeto de JS pensado para leer archivos del lado del cliente */