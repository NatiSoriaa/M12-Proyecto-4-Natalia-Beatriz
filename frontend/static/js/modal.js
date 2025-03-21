export function openModal() {
    document.getElementById('loginModal').style.display = 'block';
}

export function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Alternar entre Login y Registro
export function toggleForms(form) {
    const loginForm = document.getElementById("loginUser");
    const registerForm = document.getElementById("registerUser");
    
    if (form === 'login') {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}
