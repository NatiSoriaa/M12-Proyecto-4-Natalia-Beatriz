# 🌍 Earth Map - Documentación del Proyecto

---

## 💡 Idea del Proyecto

Earth Map es una plataforma web interactiva que permite visualizar información detallada de todos los países del mundo sobre un globo terráqueo en 3D.  
El usuario puede:

- Buscar países.
- Visualizar datos generales y específicos.
- Marcar países como visitados o favoritos.
- Subir imágenes de viajes.

🎯 El objetivo es ofrecer una experiencia educativa, visual y entretenida para explorar el mundo.

---

## 🌐 Descripción General

La aplicación utiliza un modelo 3D interactivo de la Tierra construido con **Three.js**.  
El usuario puede:

- Buscar países por nombre.
- Ver información general y detallada.
- Colocar marcadores en el globo.
- Marcar países como favoritos o visitados.
- Generar PDFs con la información del país.
- Ver y subir imágenes a un álbum digital.

---

## 📐 Arquitectura

La arquitectura de nuestro proyecto es de tipo Frontend-Backend desacoplado (SPA + API REST).

![alt text](https://edteam-media.s3.amazonaws.com/blogs/original/a04ca961-f61d-4dc3-837c-55c06df42ce7.png)

### 🔧 Backend

- MVC donde la vista es el frontend
- Se encarga de la lógica de la autenticación y las sesiones
- Comunicación con el frontend via exposición de endpoints API RESTful
- Persistencia de base de datos

Lenguajes utilizados:

- PHP

## Autenticación

El usuario puede registrarse e iniciar sesión. Por defecto se le asigna el rol 'normal'. En función del usuario se muestran unos datos u otros.

## Sesión

Las sesiones se guardan mediante la generación de cookies en el backend. El frontend envía la petición al servidor junto con la cookie almacenada en el navegador y el 
servidor identifica qué usuario es. Así el usuario puede obtener respuestas sin salir de la sesión.

## Países

El usuario puede añadir la información de los paises a la base de datos. Se registra como país favorito y por defecto como visitado = 0. Cuando el usuario marca como visitado un país, este se añade a la base de datos o 
actualiza (si ya ha sido añadido a favoritos) el campo visitado a 1. 

Los campos de la base de datos user_favorites son rellenados mediante información recogida de apis externas.


### 🔧 Frontend

- HTML5  
- CSS3  
- JavaScript (Vanilla)

## 🧪 Tecnologías Utilizadas

### 📚 Librerías

- **Three.js** – Renderizado 3D interactivo.  
- **GSAP** – Animaciones fluidas.  
- **Toastr.js** – Notificaciones.  
- **Dropzone.js** – Subida de imágenes por Drag & Drop.  
- **html2pdf.js** – Exportar contenido como PDF.  
- **loading.io** – Animaciones de carga al iniciar sesión o registrarse.

### 🌐 APIs

- **RestCountries API** – Información sobre países.  
- **Nominatim (OpenStreetMap)** – Coordenadas geográficas.

---

## 🗂️ Estructura del Proyecto

![Estructura del proyecto](https://github.com/user-attachments/assets/08ac39c9-5665-4ef1-8074-c8e81d3cc23a)

---

## Modelo de la web (componentes)

![image](https://github.com/user-attachments/assets/c0699fbf-97ab-4968-9904-798cf322bb61)

---

## 🛢️ Estructura de la Base de Datos

![Base de datos](https://github.com/user-attachments/assets/1dd38fba-21ce-4d03-93bc-7920e3efb0d5)

---

## 🖼️ Sitio Web Visualmente

---

### 1. 🧭 Menú de Navegación

- Muestra submenús animados.
- Abre modales con información de países agregados.
- Funcionalidades:  
  - Favoritos  
  - Actividad  
  - Visitados  
  - País aleatorio  
  - Iniciar/Cerrar sesión  
  - Mi álbum

---

### 2. 🔍 Búsqueda de Países

- Barra superior para ingresar el nombre del país.
- Coloca marcador rojo, centra la cámara, y abre el modal informativo.

---

### 3. 📝 Modal de Información del País

- Muestra:
  - Capital
  - Región
  - Población
  - Idioma
  - Bandera
- Dos botones:
