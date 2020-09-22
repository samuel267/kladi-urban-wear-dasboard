"use strict";

export function handleContent() {
  let add_item = document.getElementById("add_link");
  let manage_store = document.getElementById("manage_link");
  let customers = document.getElementById("customers_link");
  let orders = document.getElementById("orders_link");

  let item_div = document.getElementById("add_new_item");
  let store_div = document.getElementById("manage_store");
  let customers_div = document.getElementById("customers");
  let orders_div = document.getElementById("orders");

  function displayContent(link, div, div2, div3, div4) {
    link.addEventListener("click", () => {
      div.style.display = "block";
      div2.style.display = "none";
      div3.style.display = "none";
      div4.style.display = "none";
    });
  }
  
  displayContent(add_item, item_div, store_div, customers_div, orders_div);
  displayContent(manage_store, store_div, item_div, customers_div, orders_div);
  displayContent(customers, customers_div, item_div, store_div, orders_div);
  displayContent(orders, orders_div, item_div, store_div, customers_div);
}
