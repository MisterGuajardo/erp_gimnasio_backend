# ERP para Gimnasios (erp_gimnasio)

Un sistema ERP (Enterprise Resource Planning) robusto y escalable, diseñado inicialmente para la lógica de negocio de gimnasios, pero con la flexibilidad para ser adaptado a cualquier negocio que requiera gestión de ventas, asistencias e inventario.

## Descripción

`erp_gimnasio` es un proyecto backend construido con NestJS que se enfoca en resolver las necesidades operativas clave de los gimnasios modernos. La arquitectura del sistema está diseñada para ser altamente escalable y mantenible, permitiendo un crecimiento sostenible y la fácil adición de nuevas funcionalidades.

El objetivo principal es ofrecer una solución centralizada que no solo optimice la gestión diaria, sino que también proporcione insights valiosos a través de un seguimiento detallado de la operación.

## ✨ Características Principales

* **📈 Gestión de Ventas:** Registro y seguimiento de transacciones, membresías, y venta de productos.
* **✅ Control de Asistencias:** Monitoreo en tiempo real de la asistencia de los miembros, permitiendo un control de acceso eficiente.
* **📦 Seguimiento de Inventario:** Administración del stock de productos (bebidas, suplementos, mercancía), con alertas y reportes.
* **🧩 Modular y Extensible:** Diseñado para ser fácilmente adaptable a otros modelos de negocio.

## 🏛️ Filosofía y Arquitectura

### Arquitectura Orientada al Dominio (DDD)
Para garantizar la escalabilidad y mantenibilidad a largo plazo, el proyecto se desarrolla siguiendo los principios de **Domain-Driven Design (DDD)**. Esta elección arquitectónica permite:
* **Aislar la lógica de negocio compleja** en un dominio central.
* **Alinear el código con el lenguaje del negocio** (Lenguaje Ubicuo).
* **Facilitar la evolución del software** a medida que los requerimientos del negocio cambian.

### Base de Datos: Google Firestore
Se eligió **Firestore** como la base de datos NoSQL por varias razones estratégicas:
* **Facilidad de uso y Escalabilidad Serverless:** Firestore escala automáticamente para satisfacer la demanda sin necesidad de gestionar servidores.
* **Flexibilidad del Modelo de Datos:** Su modelo de documentos se adapta bien a la naturaleza evolutiva de los datos de un negocio.
* **Ecosistema de Google Cloud:** Permite aprovechar herramientas integradas como dashboards en la consola de Firebase/Google Cloud para monitorear el uso, analizar peticiones y tener un control granular sobre los costos operativos.

Para una descripción detallada de la arquitectura, los contextos delimitados y el **Lenguaje Ubicuo** del proyecto, por favor consulta la carpeta de documentación:

* **[Ver Documentación de Arquitectura](./docs/01-ubiquitous-language.md)**

## 🛠️ Tech Stack

* **Backend:** [NestJS](https://nestjs.com/)
* **Base de Datos:** [Google Firestore](https://firebase.google.com/docs/firestore)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Validación de Datos:** [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer)
* **Seguridad:** [Helmet](https://helmetjs.github.io/)
* **Documentación de API:** [Swagger (OpenAPI)](https://www.swagger.io/)

## 🚀 Puesta en Marcha

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

* Node.js (v18 o superior)
* npm, yarn, o pnpm
* Tener un proyecto de Firebase creado y las credenciales de servicio (archivo JSON).

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/erp_gimnasio.git](https://github.com/tu-usuario/erp_gimnasio.git)
    cd erp_gimnasio
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Puedes copiar el archivo de ejemplo `.env.example` (si lo tienes) o usar esta plantilla. Rellena los valores con tus credenciales de Firebase.

    ```env
    # .env
    # Puerto de la aplicación
    PORT=3000

    # Credenciales de Firebase (obtenidas del archivo JSON de tu cuenta de servicio)
    FIREBASE_PROJECT_ID=tu-proyecto-id
    FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@xxxxx.iam.gserviceaccount.com
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxxxxxxxxx\n-----END PRIVATE KEY-----\n"
    ```

### Ejecución

1.  **Iniciar en modo de desarrollo:**
    ```bash
    npm run start:dev
    ```
2.  El servidor se iniciará en el puerto especificado en tu archivo `.env` (por defecto, 3000).

## 📄 Documentación de la API

La documentación de la API se genera automáticamente con Swagger. Una vez que la aplicación esté corriendo, puedes acceder a ella en la siguiente ruta para ver y probar todos los endpoints disponibles:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## ⚖️ Licencia

Este proyecto se distribuye bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.