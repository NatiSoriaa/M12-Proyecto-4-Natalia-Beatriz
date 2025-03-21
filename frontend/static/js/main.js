import { openModal, closeModal, toggleForms } from "./modal.js";
import { login, createUser } from "./auth-login-register.js";
import { searchCountryLocation } from "./search-country.js";
import "./three.js"; // Carga Three.js

document.addEventListener("DOMContentLoaded", () => {
    // Manejo del modal
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('showLogin').addEventListener('click', () => toggleForms('login'));
    document.getElementById('showRegister').addEventListener('click', () => toggleForms('register'));

    // Manejo de formularios
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("log-user").value;
        const password = document.getElementById("log-passw").value;
        login(username, password);
    });

    document.getElementById("registerForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("reg-user").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-passw").value;
        createUser(username, email, password);
    });

    // Manejo de búsqueda en el globo
    document.getElementById("input").addEventListener("change", (event) => {
        searchCountryLocation(event.target.value);
    });
});
