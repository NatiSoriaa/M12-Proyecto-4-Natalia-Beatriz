// IMPORTAR TOASTR

import { loadToastr } from "./toastr.js";




// INICIALIZAR APP AL CARGAR DOM




document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
});




// FUNCIÓN PRINCIPAL PARA INICIALIZAR




async function initializeApp() {
    document.getElementById('usuario-nombre').style.visibility = 'hidden';
    document.getElementById('selectIniciarSesion').style.display = 'none';
    document.getElementById('selectCerrarSesion').style.display = 'none';
    document.getElementById('loginModal').style.display = 'none';

    loadToastr();

    try {
        // const session = await checkAndHandleSession();
        setupFormEvents();
        setupModalEvents();
        setupLogoutButton();

        setTimeout(() => {
            document.getElementById('usuario-nombre').style.visibility = 'visible';
        }, 300);
        
        checkAndHandleSession()
        .then(session => {
            console.log('Sesión verificada:', session);
        })
        .catch(error => {
            console.error('Error al verificar sesión:', error);
        });

    } catch (error) {
        console.error('Error inicializando app:', error);
    }
}




// COMPROBAR Y GESTIONAR SESIÓN




async function checkAndHandleSession() {
    try {
        const session = await checkSession();
        const modal = document.getElementById('loginModal');
        const iniciarSesionBtn = document.getElementById('selectIniciarSesion');
        const cerrarSesionBtn = document.getElementById('selectCerrarSesion');
        const nombreUsuario = document.getElementById('usuario-nombre');

        if (session.logged) {
            modal.style.display = 'none';

            gsap.fromTo(nombreUsuario, { opacity: 0, y: -20 }, { opacity: 1, y:0, duration: 0.5, ease:'power2.out', 
                onStart: () => {
                    nombreUsuario.textContent = session.nom;
                    nombreUsuario.style.visibility = 'visible';
                }
            });

            iniciarSesionBtn.style.display = 'none';
            cerrarSesionBtn.style.display = 'block';

        } else {
            iniciarSesionBtn.style.display = 'block';
            cerrarSesionBtn.style.display = 'none';
            showModal();
        }

        return session;
    } catch (error) {
        document.getElementById('selectIniciarSesion').style.display = 'block';
        document.getElementById('selectCerrarSesion').style.display = 'none';
        return { logged: false };
    }
}




// CONFIGURAR EVENTOS DE FORMULARIOS




function setupFormEvents() {
    document.querySelector('#loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('log-user').value;
        const password = document.getElementById('log-passw').value;
        window.loggedEmail = email;
        localStorage.setItem('loggedEmail', email);
        showLoadingBar(() => login(email, password)); 
    });

    document.querySelector('#registerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('reg-user').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-passw').value;
        showLoadingBar(() => createUser(username, email, password)); 
    });
}




// CONFIGURAR EVENTOS DEL MODAL




function setupModalEvents() {
    const modal = document.getElementById('loginModal');
    const closeModalBtn = document.querySelector('.close');
    const loginBtn = document.getElementById("showLogin");
    const registerBtn = document.getElementById("showRegister");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // login por defecto
    loginForm.classList.add("active");

    loginBtn.addEventListener("click", () => {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");
    });

    registerBtn.addEventListener("click", () => {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
        registerBtn.classList.add("active");
        loginBtn.classList.remove("active");
    });

    document.getElementById('selectIniciarSesion').addEventListener('click', async () => {
        const session = await checkSession();
        if (!session.logged) {
            showModal();
        }
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}




// CONFIGURAR BOTÓN DE CERRAR SESIÓN




function setupLogoutButton() {
    document.querySelector('#selectCerrarSesion').addEventListener('click', () => {
        showLoadingBar(() => logout());
    });
}




// MOSTRAR Y OCULTAR MODAL




function showModal() {
    const modal = document.getElementById('loginModal');
    if (modal.style.display === 'flex') return;
    modal.style.display = 'flex';
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.5 });
}

function closeModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    gsap.to(modal, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            modal.style.display = 'none';
        }
    });
}




// MOSTRAR / OCULTAR CONTRASEÑA




function showHidePasswd() {
    var password = document.getElementById("log-passw");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

document.querySelector('.password-toggle-icon').addEventListener('click', () => {
    showHidePasswd();
});




// FUNCIÓN DE LOGIN




async function login(email, password) {
    const session = await checkSession();

    if (session.logged) {
        closeModal();
        return;
    }

    try {
        const response = await fetch("https://earth-project-backend.onrender.com/index.php?action=login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contrasenya: password }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok && data.success) {
            const sessionCheck = await checkSession();

            if (sessionCheck.logged) {
                closeModal();
                toastr.success(`Bienvenido/a, ${data.nom}`, 'Éxito');

                if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    await checkAndHandleSession();
                }
            } else {
                toastr.error('La sesión no se inició correctamente', 'Error');
            }
        } else {
            toastr.error(data.message || 'Error al iniciar sesión', 'Error');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        toastr.error('Error de conexión', 'Error');
    }
}




// FUNCIÓN DE REGISTRO




async function createUser(username, email, password) {
    try {
        const res = await fetch("https://earth-project-backend.onrender.com/index.php?action=register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom: username, email: email, contrasenya: password })
        });

        const data = await res.json();

        if (res.ok && data.success) {
            closeModal();
            toastr.success(`Se ha registrado correctamente. Bienvenido/a ${email}`, 'Éxito');
        } else {
            toastr.error(data.message || 'Error al registrar usuario', 'Error');
        }
    } catch (error) {
        console.error('Error al registrar:', error);
        toastr.error('Error de conexión', 'Error');
    }
}




// VERIFICAR SESIÓN ACTUAL




async function checkSession() {
    try {
        const res = await fetch("https://earth-project-backend.onrender.com/index.php?action=checkSession", {
            method: 'GET',
            credentials: 'include',
            headers: { 'Cache-Control': 'no-cache' }
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        return { logged: false };
    }
}




// CERRAR SESIÓN




async function logout() {
    const session = await checkSession();
    const nombreUsuario = document.getElementById('usuario-nombre');

    if (session.logged) {
        try {
            const res = await fetch("https://earth-project-backend.onrender.com/index.php?action=logout", {
                method: 'POST',
                credentials: 'include'
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toastr.success('Sesión cerrada correctamente', 'Éxito');

                if (nombreUsuario) {
                    gsap.fromTo(nombreUsuario, 
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
                        { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', 
                            onComplete: () => {
                                nombreUsuario.style.visibility = 'hidden';
                            }
                        });
                }

                await checkAndHandleSession();
            } else {
                toastr.error('Error al cerrar sesión', 'Error');
            }
        } catch (error) {
            toastr.error('Error de conexión', 'Error');
        }
    }
}




// BARRA DE CARGA ANIMADA




function showLoadingBar(asyncFunction, minDuration = 800) {
    const loadBar = document.querySelector('.ldBar');
    loadBar.style.width = '0%';
    loadBar.classList.remove('complete');
    loadBar.style.display = 'block';

    const startTime = Date.now();
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += 5;
        loadBar.style.width = `${Math.min(progress, 90)}%`;
        if (progress >= 90) clearInterval(progressInterval);
    }, 100);

    Promise.all([
        asyncFunction(),
        new Promise(resolve => setTimeout(resolve, minDuration))
    ])
    .then(() => {
        const elapsed = Date.now() - startTime;
        const remaining = minDuration - elapsed;

        loadBar.style.width = '100%';
        loadBar.classList.add('complete');

        setTimeout(() => {
            loadBar.style.display = 'none';
        }, remaining > 0 ? 300 : 0);
    })
    .catch(error => {
        console.error("Error:", error);
        loadBar.style.display = 'none';
        clearInterval(progressInterval);
    });
}




// EXPORTACIONES




export { showLoadingBar, checkSession };
