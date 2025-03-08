import os
import json

PROGRAMS_DIR = "programs"
tools = []

# Lire les descriptions et les dossiers pour générer tools.json
for tool_folder in os.listdir(PROGRAMS_DIR):
    tool_path = os.path.join(PROGRAMS_DIR, tool_folder)
    if os.path.isdir(tool_path):
        description_file = os.path.join(tool_path, "description.txt")

        if os.path.exists(description_file):
            with open(description_file, "r", encoding="utf-8") as desc:
                description = desc.read().strip()

            # Ajouter l'outil avec les informations nécessaires
            tools.append({
                "name": tool_folder.replace("_", " ").title(),
                "folder": tool_folder,
                "description": description,
                "source": ""  # Le champ "source" sera rempli manuellement dans tools.json
            })

# Ajouter manuellement un outil pour rediriger vers ../webhook/index.html
tools.append({
    "name": "Webhook Tool",
    "folder": "webhook",
    "description": "Redirige vers la page webhook.",
    "source": "../webhook/index.html"
})

# Écrire les outils dans tools.json
with open("tools/tools.json", "w", encoding="utf-8") as json_file:
    json.dump(tools, json_file, indent=4, ensure_ascii=False)

print("tools.json généré avec succès ! Veuillez ajouter manuellement les liens Google Drive dans le champ 'source'.")
