#proyecto web

este proyecto es del equipo de trabajo 2 de la carrera de desarrollo de software de la UTD llamado "DEV MATCH SOLUTION".

el cual busca solucionar los problemas del cliente que solicto una app de futbol que cuente con informacion general, horarios de partidos, reservasiones, resultados, etc.

las tecnologias utilizadas son: css, html, tailwind, vite, react, typescript, node, express, git, github, visual studio code.

## Estructura del Proyecto

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Almacenamiento**: Archivos JSON locales

## Cómo ejecutar el proyecto

### Opción 1: Solo Frontend (datos simulados)
```bash
npm run dev
```

### Opción 2: Frontend + Backend completo
```bash
# Terminal 1: Ejecutar backend
npm run dev:backend

# Terminal 2: Ejecutar frontend
npm run dev
```

### Opción 3: Ambos al mismo tiempo
```bash
npm run dev:full
```

## Endpoints de la API

- `GET /api/matches` - Obtener todos los partidos
- `GET /api/matches/:id` - Obtener partido específico
- `PUT /api/matches/:id` - Actualizar partido (scores, estado)
- `GET /api/reservations` - Obtener todas las reservaciones
- `POST /api/reservations` - Crear nueva reservación
- `DELETE /api/reservations/:id` - Eliminar reservación
- `GET /api/teams` - Obtener todos los equipos
- `GET /api/venues` - Obtener todos los estadios
- `GET /api/info` - Obtener información general
- `GET /api/health` - Estado del servidor

## Características del Backend

- ✅ Almacenamiento local con archivos JSON
- ✅ Simulación de actualizaciones en tiempo real
- ✅ API RESTful completa
- ✅ Gestión de reservaciones
- ✅ Actualización de scores en vivo
- ✅ CORS habilitado para desarrollo
- ✅ Manejo de errores