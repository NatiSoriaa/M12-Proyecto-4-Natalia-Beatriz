

/* BOTONES LOGIN Y REGISTER */


document.addEventListener("DOMContentLoaded", function () {

    // Selección de elementos
    const modal = document.getElementById("loginModal");
    const closeModalBtn = document.querySelector(".close");
    const loginBtn = document.getElementById("showLogin");
    const registerBtn = document.getElementById("showRegister");
    const loginForm = document.getElementById("loginUser");
    const registerForm = document.getElementById("registerUser");
  
    // Mostrar solo el formulario de registro por defecto
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  
    // Alternar a formulario de Login
    loginBtn.addEventListener("click", function () {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");
  
    });
  
    // Alternar a formulario de Register
    registerBtn.addEventListener("click", function () {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
        registerBtn.classList.add("active");
        loginBtn.classList.remove("active");
    });
  
    function closeModal() {
        modal.style.display = "none";
    }
  
    closeModalBtn.addEventListener("click", closeModal);

    // Evento para cerrar el modal al hacer clic fuera del contenido
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

});