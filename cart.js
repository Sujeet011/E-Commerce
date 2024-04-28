// cart.js
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    const totalContainer = document.getElementById("total-price");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>No items in cart</p>";
    } else {
        cart.forEach((product, index) => {
            const item = document.createElement("div");
            item.classList.add("cart-item");

            const itemName = document.createElement("h3");
            itemName.textContent = product.title;

            const itemPrice = document.createElement("p");
            itemPrice.textContent = "Price: " + product.price;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                removeItemFromCart(index);
            });

            item.appendChild(itemName);
            item.appendChild(itemPrice);
            item.appendChild(removeButton);

            cartContainer.appendChild(item);

            totalPrice += parseFloat(product.price);
        });
    }

    totalContainer.textContent = totalPrice.toFixed(2);
}

function removeItemFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
