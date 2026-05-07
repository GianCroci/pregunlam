# 🧠 PregunLAM

Aplicación web de trivia interactiva orientada a los departamentos de la **Universidad Nacional de La Matanza (UNLaM)**. Los usuarios responden preguntas por categorías, compiten en un ranking global y pueden sugerir o reportar preguntas. Incluye panel de administración completo y rol de editor.

Proyecto grupal desarrollado en la materia **Programación Web 2 — UNLaM**.

---

## 🛠️ Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Backend** | PHP 8.0+ · MySQL 8.0+ |
| **Motor de plantillas** | Mustache.php |
| **Frontend** | HTML5 · CSS3 · Tailwind · JavaScript (Vanilla) |
| **Gráficos** | Chart.js |
| **Exportación PDF** | html2canvas · jsPDF |
| **Dependencias** | Composer |
| **Servidor local** | XAMPP / WAMP |

---

## ✨ Funcionalidades

### 👤 Usuarios
- Sistema de partidas con preguntas de múltiples categorías
- Ranking global para competir con otros jugadores
- Estadísticas personales de rendimiento y progreso
- Sistema de reportes para preguntas incorrectas o inapropiadas
- Sugerencias de nuevas preguntas

### 🛡️ Administradores
- Dashboard con KPIs y gráficos en tiempo real
- Gestión de usuarios: crear, editar, eliminar y asignar roles
- Visualización de reportes y sugerencias
- Exportación a PDF de reportes del sistema

### ✏️ Editores
- Gestión de preguntas (ABM completo)
- Gestión de categorías (ABM completo)
- Revisión y validación/rechazo de reportes de usuarios
- Revisión y validación/rechazo de preguntas sugeridas

---

## 📁 Estructura del proyecto

```
pregunlam/
├── config/        # Configuración de base de datos y constantes
├── controller/    # Controladores MVC
├── model/         # Modelos y acceso a datos (MySQL)
├── vista/         # Plantillas Mustache
├── helper/        # Funciones auxiliares
├── public/        # Assets estáticos (CSS, JS, imágenes)
├── dashboard/     # Vistas del panel de administración
├── imagenes/      # Recursos gráficos
├── xampp/         # Configuración local XAMPP
├── database.sql   # Script de creación e importación de la BD
├── index.php      # Entry point de la aplicación
├── .htaccess      # Reescritura de URLs (Apache)
└── composer.json  # Dependencias PHP
```

---

## 🚀 Instalación y uso

### Requisitos previos

- PHP 8.0+
- MySQL 8.0+
- Composer
- XAMPP, WAMP o servidor Apache+PHP equivalente

### 1. Clonar el repositorio

```bash
git clone https://github.com/GianCroci/pregunlam.git
```

Copiá la carpeta dentro del directorio raíz de tu servidor local (por ejemplo `htdocs/` en XAMPP).

### 2. Instalar dependencias PHP

```bash
composer install
```

### 3. Crear la base de datos

Importá el archivo `database.sql` desde phpMyAdmin o por consola:

```bash
mysql -u root -p < database.sql
```

### 4. Configurar la conexión

Editá el archivo de configuración en `config/` con tus credenciales de MySQL:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'pregunlam');
define('DB_USER', 'root');
define('DB_PASS', '');
```

### 5. Iniciar la aplicación

Levantá Apache y MySQL desde el panel de XAMPP y accedé en el navegador a:

```
http://localhost/pregunlam
```

---

## 🏗️ Arquitectura

El proyecto sigue el patrón **MVC** implementado en PHP puro:

- **Model** — clases PHP con consultas SQL directas a MySQL para acceso y persistencia de datos.
- **View** — plantillas `.mustache` renderizadas con Mustache.php; separan completamente la lógica de presentación.
- **Controller** — recibe las requests, llama al modelo correspondiente y pasa los datos a la vista.
- **`.htaccess`** — redirige todas las peticiones al `index.php` como front controller.

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos.
