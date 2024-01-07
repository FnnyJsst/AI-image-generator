const generateForm = document.querySelector(".generate-form");

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
}

generateForm.addEventListener("submit", handleSubmission);
