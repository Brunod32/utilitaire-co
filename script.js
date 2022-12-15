let compteurInterval = null;
const countdownDiv = document.getElementById('countdown');
let tempsRestant = 5;

compteurInterval = setInterval(() => {
    if (tempsRestant > 0) {
        countdownDiv.innerText = tempsRestant;
        tempsRestant--;
    } else if (tempsRestant <= 0) {
        clearInterval(compteurInterval);
        countdownDiv.innerText = "Temps écoulé !"
    }
}, 1000);