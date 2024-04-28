document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired");
    fetchProducts();
    document.getElementById("sort").addEventListener("change", fetchSortedProducts);

    });
    document.getElementById("category").addEventListener("change", () => {
        console.log("Category dropdown changed");
        fetchFilteredProducts();
    })

async function fetchProducts() {
    try {
        console.log("Fetching products...");
        const response = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products");
        const products = await response.json();
        console.log(products);
        displayProducts(products);
    } 
    catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function fetchSortedProducts() {
    const sortBy = document.getElementById("sort").value;
    const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?sort=${sortBy}`)
    const sortedProducts = await response.json()
    displayProducts(sortedProducts);
}

async function fetchFilteredProducts() {
    const category = document.getElementById("category").value;
    console.log("Filtering products by category:", category);
    try {
        const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?category=${category}`);
        if (!response.ok) {
            throw new Error("Failed to fetch products. Server returned status " + response.status);
        }
        const filteredProducts = await response.json();
        console.log("Filtered products:", filteredProducts);
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error fetching filtered products:", error);
        // Display an error message to the user
        alert("Failed to fetch products. Please try again later.");
    }
}


function displayProducts(products) {
    const productContainer = document.getElementById("product-container");

    productContainer.innerHTML = "";

    if (!Array.isArray(products.data)) {
        console.error("Products data is not an array:", products);
        return;
    };
    
    products.data.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Create elements for product details
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;

        const title = document.createElement("h2");
        title.textContent = product.title;

        const brand = document.createElement("p");
        brand.textContent = "Brand: " + product.brand;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.textContent = "Price: " + product.price;

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => {
            addToCart(product);
        });

    
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(brand);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(addToCartButton);

        productContainer.appendChild(card);
    });
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}




