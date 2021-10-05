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
  // boutton vider le panier

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
}

// ajout Prix totale du panier
let totalPrice = [];
for (let k = 0; k < productChoise.length; k++) {
  let totalPricePanier = productChoise[k].price * productChoise[k].quantity;
 /*  console.log(totalPrice); */

  // mettre les prix dans un tableau
  totalPrice.push(totalPricePanier);
 /*  console.log(totalPrice); */
}

// adition d'un tableau
let sum = 0;
for (let m = 0; m < totalPrice.length; m++) {
  sum += totalPrice[m];
}
/* console.log(sum); */

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
                <input type="text" id="firstName" name="nom" required>

                <label for="prenom">Prénom :</label>
                <input type="text" id="lastName" name="prenom" required>

                <label for="adresse">Adresse :</label>
                <input type="text" id="address" name="adresse" required>

                <label for="ville">Ville :</label>
                <input type="text" id="city" name="ville" required>

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


sendForm.onclick = (e) => {
  e.preventDefault();
  // creation d'un class qui va rassembler les information de mon formulaire
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  console.log(contact);
  localStorage.setItem("contact", JSON.stringify(contact))
  // validation du formulaire avec regex

  const regexNom = /^[A-Z-a-z\s]{3,40}$/;
  const regexVille = /^[A-Z-a-z\s]{3,40}$/;
  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,10}\.[a-z]{2,4}$/;
  const regexAdresse = /^[A-Z-a-z-0-9\s]{5,80}$/;

  if (
    regexMail.test(contact.email) == true &&
    regexNom.test(contact.firstName) == true &&
    regexNom.test(contact.lastName) == true &&
    regexVille.test(contact.city) == true &&
    regexAdresse.test(contact.address) == true
  ) {
    e.preventDefault();
  // rassembler le formulaire et les produits pour les envoyer au serv

  const orderValues = {
    productChoise,
    contact,
    sum,
  };

  localStorage.setItem("order", JSON.stringify(orderValues));

  console.log(orderValues);
  /*  localStorage.removeItem('produit') */
  // enoie avec POST
  
  
  const lastFetch = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( orderValues ),
  });
  console.log(lastFetch);
  // Pour voir le résultat du serveur dans la console
  /*  lastFetch.then(async (response) => {
    try {
      console.log("Response du serveur :" + response);
      const data = await response.json();
      console.log("Contenu du serveur : " + data);
      
      if (response.ok) {
        console.log(`Resultat de response.ok : ${response.ok}`);
        // Récupération de l'id de la response du serveur
        console.log("id de response");
        console.log("Id de la réponse :" + contenu.orderId);
        
        // Mettre le orderId dans le local storage
        localStorage.setItem("responseOrderId", contenu.orderId);
        
        // Aller vers la page confirmation-commande
        window.location = "order.html";
      } else {
        console.log(`Reponse du serveur : ${response.status}`);
        alert(`Problème avec le serveur : erreur ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }); */
    window.location.href = "./order.html";
} else {
  alert(
    "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
    );
  }
  
};
