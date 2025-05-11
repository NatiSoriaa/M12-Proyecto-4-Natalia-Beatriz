
🌍 Earth Map - Documentación del Proyecto

Idea del Proyecto
Earth Map es una plataforma web interactiva que permite visualizar información detallada de todos los países del mundo sobre un globo terráqueo 3D. El usuario puede buscar países, visualizar sus datos, marcarlos como visitados o favoritos, y almacenar imágenes de sus viajes. El objetivo es ofrecer una experiencia educativa, visual y divertida para explorar el mundo.

Descripción General
La aplicación simula un planeta Tierra 3D interactivo utilizando Three.js. El usuario puede:
-Buscar países por nombre.
-Ver información general y detallada de cada país.
-Colocar marcadores sobre el globo.
-Marcar países como favoritos o visitados.
-Generar un PDF con la información.
-Ver y subir imágenes en un álbum digital.

Tecnologías Utilizadas
-Frontend:
-HTML5
-CSS
-JavaScript

Librerías:
-Three.js: renderizado 3D.
-GSAP: animaciones.
-Toastr.js: notificaciones.
-Dropzone.js: subida de imágenes.
-html2pdf.js: exportar información como PDF.

APIs:
-RestCountries API: información de países.
-Nominatim (OpenStreetMap): coordenadas geográficas.

Estructura del Proyecto
![Captura de pantalla 2025-05-11 230158](https://github.com/user-attachments/assets/3f668a4b-d34a-4769-b402-ea02bad7f19b)

ESTRUCTURA BASE DE DATOS
![Captura de pantalla 2025-05-11 211511](https://github.com/user-attachments/assets/1dd38fba-21ce-4d03-93bc-7920e3efb0d5)


🌍 Sitio Web Visualmente

1. Menú de Navegación
-Qué hace: muestra submenús animados y modals con cada pais agregado.
-Funciones: Favoritos, Actividad, Visitados, Buscar pais aleatorio, Iniciar/Cerrar sesión, Mi álbum.
![Captura de pantalla 2025-05-11 224216](https://github.com/user-attachments/assets/c7aaffad-2db4-44c4-b75c-be6a314b6cae)
![Captura de pantalla 2025-05-11 224244](https://github.com/user-attachments/assets/ce987ab3-6e49-4b35-aa48-64920f7255dd)

2. Búsqueda de Países
-Barra superior para ingresar nombre del país.
-Coloca marcador rojo, centra cámara, abre modal con información.
![Captura de pantalla 2025-05-11 224504](https://github.com/user-attachments/assets/64ac84bb-3deb-4ac7-956c-cfa2b0920bcd)

3. Modal de Información del País
-Muestra capital, región, población, idioma, bandera.
-Dos botones: "Información" y "Imágenes".
![Captura de pantalla 2025-05-11 224631](https://github.com/user-attachments/assets/7fa94629-330c-44fd-9c0b-33e93e87ff46)

4. Galería de Imágenes (Mi Álbum)
-Subida de imágenes por Drag & Drop.
-Usa Dropzone.js.
![Captura de pantalla 2025-05-11 224831](https://github.com/user-attachments/assets/ac3e9ccd-7871-42a2-8f1e-c5c9f4fe76b8)

5. Modal de País Aleatorio
-Botón aleatorio muestra país con datos básicos.
-HTML: #random-country-modal
-JS: randomCountryApi.js
![Captura de pantalla 2025-05-11 225017](https://github.com/user-attachments/assets/c73523a2-ec7f-432a-b6ad-0005b193e44b)

6. Login y Registro de Usuario
-Modal con dos formularios: Login / Register.
-Conmutación visual entre formularios.
-HTML: #loginModal
-JS: login-register.js
![Captura de pantalla 2025-05-11 225120](https://github.com/user-attachments/assets/b4ae3f12-43c6-4de3-ba89-7a362035a29a)

7. Actividad y Países Visitados
-Muestra en el globo países amarillos como "busqueda reciente".
-Guarda actividad en localStorage.
-JS: index-antiguo.js 
--saveVisitedCountry()
--showVisitedCountries()
--removeVisitedMarkers()
