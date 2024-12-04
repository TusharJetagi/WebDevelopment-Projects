let bagItems;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItems();
  displayBagCountIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagCountIcon();
}

function displayBagCountIcon() {
  let itemsInBag = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    itemsInBag.style.visibility = "visible";
    itemsInBag.innerText = bagItems.length;
  } else {
    itemsInBag.style.visibility = "hidden";
  }
}

function displayItems() {
  let items_container = document.querySelector(".items-container");
  if (!items_container) {
    return;
  }
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `
<div class="item-content">
    <img src="${item.item_img}" alt="Image" class="item-img">
        <div class="ratings">
            ${item.rating.stars} ⭐ | ${item.rating.count}
        </div>
          <p class="company-name">${item.company_name}</p>
          <p class="item-name">${item.item_name}</p>
        <div class="price">
            <span class="curr-price">Rs.${item.current_price}</span>
            <span class="original-price">Rs.${item.original_price}</span>
            <span class="discount">(${item.discount}% OFF)</span>
        </div>
        <button class="add-to-bag" onclick ="addToBag(${item.id})">Add to Bag</button>
</div>`;
  });

  items_container.innerHTML = innerHTML;
}
