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

## 🧪 Tecnologías Utilizadas

### 🔧 Frontend

- HTML5  
- CSS3  
- JavaScript (Vanilla)

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
