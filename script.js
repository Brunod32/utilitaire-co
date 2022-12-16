// Date
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
    dateInHtml.innerText = `Nous sommes le ${localeDate[0].toUpperCase()}${localeDate.slice(1)}.`;
}

// Compte à rebours
let compteurInterval = null;
const countdownDiv = document.getElementById('countdown');
let goBtn = document.getElementById("goBtn");
let inputCountdown = document.getElementById('numberParam');
let tempsRestant = '';
let audioBip = new Audio("./media/bip.mp3");
let audioBuzzEnd = new Audio("./media/buzzEnd.mp3");
let btnMute = document.getElementById('muteBtn');
let btnUnMute = document.getElementById('unmuteBtn');

goBtn.addEventListener('click', function () {
    clearInterval(compteurInterval);
    launchCountdown();
});

function launchCountdown() {
    tempsRestant = inputCountdown.value;
    compteurInterval = setInterval(() => {
        countdownDiv.innerText = tempsRestant;
        tempsRestant--;
        if (tempsRestant >= 5) {
            countdownDiv.classList.add("cool");
            countdownDiv.classList.remove("warning");
            countdownDiv.classList.remove("danger");
        } else if (tempsRestant > 2) {
            audioBip.play();
            countdownDiv.classList.add("warning");
            countdownDiv.classList.remove("cool");
            countdownDiv.classList.remove("danger");
        } else if (tempsRestant >= 0) {
            audioBip.play();
            countdownDiv.classList.remove("cool");
            countdownDiv.classList.remove("warning");
            countdownDiv.classList.add("danger");
        } else if (tempsRestant < 0) {
            audioBuzzEnd.play();
            clearInterval(compteurInterval);
            countdownDiv.innerText = "Temps écoulé !";
        }
    }, 1000);
}

// Faire une fonction ActivateSound, au clic des btn le son s'active ou pas
// et l'un ou l'autre des btn disparait
// s'inspirer de ce qui suit
btnMute.addEventListener("click", function () {
    if (audioBip.muted == false) {
        audioBip.muted = true;
        btnUnMute.classList.contains("d-none") ? btnUnMute.classList.remove("d-none") : btnUnMute.classList.add("d-none");
        btnMute.classList.contains("d-none") ? btnMute.classList.add("d-none") : btnMute.classList.remove("d-none");
    } else if (audioBip.muted == true) {
        audioBip.muted = false;
        btnMute.classList.contains("d-none") ? btnMute.classList.remove("d-none") : btnMute.classList.add("d-none");
        btnUnMute.classList.contains("d-none") ? btnUnMute.classList.add("d-none") : btnUnMute.classList.remove("d-none");
    }
})

