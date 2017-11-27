// Toggle class "visible"
function toggleVisible(){
    var side = document.getElementById("side");
    if(side.classList.contains("visible")){
        side.classList.remove("visible");
    }
    else{
        side.classList.add("visible");
    }
}