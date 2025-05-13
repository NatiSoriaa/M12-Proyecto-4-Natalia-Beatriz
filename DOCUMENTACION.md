
##🌍 Earth Map - Documentación del Proyecto


#Idea del Proyecto

Earth Map es una plataforma web interactiva que permite visualizar información detallada de todos los países del mundo sobre un globo terráqueo 3D. El usuario puede buscar países, visualizar sus datos, marcarlos como visitados o favoritos, y almacenar imágenes de sus viajes. El objetivo es ofrecer una experiencia educativa, visual y divertida para explorar el mundo.


#Descripción General

La aplicación simula un planeta Tierra 3D interactivo utilizando Three.js. El usuario puede:

-Buscar países por nombre.

-Ver información general y detallada de cada país.

-Colocar marcadores sobre el globo.

-Marcar países como favoritos o visitados.

-Generar un PDF con la información.

-Ver y subir imágenes en un álbum digital.


#Tecnologías Utilizadas


-Frontend:

--HTML5

--CSS

--JavaScript


#Librerías:

-Three.js: renderizado 3D.

-GSAP: animaciones.

-Toastr.js: notificaciones.

-Dropzone.js: subida de imágenes.

-html2pdf.js: exportar información como PDF.

-loading.io: barra de carga al iniciar sesion o registrarse


#APIs:

-RestCountries API: información de países.

-Nominatim (OpenStreetMap): coordenadas geográficas.



#ESTRUCTURA DEL PROYECTO

<img width="128" alt="image" src="https://github.com/user-attachments/assets/08ac39c9-5665-4ef1-8074-c8e81d3cc23a" />



#ESTRUCTURA BASE DE DATOS

![Captura de pantalla 2025-05-11 211511](https://github.com/user-attachments/assets/1dd38fba-21ce-4d03-93bc-7920e3efb0d5)




##🌍 Sitio Web Visualmente



#1. Menú de Navegación

-Qué hace: muestra submenús animados y modals con cada pais agregado.

-Funciones: Favoritos, Actividad, Visitados, Buscar pais aleatorio, Iniciar/Cerrar sesión, Mi álbum.



#2. Búsqueda de Países

-Barra superior para ingresar nombre del país.

-Coloca marcador rojo, centra cámara, abre modal con información.



#3. Modal de Información del País

-Muestra capital, región, población, idioma, bandera.

-Dos botones: "Información" y "Imágenes".



#4. Galería de Imágenes (Mi Álbum)

-Subida de imágenes por Drag & Drop.

-Usa Dropzone.js.



#5. Modal de País Aleatorio

-Botón aleatorio muestra país con datos básicos.

-HTML: #random-country-modal

-JS: randomCountryApi.js



#6. Login y Registro de Usuario

-Modal con dos formularios: Login / Register.

-Conmutación visual entre formularios.

-HTML: #loginModal

-JS: login-register.js



#7. Actividad y Países Visitados

-Muestra en el globo países amarillos como "busqueda reciente".

-Guarda actividad en localStorage.

-JS: index-antiguo.js 

--saveVisitedCountry()

--showVisitedCountries()

--removeVisitedMarkers()
