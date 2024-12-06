// Habilitar la validación en el formulario
(function () {
    'use strict'
  
    // Seleccionar el formulario usando querySelector
    var form = document.querySelector('.needs-validation')
  
    // Evitar el envío del formulario si no pasa la validación
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
  
      form.classList.add('was-validated')
    }, false)
  })();
  