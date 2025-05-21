function confirmarCerrarSesion() {
    Swal.fire({
        title: '¿Está seguro de cerrar sesión?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        icon: 'warning'
    }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            window.location.href = "/views/login.html";
          }, 2000);
          Swal.fire({
            icon: 'info',
            title: 'Cerrando Sesión...',
            text: 'Por favor esperar mientras se cierra la sesión.',
            showConfirmButton: false,
            timer: 2000
        });
        }
    });
}

function mostrarOpcion(opcion) {
    if (opcion === 'dashboard') {
        setTimeout(() => {
            window.location.href = "/views/index.ejs";
          }, 200);
    }
    if (opcion === 'inicio') {
        setTimeout(() => {
            window.location.href = "/public/inicio.html";
          }, 100);
    }
    if (opcion === 'registros') {
        setTimeout(() => {
            window.location.href = "/public/registros.html";
          }, 200);
    }
    if (opcion === 'usuarios') {
        setTimeout(() => {
            window.location.href = "/public/usuarios.html";
          }, 200);
    }
}
