import { loadToastr } from "./toastr.js";

// REGISTRO Y LOGIN DE USUARIO
document.addEventListener('DOMContentLoaded', () => {
    loadToastr();
   
  // gets values to login
  document.querySelector('#loginForm').addEventListener('submit',(event)=>{
      event.preventDefault();
      const email = document.getElementById('log-user').value;
      const password = document.getElementById('log-passw').value;
      
      login(email, password);
  });

  // gets values to register
  document.querySelector('#registerForm').addEventListener('submit', (event)=>{
      event.preventDefault();
      const username = document.getElementById('reg-user').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-passw').value;
      
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

<<<<<<< Updated upstream
    document.getElementById('modal-button-login').addEventListener('click', () => {
=======
    document.querySelector('.modal-button').addEventListener('click', () => {
>>>>>>> Stashed changes
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
    
    //   document.getElementById('loginForm').addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     // añadir modal de bienvenida

    //     alert('Login successful!');
    //     document.getElementById('loginModal').style.display = 'none';
    //   });
    // Command: toastr["error"]("My name is Inigo Montoya. You killed my father. Prepare to die!", "error")


  async function login(email, password){

    try {
        const response = await fetch("http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, contrasenya: password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwt', data.token);
            const token = data.token;
            closeModal();
            toastr.success(`Bienvenido/a,${email}`, 'Exito');

            console.log(`Ha iniciado sesión correctamente. El token ${data.token} se ha guardado.`);
        } else {
            toastr.error('Hubo un error al registrar el usuario.', 'Error');
            
        
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        
    }
}

//registration

async function createUser(username, email, password){

  try{
<<<<<<< Updated upstream
    //   const res = await fetch("http://localhost:5000/api/register", {
    const res = await fetch("http://localhost/api/register", {
=======
      const res = await fetch("http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=register", {
>>>>>>> Stashed changes
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: username, email: email, contrasenya: password}),
      });
      const text = await res.text();
      console.log(text);
    try {
        const data = JSON.parse(text);
        if (res.ok && data.success){
            toastr.success('Se ha registrado correctamente', 'Éxito');
        } else{
            toastr.error(data.message || 'Error');
        }

    }catch(error){
        console.error(error);
    }
}
    finally {
        console.log('nose');
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

<<<<<<< Updated upstream
  return {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json',
  };
}

fetch("http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/api/anunci_api.php") // URL de la API PHP
    .then(response => response.json()) // Convertimos la respuesta a JSON
    .then(data => {
        console.log(data); // Mostramos el mensaje en la consola
        let html = "<ul>";
        data.forEach(item => {
            html += `<li><strong>${item.nom}</strong>: ${item.descripcio} (Categoría: ${item.categoria})</li>`;
        });
        html += "</ul>";
    
        document.getElementById("output").innerHTML = html;
    })
    .catch(error => console.error("Error en la petición:", error));
    

=======
>>>>>>> Stashed changes
})