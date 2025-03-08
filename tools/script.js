document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("tools-container");

    try {
        let response = await fetch("/tools/tools.json");
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        let tools = await response.json();

        tools.forEach(tool => {
            let toolElement = document.createElement("div");
            toolElement.classList.add("tool-card");

            // Déterminez si le lien est une URL de redirection locale ou un fichier à télécharger
            const isDownload = tool.source.startsWith("http");
            const buttonText = isDownload ? "Télécharger" : "Accéder";

            toolElement.innerHTML = `
                <img src="/programs/${tool.folder}/image.png" alt="${tool.name}">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <a href="${tool.source}" class="download-btn" ${isDownload ? 'download' : ''}>${buttonText}</a>
            `;

            container.appendChild(toolElement);
        });

    } catch (error) {
        console.error("Erreur lors du chargement des outils :", error);
    }
});
