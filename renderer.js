const { ipcRenderer } = require('electron');

let allProducts = []; // Almacena todos los productos scrapeados
let currentIndex = 0; // Índice actual para mostrar productos

document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Muestra el spinner
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = '';
    document.getElementById('loadMoreButton').style.display = 'none';

    // Obtiene los valores del formulario
    const brand = document.getElementById('brand').value;
    const type = document.getElementById('type').value;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);

    console.log('Datos enviados al backend:', { brand, type, maxPrice });

    try {
        // Llama al backend usando ipcRenderer.invoke
        const products = await ipcRenderer.invoke('scrape-clothes', { brand, type, maxPrice });

        if (products.length === 0 || products[0].name === 'Error') {
            document.getElementById('results').innerHTML = '<p>No se encontraron productos.</p>';
        } else {
            // Guarda todos los productos en una variable global
            allProducts = products;
            currentIndex = 0;

            // Muestra los primeros 5 productos
            showProducts(allProducts.slice(currentIndex, currentIndex + 5));
            currentIndex += 5;

            // Muestra el botón "Ver más" si hay más productos
            if (currentIndex < allProducts.length) {
                document.getElementById('loadMoreButton').style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error al buscar productos:', error);
        document.getElementById('results').innerHTML = '<p>Ocurrió un error al buscar productos.</p>';
    } finally {
        // Oculta el spinner
        document.getElementById('loading').style.display = 'none';
    }
});

// Función para mostrar productos en bloques
function showProducts(products) {
    const resultsDiv = document.getElementById('results');
    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" style="max-width: 100px; height: auto;" />
                <div>
                    <h3>${product.name}</h3>
                    <p>Precio: €${product.price}</p>
                    <a href="${product.link}" target="_blank">Ver producto</a>
                </div>
            </div>
        `;
        resultsDiv.innerHTML += productHTML;
    });
}

// Maneja el botón "Ver más"
document.getElementById('loadMoreButton').addEventListener('click', () => {
    const nextProducts = allProducts.slice(currentIndex, currentIndex + 5);
    showProducts(nextProducts);
    currentIndex += 5;

    // Oculta el botón si no hay más productos
    if (currentIndex >= allProducts.length) {
        document.getElementById('loadMoreButton').style.display = 'none';
    }
});
