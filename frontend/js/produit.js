// selection de la class pour afficher le contenu

const result = document.querySelector(".card");

// récupération de l'id du produit
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("_id");

//modification de l'adresse d'appel à l'API
const newUrl = `http://localhost:3000/api/cameras/${newId}`;

// recuperer les donné API
let cam = [];
fetch(newUrl)
  .then((response) => response.json())
  .then((data) => {
    cam = data;

    console.log(cam);

    // structure html du produit

    const structureProduitSelect = `
  <div class="card-img">
    <img src="${cam.imageUrl}" alt="une image de ${cam.name}">
  </div>
  
  <div class="card-info">
    <h3>${cam.name}</h3>
    <h3>description : </h3>
    <p>${cam.description}</p>
    <em> Prix: ${cam.price / 100} € </em>
    </br>
    </br>
    <form>
      <label for="option">Choisir l'objectifs</label>

      <select name="option" id="option">
        
      
      </select>
    </form>
    <h3> Quantité :</p>
    <select id="quantity" aria-label="Quantité">
    <option selected value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
    </br>
    </br>
    </br>
    <button id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter l'article au panier</button>
  </div>      
  `;

    // injection html dans la page produit
    result.innerHTML += structureProduitSelect;

    // choix des options ..
    for (let lenses of cam.lenses) {
      document.getElementById(
        "option"
      ).innerHTML += `<option value="${lenses}">${lenses}</option>`;
    }

    // gestion des panier

    // recuperation des données selectionnées par l'utilisateur et envoie au panier

    // selection de l'id des options

    const idOptions = document.querySelector("#option");

    // selection de l'id des quantité
    const idQuantity = document.querySelector("#quantity");
 
    
    // bouton ajouter au panier
    
    const btnPanier = document.querySelector("#btn-envoyer");
    /* console.log(btnPanier); */
    
    /* envoyer le panier */
    
    btnPanier.addEventListener("click", (e) => {
      e.preventDefault();
      
      // mettre le choix dans une variable
      const choiseOption = idOptions.value;
      console.log(choiseOption);

      // mettre la quantité dans une variable
      const choiseQuantity = idQuantity.value;
      console.log(choiseQuantity);

      /* recuperation des valeur des option  */

      let optionsProduct = {
        camName: cam.name,
        id_Product: newId,
        option: choiseOption,
        quantity: choiseQuantity,
        price: cam.price / 100,
      };
      console.log(optionsProduct);

      // Local storage

      // stocker mes valeurs d'option dans le local storage
      // la variable que je stock dans le le local storage

      let productChoise = JSON.parse(localStorage.getItem("produit"));
      // JSON.parse sert a convertir les donné au format JSON
      // JSON.stringify sert a convertir au format JS

      console.log(productChoise);

      // fonction fenetre popup
      const confimationCommande = () => {
        if (
          window.confirm(`${cam.name} avec l'objectif : ${choiseOption} a bien été ajouter au panier ! 
Consultez le panier 'OK' retour a l'accueil 'ANNULER'`)
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      };
      //fonction ajouter un produit local storage
      const addLocalStorage = () => {
        // ajout dans le tableau de l'objet avec value choisie par utilisateur
        productChoise.push(optionsProduct);
        localStorage.setItem("produit", JSON.stringify(productChoise));
        confimationCommande();
      };
      // verifier si des produit sont present  dans le local storage
      if (productChoise) {
        addLocalStorage();
      } else {
        productChoise = [];
        addLocalStorage();
        console.log(productChoise);
      }
    });
  });
