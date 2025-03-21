# README.md

## Buscador de Ropa

### Descripción del Proyecto

El **Buscador de Ropa** es una aplicación de escritorio desarrollada con **Electron** que permite a los usuarios buscar prendas de vestir en la tienda online **Zalando**. La aplicación utiliza **Puppeteer**, una librería de Node.js para controlar navegadores headless, para realizar web scraping y extraer información sobre productos de una marca y tipo específicos, filtrando los resultados por un precio máximo. Los resultados se muestran en una interfaz gráfica amigable, donde el usuario puede ver detalles como el nombre del producto, el precio, una imagen y un enlace directo al producto en Zalando.

Esta aplicación es ideal para aquellos que buscan prendas específicas en Zalando y desean filtrar los resultados por precio, ahorrando tiempo en la búsqueda manual.

---

### Autoevaluacion
  - Nota: 8.5

### Características Principales

1. **Búsqueda por Marca y Tipo de Prenda**:
   - Los usuarios pueden ingresar una marca (ej. Nike) y un tipo de prenda (ej. Camiseta) para buscar productos específicos.
   - La aplicación realiza una búsqueda en tiempo real en Zalando y muestra los resultados filtrados.

2. **Filtrado por Precio Máximo**:
   - Los usuarios pueden especificar un precio máximo para filtrar los resultados.
   - Solo se muestran los productos que cumplen con el criterio de precio.

3. **Paginación de Resultados**:
   - Los productos se muestran en bloques de 5 para evitar sobrecargar la interfaz.
   - Un botón "Ver más" permite cargar más resultados si hay más productos disponibles.

4. **Interfaz Gráfica Amigable**:
   - La interfaz está diseñada con CSS moderno, con un diseño responsive y atractivo.
   - Los resultados se muestran en tarjetas con imágenes, nombres, precios y enlaces directos a los productos.

5. **Web Scraping con Puppeteer**:
   - La aplicación utiliza Puppeteer para navegar por Zalando y extraer la información de los productos.
   - Se implementan técnicas para evitar bloqueos, como la rotación de user-agents y el uso de headers personalizados.

---

### Tecnologías Utilizadas

- **Electron**: Framework para construir aplicaciones de escritorio multiplataforma usando JavaScript, HTML y CSS.
- **Puppeteer**: Librería de Node.js para controlar navegadores headless y realizar web scraping.
- **Node.js**: Entorno de ejecución para JavaScript en el lado del servidor.
- **HTML/CSS**: Para la construcción y diseño de la interfaz gráfica.
- **JavaScript**: Lenguaje de programación utilizado para la lógica de la aplicación.

---

### Instrucciones de Instalación y Ejecución

#### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js**: Puedes descargarlo desde [aquí](https://nodejs.org/).
- **Git**: Opcional, pero recomendado para clonar el repositorio. Puedes descargarlo desde [aquí](https://git-scm.com/).

#### Pasos para Instalar y Ejecutar el Proyecto

1. **Clonar el Repositorio**:
   Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/buscador-de-ropa.git
   cd buscador-de-ropa

   
2. **Instalar Dependencias**:
   Una vez dentro del directorio del proyecto, instala las dependencias necesarias ejecutando:

   ```bash
     npm install

3. **Ejecutar la Aplicacion**:
    Para iniciar la aplicación, ejecuta el siguiente comando:

  ```bash
    npm start
