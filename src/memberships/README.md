# Contexto Delimitado: Membresías (Memberships)

## Responsabilidad Principal

Este directorio contiene toda la lógica de negocio relacionada con el **Dominio Core** del sistema: la gestión del ciclo de vida de los **Planes** y, futuramente, de los **Miembros** y sus **Membresías**.

Es la fuente de verdad para preguntas como:
- ¿Qué planes ofrecemos?
- ¿Cuáles son las reglas de negocio para un plan?
- ¿Un miembro tiene una membresía activa?

## 🏛️ Arquitectura Interna

Este contexto sigue estrictamente los principios de la Arquitectura Limpia (o Hexagonal), separando las responsabilidades en tres capas principales:

#### 📁 `domain`
El corazón del contexto. Contiene la lógica de negocio pura, sin dependencias de frameworks o bases de datos.
- **Entidades (`/entities`):** Objetos de negocio con identidad y reglas (invariantes), como `Plan`.
- **Repositorios (`/repositories`):** Interfaces (contratos) que definen cómo se persiste el dominio, como `PlanRepository`.
- **Excepciones (`/exceptions`):** Errores de negocio personalizados, como `PlanNotFoundException`.

#### 📁 `application`
La capa que orquesta el dominio. No contiene lógica de negocio, solo coordina los pasos para ejecutar una acción.
- **Casos de Uso (`/`):** Clases que representan una única acción del sistema, como `CreatePlanUseCase` o `UpdatePlanUseCase`.

#### 📁 `infrastructure`
Los detalles externos y la comunicación con el mundo exterior. Es la única capa que conoce a NestJS y Firestore.
- **Controladores (`/controllers`):** Exponen los casos de uso a través de endpoints HTTP. Incluye los DTOs para validación de entrada/salida.
- **Persistencia (`/persistence`):** La implementación concreta de las interfaces del repositorio, como `FirestorePlanRepository`.

## ✨ Modelo de Dominio Actual

### Entidad `Plan`
Representa una plantilla para una membresía que puede ser vendida. Es responsable de mantener sus propias reglas de negocio (invariantes). Por ejemplo, un `Plan` no puede tener un precio negativo y su nombre no puede estar vacío. Toda la creación y modificación se realiza a través de sus métodos internos para garantizar su validez.

### Repositorio `PlanRepository`
Es el contrato que define las operaciones de persistencia necesarias para la entidad `Plan` (`save`, `findById`, `findAll`), desacoplando el dominio de Firestore.

## 📋 Casos de Uso Implementados

Este módulo actualmente soporta los siguientes casos de uso para la gestión de `Planes`:

* **`CreatePlanUseCase`**: Orquesta la creación de una nueva entidad `Plan` y su persistencia.
* **`UpdatePlanUseCase`**: Orquesta la búsqueda, modificación y persistencia de un `Plan` existente.
* **`DeactivatePlanUseCase`**: Maneja el borrado lógico (soft delete) de un `Plan`.
* **`ActivatePlanUseCase`**: Invierte el borrado lógico, reactivando un `Plan`.
* **`FindAllPlansUseCase`**: Recupera todos los `Planes` y los mapea a un DTO de respuesta.
* **`FindOnePlanUseCase`**: Recupera un `Plan` específico por su ID.

## 🔌 API Endpoints

Este contexto expone los siguientes endpoints bajo el prefijo `/plans`:

| Verbo | Ruta | Descripción | DTO (Entrada) |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Crea un nuevo plan. | `CreatePlanDto` |
| `GET` | `/` | Obtiene una lista de todos los planes. | `N/A` |
| `GET` | `/:id` | Obtiene un plan específico por su ID. | `N/A` |
| `PATCH` | `/:id` | Modifica parcialmente un plan existente. | `UpdatePlanDto` |
| `DELETE`| `/:id` | Desactiva un plan (Soft Delete).| `N/A` |
| `POST` | `/:id/activate`| Reactiva un plan previamente desactivado. | `N/A` |

## ⚙️ Flujo de una Petición (Ej: Crear un Plan)

1.  Una petición `POST` llega a `/plans` con un JSON en el body.
2.  El `MembershipsController` recibe la petición. El `ValidationPipe` de NestJS valida el `CreatePlanDto` automáticamente.
3.  El controlador llama al método `execute()` de `CreatePlanUseCase`, pasándole los datos del DTO.
4.  El caso de uso llama al método estático `Plan.create()` para crear una nueva instancia de la entidad. La entidad se valida a sí misma en su constructor.
5.  El caso de uso invoca a `planRepository.save(plan)`.
6.  NestJS, a través de la inyección de dependencias, resuelve `planRepository` a nuestra implementación `FirestorePlanRepository`.
7.  `FirestorePlanRepository` mapea la entidad `Plan` a un objeto simple y lo persiste en la colección `plans` de Firestore.
8.  La respuesta `201 Created` es enviada de vuelta al cliente.

## 🚀 Cómo Extender
Para añadir nueva funcionalidad a este contexto, sigue el patrón establecido:
1.  **Dominio:** ¿Hay nuevas reglas o entidades? Modifica o crea entidades en la capa de `domain`.
2.  **Aplicación:** Crea un nuevo `Caso de Uso` en la capa de `application` para orquestar la nueva funcionalidad.
3.  **Infraestructura:** Expón el nuevo caso de uso a través de un nuevo método en el `MembershipsController`.