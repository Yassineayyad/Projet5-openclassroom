// selection de la class pour afficher le contenu

const result = document.querySelector(".container");

const info = JSON.parse(localStorage.getItem("order"));
/*  console.log(info); */

const user = info.formulaireValues;
console.log(user);
console.log(typeof user);

const produit = info.productChoise;
console.log(produit);
console.log(typeof produit);

const priceToPay = info.sum
const orderHtml = document.querySelector(".card2");

orderHtml.innerHTML = `
 <p>Bonjour ${user.firstName} ${user.lastName} votre commande au prix de ${priceToPay}  a bien été effectuer et sera livrez au <span>${user.address} à ${user.city}${user.codePostal} </span>. </br> Un E-mail de confirmation a été envoyer a ${user.email} . </br> Merci pour votre confiance </p>
        
 <button class="boutonAjout"id="back">retour a l'accueil ! </button>
        
        `;


const back = document.getElementById("back");

back.onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem("order", "produit");
    location.href = "index.html"


}