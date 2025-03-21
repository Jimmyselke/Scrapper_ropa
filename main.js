const { app, BrowserWindow, ipcMain } = require('electron');
const puppeteer = require('puppeteer');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');
});

// Manejador IPC para el scraping
ipcMain.handle('scrape-clothes', async (event, { brand, type, maxPrice }) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();

        // Rotar user-agent
        const userAgentList = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15'
        ];
        const randomUserAgent = userAgentList[Math.floor(Math.random() * userAgentList.length)];
        await page.setUserAgent(randomUserAgent);

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.google.com/'
        });

        // Construye la URL dinámicamente
        const url = `https://www.zalando.es/catalogo/?q=${encodeURIComponent(brand + ' ' + type)}`;
        console.log('Navegando a:', url);

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            console.log('Página cargada correctamente.');
        } catch (error) {
            console.error('Error al cargar la página:', error.message);
            return [{ name: 'Error', price: '', link: '#', image: '' }];
        }

        // Simula un scroll hacia abajo para cargar más productos
        await page.evaluate(() => {
            window.scrollBy(0, document.body.scrollHeight);
        });

        // Función para esperar un tiempo específico (en milisegundos)
        const waitForTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await waitForTimeout(2000); // Espera 2 segundos

        try {
            // Verifica si los productos existen en el DOM
            const productCount = await page.$$eval('article.z5x6ht', products => products.length);
            console.log(`Productos encontrados: ${productCount}`);

            if (productCount === 0) {
                console.error('No se encontraron productos en el DOM.');
                return [{ name: 'Error', price: '', link: '#', image: '' }];
            }

            // Espera a que las imágenes se carguen dinámicamente
            await page.waitForSelector('article.z5x6ht img[src]', { timeout: 60000 });
            console.log('Imágenes cargadas dinámicamente.');
        } catch (error) {
            console.error('No se encontraron productos o imágenes:', error.message);
            return [{ name: 'Error', price: '', link: '#', image: '' }];
        }

        // Extrae los datos
        // Extrae los datos
// Extrae los datos
const data = await page.evaluate(({ maxPrice, baseUrl }) => {
    const items = Array.from(document.querySelectorAll('article.z5x6ht')).map(product => {
        // Extraer el nombre del producto
        const nameElement = product.querySelector('h3');
        const name = nameElement ? nameElement.innerText.trim() : 'Sin nombre';

        // Extraer el precio
        const priceElement = product.querySelector('span.voFjEy.lystZ1'); // Selector ajustado
        let priceText = priceElement ? priceElement.innerText.trim() : '0';
        console.log('Precio sin limpiar:', priceText); // Log para depuración

        // Limpiar el precio
        priceText = priceText.replace(/[^\d,]/g, '').replace(',', '.'); // Eliminar todo excepto números y comas
        console.log('Precio limpio:', priceText); // Log para depuración

        const price = parseFloat(priceText) || 0; // Convertir a número

        // Extraer el enlace
        const link = product.querySelector('a')?.href || '#';

        // Extraer la URL de la imagen
        const imageElement = product.querySelector('img[src]');
        let image = imageElement ? imageElement.src : '';

        // Convertir la URL a absoluta si es relativa
        if (image && !image.startsWith('http')) {
            image = new URL(image, baseUrl).href;
        }

        return { name, price, link, image };
    }).filter(item => {
        // Filtrar productos con precio mayor a 0 y otros campos válidos
        return item.price > 0 && item.name !== 'Sin nombre' && item.image && item.link !== '#';
    }).filter(item => item.price <= maxPrice); // Filtra por precio máximo

    return items;
}, { maxPrice, baseUrl: 'https://www.zalando.es' });

        console.log('Datos scrapeados:', data);
        await browser.close();
        return data;
    } catch (error) {
        console.error('Error en Puppeteer:', error.message);
        return [{ name: 'Error', price: '', link: '#', image: '' }];
    }
});
