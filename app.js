const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "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";

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
        }
    })
}

//Fonction qui génère les images grâce à l'API de OPENAI
const generateAiImages = async (userPrompt, userQuantity) => {
    try {
        const response = await fetch ("https://api.openai.com/v1/images/generations", {
            //Indique que la requête sera une opération de création ou d'ajout de données côté serveur
            method: "POST",
            //Les headers fournissent des informations sur la requête
            headers: {
                "Content-Type": "application/json",
                "Autorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                //La description de ce que l'utilisateur veut voir
                prompt: userPrompt,
                //Le nombre d'image à générer, converti en entier à partir de la liste déroulante du formulaire
                n: parseInt(userQuantity),
                size: "512x512",
                //indique que la réponse sera encodée au format json en base64 
                response_format: "b64_json"
            })
        });

        console.log(response);

if(!response.ok) throw new Error("Failed to generate images");
        //On extrait les données de la réponse
        const data = await response.json();
        //mise à jour des cards avec les nouvelles données
        updateImageCard([...data]);
    } catch (error) {
        alert(error.message);
    }
}


const handleSubmission = (e) => {
    //Empêche le comportement par default du formulaire, à savoir recharger la page
    e.preventDefault();

    console.log(e);

    //srcElement[0] = input .prompt-input
    const userPrompt = e.srcElement[0].value;
    //srcElement[1] = select.img-quantity
    const userQuantity = e.srcElement[1].value;

    //Quand on fait "console.log(userPrompt, userQuantity)" et qu'on tape quelque chose dans le formulaire, on obtient d'abord 
    //ce que l'on a tapé puis un chiffre entre 1 et 4 correspondant au nombre de 
    //photos sélectionnées


    const imgCardMarkup = Array.from({length: userQuantity}, () => 
    `<div class="img-card loading">
    <img src="/images/loader.svg" alt="image">
    <a href="#" class="download-btn">
        <img src="/images/download.svg" alt=""download-icon">
    </a>
</div>`).join("");

}
imageGallery.innerHTML = imgCardMarkup;
generateAiImages(userPrompt, userQuantity);


generateForm.addEventListener("submit", handleSubmission);
