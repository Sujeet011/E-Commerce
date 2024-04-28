document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired");
    fetchProducts();
    document.getElementById("sort").addEventListener("change", () => {
        console.log("Sort dropdown changed");
        fetchSortedProducts();
    });
    document.getElementById("category").addEventListener("change", () => {
        console.log("Category dropdown changed");
        fetchFilteredProducts();
    });
});

async function fetchProducts() {
    try {
        console.log("Fetching products...");
        const response = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products");
        const products = await response.json();
        console.log(products);
        displayProducts(products);
       
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function fetchSortedProducts() {
    const sortBy = document.getElementById("sort").value;
    console.log("Sorting products by:", sortBy);
    const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?sort=${sortBy}`);
    const sortedProducts = await response.json();
    console.log("Sorted products:", sortedProducts);
    displayProducts(sortedProducts);
}

async function fetchFilteredProducts() {
    const category = document.getElementById("category").value;
    console.log("Filtering products by category:", category);
    const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?category=${category}`);
    const filteredProducts = await response.json();
    console.log("Filtered products:", filteredProducts);
    displayProducts(filteredProducts);
}
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");

    if (!Array.isArray(products.data)) {
        console.error("Products data is not an array:", products);
        return; 
    }

 
    productContainer.innerHTML = "";

    products.data.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

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

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(brand);
        card.appendChild(category);
        card.appendChild(price);

        productContainer.appendChild(card);
    });
}
