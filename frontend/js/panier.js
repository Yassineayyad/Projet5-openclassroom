let productChoise = JSON.parse(localStorage.getItem("produit"));

//-- Affichage des produit du panier

// selection de la clase pour html

const structureProduct = document.querySelector(".card2");
console.log(structureProduct);

// controler si le panier est vide

if (productChoise === null || productChoise == 0) {
  const panierNull = `
    <div class= "panier-vide">
        <div> le panier est vide </div>
    </div>
    `;
  structureProduct.innerHTML = panierNull;
} else {
  let productPanier = [];
  for (i = 0; i < productChoise.length; i++) {
    // a chaque tour de boucle tu m'inject le code html
    const quantityPrice = productChoise[i].quantity * productChoise[i].price;
    productPanier =
      productPanier +
      `
        
            <div class="recap" id="${productChoise[i].id_Product}">
                <div>${productChoise[i].camName} - x ${productChoise[i].quantity} - prix : ${quantityPrice} €</div>
                <button class="remove" id="${productChoise[i].id_Product}"><i class="fas fa-trash-alt"></i></button>
            </div>

        
      
        `;
  }

  structureProduct.innerHTML = productPanier;

  console.log(productChoise[1]);
}

// gestion bouton supprimer l'article
let btnRemove = document.querySelectorAll(".remove");
console.log(btnRemove);

for (let l = 0; l < btnRemove.length; l++) {
  btnRemove[l].addEventListener("click", (e) => {
    e.preventDefault();

    // section de l'id qui va etre suprimé

    let removeProduct = productChoise[l].id_Product;
    console.log(removeProduct);

    // on utilise la methode filter avec le != pour suprimé celui qu'on cible
    productChoise = productChoise.filter(
      (produit) => produit.id_Product !== removeProduct
    );

    // on envoi la variable dans le local storage

    // on transgorm en Json et on renvoi au local storage
    localStorage.setItem("produit", JSON.stringify(productChoise));

    // alerte pour dire que c'est supprimé et recharger la page
    window.location.href = "panier.html";
    alert("ce produit a été supprimer de votre panier");
  });
}
// boutton vier le panier

const btnRemoveAll = `
<button class="remove-all"> Videz le panier </button>
`;

structureProduct.insertAdjacentHTML("beforeend", btnRemoveAll);

const removeAll = document.querySelector(".remove-all");

removeAll.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("produit");
  alert(" le panier a été vidé ");
  window.location.href = "panier.html";
});

// ajout Prix totale du panier
let totalPrice = [];
for (let k = 0; k < productChoise.length; k++) {
  let totalPricePanier = productChoise[k].price * productChoise[k].quantity;
  console.log(totalPrice);

  // mettre les prix dans un tableau
  totalPrice.push(totalPricePanier);
  console.log(totalPrice);
}

// adition d'un tableau
let sum = 0;
for (let m = 0; m < totalPrice.length; m++) {
  sum += totalPrice[m];
}
console.log(sum);

// afficher le prix  total sur le site

const sumTotalPrice = ` 
 <div class="display-price"> Le prix total a payé : ${sum} €</div>
 `;
structureProduct.insertAdjacentHTML("beforeend", sumTotalPrice);

// mise en place d'un formulaire

const displayFormHtml = () => {
  const formPositon = document.querySelector(".card2");

  const structureform = `
  <div class="form-order">
            <h2>Merci de remplir ce formulaire pour passer votre commande</h2>
            <form>
                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required>

                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" required>

                <label for="adresse">Adresse :</label>
                <input type="text" id="adresse" name="adresse" required>

                <label for="ville">Ville :</label>
                <input type="text" id="ville" name="ville" required>

                <label for="codePostal">Code Postal :</label>
                <input type="text" id="codePostal" name="codePostal" required>

                <label for="email">E-mail :</label>
                <input type="text" id="email" name="email" required>

                <label for="tel">Tel :</label>
                <input type="text" id="tel" name="tel" required>

                <button id="sendForm" type="submit">Valider la commande</button>

            </form>
        </div>
  
  `;

  formPositon.insertAdjacentHTML("afterend", structureform);
};
displayFormHtml();

// recuperation des valeurs du form et envoyer au Local storage

// selection du btn envoyer le form

const sendForm = document.getElementById("sendForm");

/* const user = {
  nom: nom.value,
  prenom: prenom.value,
  adresse: adresse.value,
  ville: ville.value,
  codePostal: codePostal.value,
  email: email.value,
  tel: tel.value,
}; */

sendForm.onclick = () => {
  // creation d'un class qui va rassembler les information de mon formulaire
  class Formulaire {
    constructor() {
      this.nom = document.getElementById("nom").value;
      this.prenom = document.getElementById("prenom").value;
      this.adresse = document.getElementById("adresse").value;
      this.ville = document.getElementById("ville").value;
      this.email = document.getElementById("email").value;
      this.codePostal = document.getElementById("codePostal").value;
      this.tel = document.getElementById("tel").value;
    }
  }

  const formulaireValues = new Formulaire();

  console.log(formulaireValues);

/*   localStorage.setItem("nom", JSON.stringify(formulaireValues));
  localStorage.setItem("produit", JSON.stringify(productChoise)); */
  // rassembler le formulaire et les produits pour les envoyer au serv

  const orderValues = {
    productChoise,
    formulaireValues,
    sum,
  };
  localStorage.setItem("order", JSON.stringify(orderValues));
  document.location.href = "order.html";

  console.log(orderValues);
  // enoie avec POST
  fetch("http://localhost:3000/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderValues }),
  })
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("order", JSON.stringify(data));
  });
};
