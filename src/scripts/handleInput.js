import { Input } from '/scripts/modules/Inputs.js'

const input_element = document.querySelector("#url")
const button = document.querySelector("#download")
const input = new Input();

function handleInput(){
    var value = input_element.value;
    if(value !== ""){
            window.location.href = window.location.origin + "/getVideo?url=" + value
            //.then(response => response.text())
            //.then(data =>{
            //    window.location.href = data.toString()
            //})
    }
}

button.addEventListener("click", (event) =>{
    handleInput()
})


input.processPC("Enter", handleInput)