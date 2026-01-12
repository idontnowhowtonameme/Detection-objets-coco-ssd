# 🧠 Détection automatique d’objets – TensorFlow.js & COCO-SSD
# Réalisé par Jean-Baptiste Lizé - Riad Draoui – Mathieu Ferrante 

## 📌 Présentation du projet

Ce projet consiste à développer un **prototype d’application web** permettant de démontrer l’usage de la **détection automatique d’objets dans des images**, en s’appuyant sur **TensorFlow.js** et le modèle pré-entraîné **COCO-SSD**.

L’application permet à l’utilisateur de :
- saisir l’URL d’une image,
- lancer une détection automatique des objets,
- visualiser les objets détectés et leurs emplacements dans des cadres.

Ce prototype s’inscrit dans la continuité du travail d’analyse et de cadrage réalisé lors du **Brief 1**.

---

## 🎯 Objectifs pédagogiques

- Comprendre l’intégration d’un modèle d’IA pré-entraîné dans une application web
- Mettre en œuvre TensorFlow.js côté client
- Exploiter les résultats d’un modèle de détection d’objets
- Produire une interface fonctionnelle et une documentation claire

---

## 🛠️ Technologies utilisées

- **HTML5** : structure de l’interface
- **CSS3** : mise en forme basique
- **JavaScript (ES6)** : logique applicative
- **TensorFlow.js** : exécution du modèle IA côté navigateur
- **COCO-SSD** : modèle pré-entraîné de détection d’objets

---

## 📁 Structure du projet

/project-root
│
├── index.html # Interface utilisateur
├── style.css # Styles de l’application
├── script.js # Logique de détection et gestion du modèle IA COCO-SSD
└── README.md # Documentation du projet


---

## COCO-SSD : le module de détection d’objets

# COCO-SSD est un modèle de détection d’objets pré-entraîné, utilisable via TensorFlow.js.
-   COCO : dataset de référence (Common Objects in Context)
-   SSD : Single Shot Detector
👉 Il permet de détecter plusieurs objets dans une image, en une seule étape.


# À quoi sert COCO-SSD ?
Le modèle est capable de :
-   Identifier ≈ 80 types d’objets (personnes, voitures, animaux, objets du quotidien),
-   Localiser chaque objet dans l’image,
-   Fournir un score de confiance pour chaque détection.

# Principe de fonctionnement du modèle SSD
🧠 Détection « en une seule étape » contrairement à des modèles plus complexes :
-   SSD analyse l’image en une seule passe
-   Ce qui le rend rapide, idéal pour le web

Étapes internes :
1.	L’image est redimensionnée.
2.	Le réseau de neurones extrait des caractéristiques visuelles.
3.	Des zones candidates (bounding boxes) sont évaluées.
4.	Chaque zone est associée :
    - À une classe (objet),
    - À une probabilité (score).


---

## ⚙️ Fonctionnement de l’application

### 1️⃣ Interface utilisateur (HTML)
- Champ de saisie pour l’URL d’une image
- Bouton pour lancer la détection
- Zone d’affichage de l’image et des résultats
🔹 Le canvas est utilisé pour dessiner les cadres autour des objets détectés
🔹 L’attribut crossorigin="anonymous" évite les erreurs CORS lors du traitement de l’image


### 2️⃣ Chargement de TensorFlow.js et du modèle COCO-SSD
- Chargement des bibliothèques sur notre index.html
    . <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    . <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>

- Initialisation du modèle au lancement de l’application dans notre script.js
- Le modèle est stocké dans une variable globale pour être réutilisé "model = loadedModel;"


### 3️⃣ Détection des objets
- Récupération de l’image depuis l’URL fournie, Lorsque l’utilisateur clique sur le bouton, l’image est chargée dynamiquement. Une fois l’image chargée, la détection peut être lancée.

- Analyse de l’image par le modèle en lançant la détection des objets, La fonction de détection utilise la méthode detect() du modèle COCO-SSD.
- Chaque prédiction contient :
    . class : nom de l’objet détecté
    . score : niveau de confiance
    . bbox : coordonnées [x, y, largeur, hauteur] ()


### 4️⃣ Affichage des résultats
- Liste textuelle des objets détectés
- Encadrement des objets directement sur l’image
- Ajout d’étiquettes et de couleurs pour une meilleure lisibilité
- On convertis les scores en pourcentage pour une meilleure visibiltié

---

## 🚨 Gestion des incidents techniques

Les erreurs suivantes sont prises en compte :
- URL d’image invalide ou inaccessible
- Image non compatible (CORS, format incorrect)
- Problème de chargement du modèle
- Absence d’objet détecté

Des messages d’erreur clairs sont affichés à l’utilisateur et les solutions sont documentées dans le code.

---

## 🧪 Lancement du projet

1. Cloner ou télécharger le dépôt
2. Ouvrir le fichier `index.html` dans le navigateur
3. Saisir l’URL d’une image publique (problèmes de droits CORS sinon)
4. Lancer la détection

> ⚠️ Une connexion internet est requise pour charger TensorFlow.js et le modèle COCO-SSD.

---

## ⚠️ Contraintes et limites du modèle

-   Projet limité à un prototype, sans exigences de production.
-   Utilisation d’un modèle pré-entraîné (coco-ssd), sans phase d’entraînement.
-   Détection limitée à ~80 types d’objets pris en charge par le modèle.
-   Performances dépendantes du navigateur (variation du temps de traitement).
-   Contraintes liées au chargement d’images externes (URL image libre de droits).
-   Peut ne pas détecter si les objets sont superposés, où trop petits. (sous le seuil de 50% de précision)


---

## 🧩 Synthèse du flux de fonctionnement

1) L’utilisateur saisit une URL d’image
2) Le modèle COCO-SSD est chargé
3) L’image est analysée par TensorFlow.js
4) Les objets sont détecté
5) Les résultats sont affichés visuellement et textuellement