let compteurInterval = null;
const countdownDiv = document.getElementById('countdown');
let goBtn = document.getElementById("goBtn");
let inputCountdown = document.getElementById('numberParam');
let tempsRestant = '';
let audioBip = new Audio("./media/bip.mp3");
let audioBuzzEnd = new Audio("./media/buzzEnd.mp3");

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
            // audioBip.play();
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
