import { loadToastr } from "./toastr.js";

// REGISTRO Y LOGIN DE USUARIO
document.addEventListener('DOMContentLoaded', () => {
    loadToastr();

  // gets values to login
  document.querySelector('#loginForm').addEventListener('submit',(event)=>{
      event.preventDefault();
      const email = document.getElementById('log-user').value;
      const password = document.getElementById('log-passw').value;

      window.loggedEmail = email;
      localStorage.setItem('loggedEmail', email);
      showLoadingBar();
    
      login(email, password);
  });

  // gets values to register
  document.querySelector('#registerForm').addEventListener('submit', (event)=>{
      event.preventDefault();
      const username = document.getElementById('reg-user').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-passw').value;
      showLoadingBar();
      
      createUser(username, email, password);
  });

  // shows login modal
    function showModal() {
        const modal = document.getElementById('loginModal');
        modal.style.display = 'block';
    }
    document.querySelector('.close').addEventListener('click', closeModal);

    function closeModal() {
        const modal = document.getElementById('loginModal');
        modal.style.display = 'none';
    }

    document.getElementById('modal-button-login').addEventListener('click', (event) => {
        document.getElementById('loginModal').style.display = 'flex';
      });
      document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('loginModal').style.display = 'none';
      });
      window.addEventListener('click', (event) => {
        const modal = document.getElementById('loginModal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

  async function login(email, password){
    try {
        const response = await fetch("http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, contrasenya: password })
        });
        const data = await response.json();

        if (response.ok && data.success) {
            // localStorage.setItem('jwt', data.token);
            // const token = data.token;
            closeModal();
            toastr.success(`Bienvenido/a, ${email}`, 'Exito');
            console.log(`Ha iniciado sesión correctamente. El token ${data.token} se ha guardado.`);
            localStorage.setItem('loggedEmail', email);
            document.getElementById('usuario-nombre').textContent = email;
        } else {
            toastr.error('Hubo un error al iniciar sesión. Vuelve a intentarlo.', 'Error');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        
    }
}


//registration

async function createUser(username, email, password){

  try{
      const res = await fetch("http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=register", {
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: username, email: email, contrasenya: password}),
      });

    try {
        const data = await res.json();
        if (res.ok && data.success){
            closeModal();
            localStorage.setItem('loggedEmail', email);
            document.getElementById('usuario-nombre').textContent = email;
            toastr.success('Se ha registrado correctamente', 'Éxito');
        } else{
            toastr.error(data.message || 'Error');
        }
        }catch(error){
            console.error(error);
        }
    }finally {
        console.log();
    }
}

//auth del token

    function getToken() {
        const userToken = localStorage.getItem('jwt');

        const inputToken = document.getElementById('token').value;

        if (!userToken || !inputToken) {
            console.log('Token no proporcionado');
            alert('Por favor, ingresa el token.');
            return null;
        }

        if (userToken !== inputToken) {
            console.log('Token no válido');
            alert('Token no válido. Por favor, ingresa el token correcto.');
            return null;
        }

        return {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        };
    }

})




const loadBar = document.querySelector('.ldBar');

// show loading bar
function showLoadingBar() {
    loadBar.style.width = '0%';
    loadBar.classList.remove('complete');
    loadBar.style.display = 'block';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        loadBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            loadBar.classList.add('complete');
            // hide loading bar when complete
            setTimeout(() => {
                loadBar.style.display = 'none';
            }, 300);
        }
    }, 100);
}



export {showLoadingBar};