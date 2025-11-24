document.addEventListener('DOMContentLoaded', function() {

    // ========== ELEMENTOS DEL FORMULARIO ==========
    const form = document.getElementById('registroForm');

    // Si no existe el formulario de registro, no ejecutar el script
    if (!form) {
        console.debug('Formulario de registro no encontrado — script omitido.');
        return;
    }

    const pass1 = document.getElementById('contraseña');
    const pass2 = document.getElementById('confirmarContraseña');
    const usuarioInput = document.getElementById('usuario');
    const mailInput = document.getElementById('mail');
    const mensajeError = document.getElementById('mensajeError');

    // ========== ELEMENTOS DEL MAPA ==========
    const inputLatitud = document.getElementById('latitud');
    const inputLongitud = document.getElementById('longitud');

    // ========== VARIABLES DE VALIDACIÓN ==========
    let usuarioValido = false;
    let mailValido = false;
    let ubicacionSeleccionada = false;
    let map;
    let marker;

    // ========== INICIALIZAR MAPA ==========
    try {
        if (typeof L === 'undefined') {
            console.debug('Leaflet no cargado — se omite inicialización del mapa.');
        } else {
            const mapEl = document.getElementById('mapa');
            if (mapEl) {
                // Inicializar mapa centrado en Buenos Aires
                map = L.map('mapa').setView([-34.6699, -58.5635], 14);

                // Añadir capa de OpenStreetMap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Escuchar clics en el mapa
                map.on('click', function(e) {
                    const lat = e.latlng.lat;
                    const lon = e.latlng.lng;

                    // Actualizar inputs ocultos
                    inputLatitud.value = lat;
                    inputLongitud.value = lon;

                    // Marcar ubicación como seleccionada
                    ubicacionSeleccionada = true;
                    mensajeError.textContent = '';

                    console.log('✓ Ubicación seleccionada:', {lat, lon});

                    // Poner/Mover el marcador
                    if (marker) {
                        marker.setLatLng(e.latlng);
                    } else {
                        marker = L.marker(e.latlng).addTo(map);
                    }
                    marker.bindPopup("Ubicación seleccionada").openPopup();
                });
            }
        }
    } catch (err) {
        console.error('Error inicializando mapa:', err);
    }

    // ========== VALIDACIÓN 1: Nombre de usuario único ==========
    usuarioInput.addEventListener('blur', async function() {
        const usuario = this.value.trim();

        if (usuario.length < 3) {
            mensajeError.textContent = 'El nombre de usuario debe tener al menos 3 caracteres.';
            usuarioValido = false;
            return;
        }

        try {
            const response = await fetch('/login/verificarUsuarioDisponible', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario: usuario })
            });

            const data = await response.json();

            if (data.disponible) {
                mensajeError.textContent = '';
                usuarioValido = true;
                console.log('✓ Usuario disponible:', usuario);
            } else {
                mensajeError.textContent = 'Este nombre de usuario ya está en uso.';
                usuarioValido = false;
                console.log('✗ Usuario no disponible:', usuario);
            }
        } catch (error) {
            console.error('Error al verificar usuario:', error);
            mensajeError.textContent = 'Error al verificar disponibilidad del usuario.';
            usuarioValido = false;
        }
    });

    // ========== VALIDACIÓN 2: Email no registrado ==========
    mailInput.addEventListener('blur', async function() {
        const mail = this.value.trim();

        // Validación básica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            mensajeError.textContent = 'Por favor, ingresa un email válido.';
            mailValido = false;
            return;
        }

        try {
            const response = await fetch('/login/verificarMailDisponible', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mail: mail })
            });

            const data = await response.json();

            if (!data.existe) {
                mensajeError.textContent = '';
                mailValido = true;
                console.log('✓ Email disponible:', mail);
            } else {
                mensajeError.textContent = 'Este email ya está registrado.';
                mailValido = false;
                console.log('✗ Email no disponible:', mail);
            }
        } catch (error) {
            console.error('Error al verificar email:', error);
            mensajeError.textContent = 'Error al verificar disponibilidad del email.';
            mailValido = false;
        }
    });

    // ========== VALIDACIÓN AL ENVIAR FORMULARIO ==========
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        mensajeError.textContent = '';

        console.log('📋 Validando formulario:', {
            usuarioValido,
            mailValido,
            ubicacionSeleccionada,
            latitud: inputLatitud.value,
            longitud: inputLongitud.value
        });

        // Verificar que el usuario fue validado
        if (!usuarioValido) {
            mensajeError.textContent = 'Por favor, verifica que el nombre de usuario esté disponible.';
            return;
        }

        // Verificar que el email fue validado
        if (!mailValido) {
            mensajeError.textContent = 'Por favor, verifica que el email sea válido y no esté registrado.';
            return;
        }

        // Verificar que se haya seleccionado ubicación
        if (!ubicacionSeleccionada) {
            mensajeError.textContent = 'Por favor, selecciona tu ubicación en el mapa.';
            return;
        }

        // Verificar que las contraseñas coincidan
        if (pass1.value !== pass2.value) {
            mensajeError.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        console.log('✅ Todas las validaciones pasaron - Enviando formulario');

        // Si todas las validaciones pasan, enviar el formulario
        form.submit();
    });

});