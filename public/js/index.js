console.log("Content from static js file");

const para = document.getElementById("wheather-info");
const form = document.querySelector("form");
const inputTextEle = document.querySelector("input");


const fetchWheatherData = (location) => {
    fetch(`http://localhost:3000/wheather?address=${location}`)
    .then((res) => res.json())
    .then((res) => {
        console.log("whethaer data", res);
        if(res.error) 
        { 
            para.innerText = res.error;
            return;
        }
        para.innerText = `${res.address} is ${res.description} today. Its ${res.temperature} fahrenheit here, but it fels like ${res.forCast}`
    })
    .catch((err) => para.innerHTML = "Something went wrong..")
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = inputTextEle.value;
    console.log("searchtext", searchText);
    if(searchText) {
        para.innerText = "....Loading";
        fetchWheatherData(searchText);
    }
    else window.alert("Please enter location");
})