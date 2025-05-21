
const formulario = document.querySelector("#formulario")

formulario.addEventListener("submit", validarInicioSesion)

async function validarInicioSesion() {
  const username = document.querySelector("#user").value;
  const password = document.querySelector("#pass").value;

  if (username.trim() === '' || password.trim() === '') {
      Swal.fire({
          icon: 'warning',
          title: 'Usuario y/o contraseña vacíos, por favor llenar los campos correspondientes',
          showConfirmButton: false,
          timer: 2000 
      });
      return; 
  }

  try {
      const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              correo: username, 
              contrasena: password 
          }),
      });

      const data = await response.json();

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Credenciales Correctas',
              text: 'Bienvenido a nuestro portal',
              showConfirmButton: false,
              timer: 1500
          });
          setTimeout(() => {
              window.location.href = "/inicio"; 
          }, 1500);
      } else {
          // Si la respuesta no es exitosa, mostrar mensaje de error
          Swal.fire({
              icon: 'error',
              title: data.Mensaje || 'Error al iniciar sesión',
              text: 'Por favor, verifica tus credenciales'
          });
      }
  } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar al servidor. Por favor, inténtalo de nuevo más tarde.'
      });
  }
}
