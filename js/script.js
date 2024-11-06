// Toggle the mobile menu on small screens
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// Change navbar background color on scroll
function changeNavbarColorOnScroll() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Add event listener for the hamburger menu click
document.getElementById("hamburger").addEventListener("click", toggleMenu);

// Add event listener for scrolling to change the navbar color
window.addEventListener("scroll", changeNavbarColorOnScroll);

// setInterval(displayTime, 1000);
const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("min");
const secondHand = document.getElementById("sec");

function setClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDegrees = (seconds / 60) * 360 + 270; // Adjust by 90deg to start at 12
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 270;
  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 270;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(setClock, 1000);
setClock(); // Initial call to set the time immediately
/***** Stop Watch **********/
let timerDisplay = document.getElementById("timerDisplay");
let stopBtn = document.getElementById("stopBtn");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");

let msec = 0o0;
let secs = 0o0;
let mins = 0o0;

let timerId = null;

startBtn.addEventListener("click", function () {
  if (timerId !== null) {
    clearInterval(timerId);
  }
  timerId = setInterval(startTimer, 10);
});

stopBtn.addEventListener("click", function () {
  clearInterval(timerId);
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerId);
  timerDisplay.innerHTML = `00 : 00 : 00`;
  msec = secs = mins = 0o0;
});

function startTimer() {
  msec++;
  if (msec == 100) {
    msec = 0;
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
  }

  let msecString = msec < 10 ? `0${msec}` : msec;
  let secsString = secs < 10 ? `0${secs}` : secs;
  let minsString = mins < 10 ? `0${mins}` : mins;

  timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}
/* ****** QR-Code-Generator ************ */
const qrText = document.getElementById("qr_text");
const sizes = document.getElementById("sizes");
const generateBtn = document.getElementById("generate_Button");
const downloadBtn = document.getElementById("download_Button");
const qrContainer = document.querySelector(".qr-body");

let size = sizes.value;
generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isEmptyInput();
});

sizes.addEventListener("change", (e) => {
  size = e.target.value;
  isEmptyInput();
});

downloadBtn.addEventListener("click", () => {
  let img = document.querySelector(".qr-body img");

  if (img !== null) {
    let imgAtrr = img.getAttribute("src");
    downloadBtn.setAttribute("href", imgAtrr);
  } else {
    downloadBtn.setAttribute(
      "href",
      `${document.querySelector("canvas").toDataURL()}`
    );
  }
});

function isEmptyInput() {
  if (qrText.value.length > 0) {
    generateQRCode();
  } else {
    alert(
      "Scan or  Enter the text or Name or Nummber to generate your QR code"
    );
  }
  qrText.value.length > 0
    ? generateQRCode()
    : alert("Scan Enter the text or Name or Nummber to generate your QR code");
}
function generateQRCode() {
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text: qrText.value,
    height: size,
    width: size,
    colorLight: "#fff",
    colorDark: "#000",
  });
}
// Weather Api script

const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "077b826bd46149304329b497686d1a90";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  console.log("run");
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "images/cloud.png";
      break;
    case "Clear":
      weather_img.src = "images/clear.png";
      break;
    case "Rain":
      weather_img.src = "images/rain.png";
      break;
    case "Mist":
      weather_img.src = "images/mist.png";
      break;
    case "Snow":
      weather_img.src = "images/snow.png";
      break;
  }

  console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
// Toggle the mobile menu on small screens

document.querySelector(".to-top").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
//  **** Auto type **** //
