document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat");

    stats.forEach(stat => {
        let target = parseInt(stat.dataset.target);
        let numberElement = stat.querySelector(".number");
        let plusSign = stat.getAttribute("data-plus");
        let progressBar = stat.querySelector(".progress");

        // Réinitialiser les valeurs initiales
        numberElement.textContent = plusSign ? "0+" : "0";
        progressBar.style.width = "0%";

        let counter = 0;
        let duration = 1500; // Temps total d'animation en ms
        let startTime = null;

        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            let elapsed = timestamp - startTime;
            let progress = Math.min(elapsed / duration, 1); // De 0 à 1

            let easeOutProgress = 1 - Math.pow(1 - progress, 3); // Courbe ease-out

            let currentValue = Math.floor(easeOutProgress * target);
            numberElement.textContent = plusSign ? `${currentValue}+` : currentValue;
            progressBar.style.width = `${easeOutProgress * 100}%`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        // Forcer le redémarrage de l'animation
        stat.classList.remove("animate");
        void stat.offsetWidth; // Trigger reflow
        stat.classList.add("animate");

        requestAnimationFrame(updateCounter);
    });
});
