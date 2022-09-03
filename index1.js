const container = document.querySelector(".container"),
    main = container.querySelector(".main"),
    text = main.querySelector(".text"),
    inputField = main.querySelector("input");
    locationbnt = main.querySelector("button");
    wicon = document.querySelector(".weather-part img");
    backbnt = container.querySelector("header button");

    let api;
    apikey = '6cbc42c17260d23fb683d826f51f6944';


//----------Event for Input Column, After entering the city name press Enter--------------

inputField.addEventListener("keyup", e => {
    // if user pressed enter button and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        // Then it print hello in console
        // console.log("hello");
        requestApi(inputField.value);
    }
})

//-------------featching data from api-------------

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchDate();
}

function fetchDate() {
    text.innerText = "Getting Weather Deatils.....";
    text.classList.add("pending");
    //getting api response and returing it with parsing into js obj and in another
    //then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    text.classList.replace("pending", "error");
    if (info.cod == "404") {
        text.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        //Requireds properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;


        // chaning weather image accourding to weather

        if(id == 800){
            wicon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wicon.src = "icons/strom.svg";
        }else if(id >= 600 && id <= 622){
            wicon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wicon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wicon.src = "icons/cloud.svg";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wicon.src = "icons/rain.svg";
        }


        //Pass the value of perticular html elements
        container.querySelector(".temp .numb").innerText = Math.floor(temp);
        container.querySelector(".weather").innerText = description;
        container.querySelector(".location span").innerText = `${city}, ${country}`;
        container.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        container.querySelector(".humidity span").innerText = `${humidity}%`;

        text.classList.remove("pending", "error");
        container.classList.add("active");
    }
}

//--------------------Get User Location---------------------

//------Event for Get Your Location--------

locationbnt.addEventListener("click", () => {
    if (navigator.geolocation) {  // If Browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your Browser do not support geolocation api")
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords; //getting lat and lon of the user device from coords object
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;

    fetchDate();
}
function onError(error) {
    text.innerText = error.message;
    text.classList.add("error");
}


//-------------Back Arrow Button----------

backbnt.addEventListener("click", ()=>{
    container.classList.remove("active");
});