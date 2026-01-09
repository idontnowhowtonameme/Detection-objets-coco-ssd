let model = null;

const analyzeBtn = document.getElementById('analyzeBtn');
const urlInput = document.getElementById('urlInput');
const sourceImage = document.getElementById('img');
const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');
const statusMessage = document.getElementById('statusMessage');
const objectList = document.getElementById('objectList');

// Vérification de la validité de l'URL
function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

async function init() {
    try {
        model = await cocoSsd.load();
        analyzeBtn.disabled = false;
        updateStatus("IA Prête ! Collez une URL d'image.", "#27ae60");
    } catch (err) {
        updateStatus("Erreur : Impossible de charger le modèle.", "#e74c3c");
    }
}

function updateStatus(text, color = "#555") {
    statusMessage.innerText = text;
    statusMessage.style.color = color;
}

analyzeBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();

    if (!isValidHttpUrl(url)) {
        updateStatus("Erreur : Veuillez entrer une URL valide (http/https).", "#e74c3c");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateStatus("Chargement de l'image...", "#3498db");
    
    // Utilisation d'un proxy pour éviter les blocages CORS
    sourceImage.src = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    sourceImage.style.display = "block";

    sourceImage.onload = runDetection;
    sourceImage.onerror = () => {
        updateStatus("Erreur : Impossible de charger l'image.", "#e74c3c");
    };
});

async function runDetection() {
    updateStatus("Analyse IA en cours...", "#3498db");

    // Ajuste le canvas à la taille affichée de l'image
    canvas.width = sourceImage.clientWidth;
    canvas.height = sourceImage.clientHeight;

    try {
        const predictions = await model.detect(sourceImage);
        
        // Calcul du ratio (Taille écran / Taille réelle image)
        const scaleX = canvas.width / sourceImage.naturalWidth;
        const scaleY = canvas.height / sourceImage.naturalHeight;

        drawResults(predictions, scaleX, scaleY);
        updateStatus(`Analyse terminée : ${predictions.length} objets détectés.`, "#27ae60");
    } catch (error) {
        updateStatus("Erreur lors de l'analyse.", "#e74c3c");
    }
}

function drawResults(predictions, sx, sy) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objectList.innerHTML = ""; 

    predictions.forEach(p => {
        // Redimensionnement des coordonnées selon le ratio
        const x = p.bbox[0] * sx;
        const y = p.bbox[1] * sy;
        const w = p.bbox[2] * sx;
        const h = p.bbox[3] * sy;

        // Rectangle de détection
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);
        
        // Label texte
        ctx.fillStyle = "#00FF00";
        ctx.font = "bold 14px Arial";
        ctx.fillText(`${p.class} ${Math.round(p.score * 100)}%`, x, y > 15 ? y - 5 : 15);

        // Ajout à la liste visuelle
        const tag = document.createElement('span');
        tag.className = 'object-tag';
        tag.innerText = `${p.class} (${Math.round(p.score * 100)}%)`;
        objectList.appendChild(tag);
    });
}

init();