"use strict";



export function tableHandler() {
  let tbody = document.querySelector(".tbody");
  
  const db = firebase.firestore();
  
  db.collection("Kladi_Store").onSnapshot(function (snapshot) {
    let docs = snapshot.docs;
    docs.forEach((doc) => {
      let itemData = doc.data();     

      let tr = document.createElement("tr");
      let image = document.createElement("td");
      let name = document.createElement("td");
      let price = document.createElement("td");
      let category = document.createElement("td");
      let size = document.createElement("td");
      let quantity = document.createElement("td");
      let remove = document.createElement("td");
      let deleteBtn = document.createElement("button");

      image.innerHTML = `<img src=${itemData.image} alt=${itemData.name} width="100px">`;
      name.textContent = itemData.name;
      price.textContent = itemData.price;
      category.textContent = itemData.category;
      size.textContent = itemData.size;
      quantity.textContent = itemData.quantity;
      deleteBtn.textContent = `Delete`;
      remove.appendChild(deleteBtn);

      tr.setAttribute("data_ID", doc.id);

      tr.appendChild(image);
      tr.appendChild(name);
      tr.appendChild(price);
      tr.appendChild(category);
      tr.appendChild(size);
      tr.appendChild(quantity);
      tr.appendChild(remove);

      tbody.appendChild(tr)

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.target.parentNode.parentNode.getAttribute("data_ID");
        db.collection("Kladi_Store").doc(id).delete();
        let tr = document.querySelector(`[data_ID = '${doc.id}']`);
        tbody.removeChild(tr);
      });
    });

  });
}
