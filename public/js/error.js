const timer = document.querySelector(".error_timer");
let seg = 30;
let interval = setInterval(contador, 1000);

function contador(){
    seg--
    timer.textContent = seg;
    if(seg<=0){
        clearInterval(interval);
        location.replace('http://localhost:3001/'); //reemplazar con la url de la pag del error
    }
}




// console.log("testing"); 