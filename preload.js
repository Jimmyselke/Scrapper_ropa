document.getElementById('searchButton').addEventListener('click', async () => {
    const brand = document.getElementById('brand').value;
    const type = document.getElementById('type').value;
    const size = document.getElementById('size').value;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);

    const results = await window.electronAPI.scrapeClothes({ brand, type, size, maxPrice });

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    results.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Precio: ${item.price} €</p>
            <a href="${item.link}" target="_blank">Ver producto</a>
        `;
        resultsContainer.appendChild(productDiv);
    });
});
