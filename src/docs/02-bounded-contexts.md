# Contextos Delimitados (Bounded Contexts)

Este documento define las fronteras lógicas del sistema `erp_gimnasio`. Cada **Contexto Delimitado** es una parte autocontenida de la aplicación con su propio modelo de dominio, su propio lenguaje y sus propias reglas de negocio.

El objetivo de esta separación es reducir la complejidad, permitir el desarrollo en paralelo y asegurar que cada parte del sistema sea cohesiva y esté enfocada en una única responsabilidad de negocio.

## Diagrama de Contextos

El siguiente diagrama ilustra los principales contextos y sus relaciones clave:

```mermaid
graph TD
    subgraph Ventas
        A[Venta de Membresía/Producto]
    end
    subgraph "Membresías (Core Domain)"
        B[Gestión de Miembros y Membresías]
    end
    subgraph "Control de Accesos"
        C[Verificación de Acceso]
    end
    subgraph Inventario
        D[Gestión de Stock]
    end

    A -- Evento: MembresiaVendida --> B
    C -- Consulta Estado --> B
    A -- Consulta Stock y Precio --> D