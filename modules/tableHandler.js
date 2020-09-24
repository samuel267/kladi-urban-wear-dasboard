"use strict";

export function tableHandler() {
  const db = firebase.firestore();
  function manageStore(storeItems) {
    let tbody = document.querySelectorAll(".tbody");
    tbody[0].innerHTML = "";
    storeItems.forEach((item) => {
      let tr = document.createElement("tr");
      let imageDt = document.createElement("td");
      let image = document.createElement("img");
      let name = document.createElement("td");
      let price = document.createElement("td");
      let category = document.createElement("td");
      let size = document.createElement("td");
      let quantity = document.createElement("td");
      let remove = document.createElement("td");
      let deleteBtn = document.createElement("button");

      image.alt = item.data().name;
      image.src = item.data().image;
      image.setAttribute("width", "100px");

      name.textContent = item.data().name;
      price.textContent = item.data().price;
      category.textContent = item.data().category;
      size.textContent = item.data().size;
      quantity.textContent = item.data().quantity;
      deleteBtn.textContent = `Delete`;
      remove.appendChild(deleteBtn);
      imageDt.appendChild(image);

      tr.setAttribute("data_ID", item.id);

      tr.appendChild(imageDt);
      tr.appendChild(name);
      tr.appendChild(price);
      tr.appendChild(category);
      tr.appendChild(size);
      tr.appendChild(quantity);
      tr.appendChild(remove);

      tbody[0].appendChild(tr);

      deleteBtn.addEventListener("click", (e) => {
        let id = e.target.parentNode.parentNode.getAttribute("data_ID");
        db.collection("Kladi_Store").doc(id).delete();
        let tr = document.querySelector(`[data_ID = '${item.id}']`);
        tbody[0].removeChild(tr);
      });
    });
  }

  db.collection("Kladi_Store").onSnapshot(function (snapshot) {
    let docs = snapshot.docs;

    manageStore(docs);
  });
}
