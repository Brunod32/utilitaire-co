// -----------  Date
let today = new Date();
let dateInHtml = document.getElementById('date');

showDate();

function showDate() {
    let date = new Date();

    let localeDate = date.toLocaleString('fr-Fr', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    setTimeout('showDate()', 100);
    dateInHtml.innerText = `Nous sommes le ${localeDate[0].toUpperCase()}${localeDate.slice(1).replace("à", "et il est ")}.`;
}

// ------------  Météo

const apiKey = '7d4a696f4e46055b073d599ec89e157b';

// Appel à l'api openWeather avec ville en paramètre de fonction
let apiCall = function (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then(response => response.json()
        .then((data) => {
            console.log(data)
            document.querySelector('#city').innerHTML =
                "<i class='bi bi-geo-alt'></i> " + data.name + ", le temps est " + data.weather[0].description;
            document.querySelector('#temp').innerHTML =
                "<i class='bi bi-thermometer-half'></i> " + data.main.temp + '°C' + ", ressenti " + data.main.feels_like + '°C';
            document.querySelector('#wind').innerHTML =
                "<i class='bi bi-wind'></i> " + data.wind.speed + ' km/h';
            document.querySelector('#humidity').innerHTML =
                "<i class='bi bi-droplet'></i> " + data.main.humidity + ' %';
        })
    ).catch(err => console.log('Erreur: ' + err));
}

// Ecouteur d'événement sur la soumission du formulaire
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    let citySearch = document.querySelector('#inputCity').value;
    apiCall(citySearch)
});

// Appel par défaut au chargement de la page
apiCall('Trémeheuc');


// ------------  Compte à rebours
let compteurInterval = null;
const tempusDiv = document.getElementById('tempus');
let hourglassBtn = document.getElementById("hourglassBtn");
let inputCountdown = document.getElementById('numberParam');
let tempsRestant = '';
let audioBip = new Audio("./media/sounds/bip.mp3");
let audioBuzzEnd = new Audio("./media/sounds/buzzEnd.mp3");
let btnMute = document.getElementById('muteBtn');
let btnUnMute = document.getElementById('unmuteBtn');

hourglassBtn.addEventListener('click', function () {
    clearInterval(compteurInterval);
    launchCountdown();
});

function launchCountdown() {
    tempsRestant = inputCountdown.value;
    compteurInterval = setInterval(() => {
        tempusDiv.innerText = tempsRestant;
        tempsRestant--;
        if (tempsRestant >= 5) {
            tempusDiv.classList.add("cool");
            tempusDiv.classList.remove("warning");
            tempusDiv.classList.remove("danger");
        } else if (tempsRestant > 2) {
            audioBip.play();
            tempusDiv.classList.add("warning");
            tempusDiv.classList.remove("cool");
            tempusDiv.classList.remove("danger");
        } else if (tempsRestant >= 0) {
            audioBip.play();
            tempusDiv.classList.remove("cool");
            tempusDiv.classList.remove("warning");
            tempusDiv.classList.add("danger");
        } else if (tempsRestant < 0) {
            audioBuzzEnd.play();
            clearInterval(compteurInterval);
            tempusDiv.innerText = "Temps écoulé !";
        }
    }, 1000);
}

btnMute.addEventListener("click", function () {
    if (audioBip.muted == false) {
        audioBip.muted = true;
        btnUnMute.classList.remove("d-none");
        btnMute.classList.add("d-none");
    } else if (audioBip.muted == true) {
        audioBip.muted = false;
        btnMute.classList.remove("d-none");
        btnUnMute.classList.add("d-none");
    }
})

btnUnMute.addEventListener("click", function () {
    if (audioBip.muted == true) {
        audioBip.muted = false;
        btnUnMute.classList.add("d-none");
        btnMute.classList.remove("d-none");
    } else if (audioBip.muted == false) {
        audioBip.muted = true;
        btnMute.classList.add("d-none");
        btnUnMute.classList.remove("d-none");
    }
})


// ----------------------  Chrono
let chronoContainer = document.getElementById("chronoContainer");
let startbtn = document.getElementById("start");
let stopbtn = document.getElementById("stop");
let resetbtn = document.getElementById("reset");
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let time;

function tick() {
    milliseconds++;
    if (milliseconds >= 10) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
}

function add() {
    tick();
    chronoContainer.classList.add("text-center");
    chronoContainer.textContent = (hours > 9 ? hours : "0" + hours) 
        + ":" + (minutes > 9 ? minutes : "0" + minutes)
        + ":" + (seconds > 9 ? seconds : "0" + seconds)
        + "." + (milliseconds > 9 ? milliseconds : "" + milliseconds);
    timer();
}

function timer() {
    time = setTimeout(add, 100);
}

startbtn.addEventListener("click", () => {
    startChrono();
    startbtn.style.visibility = "hidden";

})
stopbtn.addEventListener("click", () => {
    stopChrono();
    startbtn.style.visibility = "visible";
})
resetbtn.addEventListener("click", () => {
    resetChrono();
})

function startChrono() {
    timer();
}

function stopChrono() {
    clearTimeout(time);
}

function resetChrono() {
    chronoContainer.textContent = "00:00:00.0";
    seconds = 0;
    minutes = 0;
    hours = 0;
    milliseconds = 0;
}