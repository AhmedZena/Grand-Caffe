function saveData(){
    var inputs = document.querySelectorAll("input")

    localStorage.setItem("name",inputs[0].value)  
    localStorage.setItem("email",inputs[1].value)
}

function removeData(){
    localStorage.clear()
    //localStorage.removeItem("name")
}