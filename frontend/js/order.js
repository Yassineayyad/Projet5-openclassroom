// selection de la class pour afficher le contenu

const result = document.querySelector(".container");

const info = JSON.parse(localStorage.getItem("order"));

let orderId = localStorage.getItem('orderid')
 console.log(orderId);

const user = info.contact;



const priceToPay = info.sum
const orderHtml = document.querySelector(".card2");

orderHtml.innerHTML = `
 <p>Bonjour ${user.firstName} ${user.lastName}.</br> </br> Votre commande N° <strong> ${orderId} </strong> au prix de ${priceToPay}€ a bien été effectuer et sera livrez au <span>${user.address} à ${user.city}</span>. </br> </br> </br> Un E-mail de confirmation et un suivis de votre commande  ont été envoyer a  ${user.email} . </br> </br> </br> Merci pour votre confiance </p>
        
 <button class="boutonAjout"id="back">retour a l'accueil ! </button>
        
        `;


const back = document.getElementById("back");

back.onclick = (e) => {
    e.preventDefault();
    location.href = "index.html"
    
    
}
localStorage.clear();