// MENU DESPLEGABLE

export function Menu() {

    // fav menu
    const favoritesMenu = document.getElementById("favoritesMenu");
    const favoritesToggle = favoritesMenu.querySelector("#menuToggle");
    const favoritesContent = favoritesMenu.querySelector(".menu-content");
    
    // user menu
    const userMenu = document.getElementById("menuUsuario");
    const userToggle = userMenu.querySelector("#userToggle");
    const userContent = userMenu.querySelector(".menu-content");
    
    // uses gsap library to show or hide menu
    function showMenu(menuContent) {
        gsap.to(menuContent, {
            duration: 0.05,
            opacity: 1,
            y: 0,
            display: "block",
            ease: "power2.out"
        });
    }
    
    function hideMenu(menuContent) {
        gsap.to(menuContent, {
            duration: 0.05,
            opacity: 0,
            y: 10,
            display: "none",
            ease: "power2.in"
        });
    }
    
    favoritesMenu.addEventListener("mouseenter", () => {
        showMenu(favoritesContent);
    });
    
    favoritesMenu.addEventListener("mouseleave", () => {
        hideMenu(favoritesContent);
    });
    
    userMenu.addEventListener("mouseenter", () => {
        showMenu(userContent);
    });
    
    userMenu.addEventListener("mouseleave", () => {
        hideMenu(userContent);
    });

};