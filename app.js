import API_KEY from './apikey.js';

let input = document.querySelector('.input')
let button = document.querySelector('.Button')
let image = document.querySelector('.weatherImage')
let temp = document.querySelector('.temp')
let city = document.querySelector('.city')
let humidper = document.querySelector('.humid h3')
let windSpeed = document.querySelector('.wind h3')
let weatherReport = document.querySelector('.WeatherReport')

input.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        let cityname = input.value
        input.value = ''
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`
        Apicall(url)
    }
})

button.addEventListener("click",(e)=>{
    let cityname = input.value
    input.value = ''
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`
        Apicall(url)
})


async function Apicall(url) {
    try {
        let response = await fetch(url)
        if(!response.ok){
            throw new Error(`city not found ! ${response.status}`)
        }
        let jsonData = await response.json()
        updateWeather(jsonData)
        updateTemp(jsonData)
        
    } catch (error) {
        alert('City not found or Network Error !!')
    }
}

function updateWeather(jsonData){
  weatherReport.style.display = 'block'
  let arr = jsonData.weather;
  if(arr[0].main == "Clear"){
    image.setAttribute("src","images/clear.png")
  }else if(arr[0].main == "Clouds"){
    image.setAttribute("src","images/clouds.png")
  }else if(arr[0].main == "Rain"){
    image.setAttribute("src","images/rain.png")
  }else if(arr[0].main == "Drizzle"){
    image.setAttribute("src","images/drizzle.png")
  }else if(arr[0].main == "Snow"){
    image.setAttribute("src","images/snow.png")
  }else if(arr[0].main == "Mist"){
    image.setAttribute("src","images/mist.png")
  }else{
    image.setAttribute("src","images/clear.png")
  }
}


function updateTemp(jsonData){
    temp.textContent = `${jsonData.main.temp}°c`
    city.textContent = `${jsonData.name}`
    humidper.textContent = `${jsonData.main.humidity}%`
    windSpeed.textContent = `${jsonData.wind.speed}km/h`
}