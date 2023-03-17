import { Input } from "/scripts/modules/Inputs.js";

const input_element = document.querySelector("#url");
const button = document.querySelector("#download");
const input = new Input();
const tiktokUrlPattern = /^https:\/\/www\.tiktok\.com\/t\/[\w-]+\/?$/;
var Turl;

function handleInput(url) {
    if(url !== ""){
      window.location.href = window.location.origin + "/getVideo?url=" + url;
    //.then(response => response.text())
    //.then(data =>{
    //    window.location.href = data.toString()
    //})
  }
}

function checkTiktokPattern() {
  var url = input_element.value;
  const isTiktokUrl = tiktokUrlPattern.test(url);

  if (tiktokUrlPattern.test(url)) {
    console.log("The input tag value is a TikTok URL");
    return true;
  } else {
    console.log("The input tag value is not a TikTok URL");
    return false;
  }
}

//function fetchOriginal(url){
//    fetch(`/handleTurl?url=${url}`)
//        .then(response => response.text())
//        .then(data => {
//            Turl = data.toString();
//        })
//}

button.addEventListener("click", (event) => {
    if(checkTiktokPattern()){
        fetch(`/handleTurl?url=${input_element.value}`)
        .then(response => response.text())
        .then(data => {
            Turl = data.toString();
            handleInput(Turl);
            console.log(Turl)
        })
    }
    else{
        handleInput(input_element.value);
    }
});

//input.processPC("Enter", handleInput);
input.processPC("Enter", checkTiktokPattern);
