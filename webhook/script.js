let spamInterval;

async function sendMessage(url, message, username, avatarUrl) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
            username: username,
            avatar_url: avatarUrl,
        }),
    });

    if (!response.ok) {
        console.error('Erreur lors de l\'envoi du message:', response.statusText);
    }
}

function startSpamming() {
    const url = document.getElementById('webhookUrl').value;
    const message = document.getElementById('message').value;
    const username = document.getElementById('username').value || undefined;
    const avatarUrl = document.getElementById('avatarUrl').value || undefined;

    if (!url || !message) {
        alert('Veuillez remplir l\'URL du webhook et le message.');
        return;
    }

    spamInterval = setInterval(() => {
        sendMessage(url, message, username, avatarUrl);
    }, 300); // Envoie un message toutes les secondes
}

function stopSpamming() {
    if (spamInterval) {
        clearInterval(spamInterval);
        spamInterval = null;
    }
}

async function deleteWebhook() {
    const url = document.getElementById('webhookUrl').value;

    if (!url) {
        alert('Veuillez remplir l\'URL du webhook.');
        return;
    }

    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Webhook supprimé avec succès.');
    } else {
        console.error('Erreur lors de la suppression du webhook:', response.statusText);
    }
}

document.getElementById('startButton').addEventListener('click', startSpamming);
document.getElementById('stopButton').addEventListener('click', stopSpamming);
document.getElementById('deleteButton').addEventListener('click', deleteWebhook);
