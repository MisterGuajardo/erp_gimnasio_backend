# Glosario del Dominio (Lenguaje Ubicuo)

Este documento es la fuente de verdad para la terminología utilizada en el proyecto `erp_gimnasio`. Su propósito es eliminar la ambigüedad y asegurar que tanto el equipo de desarrollo como los expertos del negocio hablen el mismo idioma.

---

## A. Contexto: Identidad y Membresías (`memberships`)

### Entidades

**Miembro (Member)**
- **Definición:** Es la persona que se inscribe y adquiere una membresía en el gimnasio. Es el actor principal del sistema.
- **Atributos Clave:** `id`, `nombreCompleto`, `email`, `fechaDeInscripcion`.
- **Reglas de Negocio:**
    - Un Miembro debe tener un email único.
    - El nombre debe constar de al menos nombre y apellido.
- **Términos Relacionados:** *Cliente, Usuario (evitar estos términos).*

**Membresía (Membership)**
- **Definición:** Representa el contrato o plan que un Miembro adquiere para acceder a los servicios del gimnasio durante un período determinado.
- **Atributos Clave:** `id`, `miembroId`, `planId`, `fechaDeInicio`, `fechaDeFin`, `estado`.
- **Reglas de Negocio:**
    - Una Membresía siempre está asociada a un único Miembro.
    - Su estado solo puede ser `Activa`, `Vencida`, o `Congelada`.
- **Verbos Asociados:** `activar()`, `congelar()`, `vencer()`.

### Value Objects (Objetos de Valor)

**Estado de Membresía (MembershipStatus)**
- **Definición:** Un valor inmutable que representa el estado actual de una Membresía.
- **Valores Posibles:** `Activa`, `Vencida`, `Congelada`.

---

## B. Contexto: Control de Accesos (`access-control`)

### Entidades

**Asistencia / Acceso (AccessLog)**
- **Definición:** Un registro que se crea cada vez que un Miembro intenta ingresar al gimnasio.
- **Atributos Clave:** `id`, `miembroId`, `fechaHora`, `puntoDeAccesoId`, `resultado` (Permitido/Denegado).
- **Reglas de Negocio:**
    - Se debe registrar el intento incluso si el acceso es denegado.
    - El resultado depende del `Estado de Membresía` del Miembro.

---

## C. Contexto: Ventas y Facturación (`sales`)

### Entidades

**Venta (Sale)**
- **Definición:** Una transacción económica que puede incluir la compra de una Membresía o de Productos.
- **Atributos Clave:** `id`, `fecha`, `total`, `items`, `metodoDePago`.

**Producto (Product)**
- **Definición (en este contexto):** Un artículo con un `precio` y `nombre` que puede ser vendido.
- **Nota:** En el contexto de `Inventario`, este mismo concepto tendrá atributos diferentes como `stock`.

---