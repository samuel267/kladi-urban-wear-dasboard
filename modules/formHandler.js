"use strict";

export function formHandler() {
  let fileInput = document.getElementById("image_file");
  let upload_btn = document.getElementById("uploadBtn");
  let image_preview = document.getElementById("_image");
  let image_text = document.getElementById("image_text");
  let form = document.getElementById("upload_form");
  let succesMsg = document.getElementById("state");

  function scaleSuccesMsg() {
    succesMsg.style.transform = "scaley(1)";
    setTimeout(() => {
      succesMsg.style.transform = "scaley(0)";
    }, 3000);
  }

  upload_btn.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.click();
  });

  function resetImage() {
    image_preview.style.display = "none";
    image_text.style.display = null;
    image_preview.setAttribute("src", "");
  }

  fileInput.addEventListener("change", (e) => {
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let filePath = fileInput.value;
    let file = fileInput.files[0];

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file: Not an Image");
      fileInput.value = "";
      return false;
    } else {
      if (file) {
        const reader = new FileReader();

        image_preview.style.display = "block";
        image_text.style.display = "none";

        reader.addEventListener("load", (e) => {
          image_preview.setAttribute("src", e.target.result);
        });
        reader.readAsDataURL(file);
      } else {
        resetImage();
      }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let reg = /^[0-9]*$/g;
    let image_file = form.image.files[0];

    const storage = firebase.storage();
    const db = firebase.firestore();

    console.log(form.value);
    if (reg.exec(form.item_name.value)) {
      alert("Item name is not a Valid word");
    }

    if (!form.image.value) {
      alert("Image file is Missing");
    }

    storage
      .ref("Kladi_images/" + image_file.name)
      .put(image_file)
      .on(
        "state_changed",
        (snapshot) => {
          return snapshot;
        },
        (error) => {
          alert("Error Occured while saving: ", error.message);
        },
        () => {
          storage
            .ref("Kladi_images")
            .child(image_file.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("Kladi_Store")
                .doc()
                .set({
                  name: form.item_name.value,
                  category: form.category.value,
                  image: url,
                  price: form.price.value,
                  size: form.size.value,
                  quantity: form.quantity.value,
                })
                .then(function () {
                  form.item_name.value = "";                 
                  form.image.value = null;
                  form.price.value = 1;
                  form.quantity.value = 1;
                  resetImage();
                  scaleSuccesMsg();
                })
                .catch(function (error) {
                  alert("Error Occured while saving: ", error.message);
                });
            })
            .catch((error) => {
              alert("Error Occured while saving: ", error.message);
            });
        }
      );
  });
}
