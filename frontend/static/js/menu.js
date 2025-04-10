

// MENU DESPLEGABLE


document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const favoritesMenu = document.getElementById("favoritesMenu");
  
    menuToggle.addEventListener("click", function () {
        favoritesMenu.classList.toggle("active");
    });

});