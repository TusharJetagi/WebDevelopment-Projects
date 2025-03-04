const search = () => {
  const searchBox = document.querySelector("#search-box").value.toUpperCase();
  const productList = document.querySelector("#product-list");
  const products = document.querySelectorAll(".product");
  const productName = productList.getElementsByTagName("h2");

  //   console.log(searchBox);
  //   console.log(productList);
  //   console.log(products);
  //   console.log(productName);

  for (let i = 0; i < productName.length; i++) {
    let itemName = products[i].getElementsByTagName("h2")[0]; // output: <h2> Boys Sneakers </h2>

    if (itemName) {
      let value = itemName.textContent || itemName.innerHTML; // output: Boys Sneakers

      if (value.toUpperCase().indexOf(searchBox) > -1) {
        // output: -1 or index of typed char

        products[i].style.display = "";
      } else {
        products[i].style.display = "none";
      }
    }
  }
};
