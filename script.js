let compteurInterval = null;
const countdownDiv = document.getElementById('countdown');
let goBtn = document.getElementById("goBtn");
let inputCountdown = document.getElementById('numberParam');
let tempsRestant = '';

goBtn.addEventListener('click', function () {
    launchCountdown();
});

function launchCountdown() {
    tempsRestant = inputCountdown.value;
    compteurInterval = setInterval(() => {
        if (tempsRestant > 0) {
            countdownDiv.innerText = tempsRestant;
            tempsRestant--;
        } else if (tempsRestant <= 0) {
            clearInterval(compteurInterval);
            countdownDiv.innerText = "Temps écoulé !"
        }
    }, 1000);
}
