//I************************************************REQUÊTE VERS L'ADRESS API DU SERVEUR POUR RECUPERATION DE DONNES*************************************
const donneesApi = fetch("http://localhost:3000/api/cameras");
donneesApi.then(async (result) => {
  console.log(result);
  let res = await result.json();
  afficheInfos(res);
});
//**********************************************************FIN DE RECUPERATION DE DONNES*************************************

// II-déclaration de variables (tableau) pour stocker les infos de l'api
let titre = [];
let price = [];
let description = [];
let _id = [];
let imageUrl = [];
let i = [];
let produits = "";

// III-Fonction qui va afficher les produits dans la page web automatiquement
function afficheInfos(infos) {
  //1-Sélection élément du DOM
  const placementInfos = document.querySelector(".row");

  //2-Boucle for pour afficher tous les objets ligne par ligne
  for (i = 0; i < infos.length; i++) {
    //3-mettre les données dans les variables
    infos.forEach((element, i) => {
      titre[i] = element.name;
      price[i] = element.price;
      description[i] = element.description;
      _id[i] = element._id;
      imageUrl[i] = element.imageUrl;
    });
    //4-afficher tous les objets sur la page web
    // on fait une récurssivité de la variable à chaque tour de boucle pour afaire appaître les autre éléments
    produits =
      produits +
      `
            <div class="card">
                <img src="${imageUrl[i]}" alt="une image de la camera ${
        titre[i]
      }">
                <div >
                    <h5>${titre[i]} <span>${price[i] / 100} €</span></h5>
                    <p>${description[i]}</p>
                </div>
                <a class="boutonAjout" href="produit.html?_id=${
                  _id[i]
                }"> <strong>acheter cette article</strong> </a>
                <br/>
            </div>
            <br/><br/>
        </a>`;
    placementInfos.innerHTML = produits;
  }
}
