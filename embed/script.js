document.addEventListener('DOMContentLoaded', function() {
    const fieldsContainer = document.getElementById('fields');
    const previewContainer = document.getElementById('preview-container');

    // Function to create a new field group
    function createFieldGroup() {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'field-group';

        const fieldName = document.createElement('input');
        fieldName.type = 'text';
        fieldName.placeholder = 'Field Name';

        const fieldValue = document.createElement('input');
        fieldValue.type = 'text';
        fieldValue.placeholder = 'Field Value';

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-field';
        removeButton.addEventListener('click', () => {
            fieldsContainer.removeChild(fieldGroup);
            updatePreview();
        });

        fieldGroup.appendChild(fieldName);
        fieldGroup.appendChild(fieldValue);
        fieldGroup.appendChild(removeButton);

        fieldsContainer.appendChild(fieldGroup);
        updatePreview();
    }

    // Add event listener to the "Add Field" button
    document.getElementById('add-field').addEventListener('click', createFieldGroup);

    // Function to update the preview
    function updatePreview() {
        const webhookUrl = document.getElementById('webhook-url').value;
        const message = document.getElementById('message').value;
        const embedTitle = document.getElementById('embed-title').value;
        const embedDescription = document.getElementById('embed-description').value;
        const embedColor = document.getElementById('embed-color').value;
        const embedAuthor = document.getElementById('embed-author').value;
        const embedAuthorUrl = document.getElementById('embed-author-url').value;
        const embedAuthorIcon = document.getElementById('embed-author-icon').value;
        const embedTimestamp = document.getElementById('embed-timestamp').value;

        const fields = [];
        const fieldGroups = fieldsContainer.getElementsByClassName('field-group');
        for (let i = 0; i < fieldGroups.length; i++) {
            const fieldName = fieldGroups[i].children[0].value;
            const fieldValue = fieldGroups[i].children[1].value;
            if (fieldName && fieldValue) {
                fields.push({ name: fieldName, value: fieldValue, inline: false });
            }
        }

        const embed = {
            title: embedTitle,
            description: embedDescription,
            color: parseInt(embedColor.replace('#', ''), 16),
            author: {
                name: embedAuthor,
                url: embedAuthorUrl,
                icon_url: embedAuthorIcon
            },
            timestamp: embedTimestamp ? new Date(embedTimestamp).toISOString() : null,
            fields: fields
        };

        previewContainer.innerHTML = ''; // Clear previous preview

        const previewMessage = document.createElement('div');
        previewMessage.className = 'preview-message';
        previewMessage.style.borderColor = embedColor;

        const previewAvatar = document.createElement('img');
        previewAvatar.className = 'preview-avatar';
        previewAvatar.src = embedAuthorIcon || 'https://cdn.discordapp.com/embed/avatars/0.png'; // Default Discord avatar

        const previewContent = document.createElement('div');
        previewContent.className = 'preview-content-inner';

        if (embed.author.name) {
            const previewAuthor = document.createElement('div');
            previewAuthor.className = 'preview-author';

            const authorIcon = document.createElement('img');
            authorIcon.src = embedAuthorIcon || 'https://cdn.discordapp.com/embed/avatars/0.png'; // Default Discord avatar
            authorIcon.alt = 'Author Icon';

            const previewAuthorName = document.createElement('span');
            previewAuthorName.className = 'preview-author-name';
            previewAuthorName.textContent = embed.author.name;

            previewAuthor.appendChild(authorIcon);
            previewAuthor.appendChild(previewAuthorName);

            if (embed.timestamp) {
                const previewTimestamp = document.createElement('span');
                previewTimestamp.className = 'preview-timestamp';
                previewTimestamp.textContent = new Date(embed.timestamp).toLocaleString();
                previewAuthor.appendChild(previewTimestamp);
            }

            previewContent.appendChild(previewAuthor);
        }

        if (embed.title) {
            const previewTitle = document.createElement('div');
            previewTitle.className = 'preview-title';
            previewTitle.textContent = embed.title;
            previewContent.appendChild(previewTitle);
        }

        if (embed.description) {
            const previewDescription = document.createElement('div');
            previewDescription.className = 'preview-description';
            previewDescription.textContent = embed.description;
            previewContent.appendChild(previewDescription);
        }

        if (embed.fields && embed.fields.length > 0) {
            embed.fields.forEach(field => {
                const previewField = document.createElement('div');
                previewField.className = 'preview-field';

                const previewFieldName = document.createElement('div');
                previewFieldName.className = 'preview-field-name';
                previewFieldName.textContent = field.name;

                const previewFieldValue = document.createElement('div');
                previewFieldValue.className = 'preview-field-value';
                previewFieldValue.textContent = field.value;

                previewField.appendChild(previewFieldName);
                previewField.appendChild(previewFieldValue);
                previewContent.appendChild(previewField);
            });
        }

        previewMessage.appendChild(previewAvatar);
        previewMessage.appendChild(previewContent);
        previewContainer.appendChild(previewMessage);
    }

    // Initial preview update
    updatePreview();

    // Update preview on input changes
    document.querySelectorAll('#message-form input').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    document.getElementById('message-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const webhookUrl = document.getElementById('webhook-url').value;
        const message = document.getElementById('message').value;
        const embedTitle = document.getElementById('embed-title').value;
        const embedDescription = document.getElementById('embed-description').value;
        const embedColor = document.getElementById('embed-color').value;
        const embedAuthor = document.getElementById('embed-author').value;
        const embedAuthorUrl = document.getElementById('embed-author-url').value;
        const embedAuthorIcon = document.getElementById('embed-author-icon').value;
        const embedTimestamp = document.getElementById('embed-timestamp').value;

        const fields = [];
        const fieldGroups = fieldsContainer.getElementsByClassName('field-group');
        for (let i = 0; i < fieldGroups.length; i++) {
            const fieldName = fieldGroups[i].children[0].value;
            const fieldValue = fieldGroups[i].children[1].value;
            if (fieldName && fieldValue) {
                fields.push({ name: fieldName, value: fieldValue, inline: false });
            }
        }

        const embeds = [{
            title: embedTitle,
            description: embedDescription,
            color: parseInt(embedColor.replace('#', ''), 16),
            author: {
                name: embedAuthor,
                url: embedAuthorUrl,
                icon_url: embedAuthorIcon
            },
            timestamp: embedTimestamp ? new Date(embedTimestamp).toISOString() : null,
            fields: fields
        }];

        const payload = {
            content: message,
            embeds: embeds
        };

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending the message.');
        });
    });
});
