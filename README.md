# Proyecto-6-UDD-C20

API REST simple para manejar usuarios, juegos y carritos (Node.js + Express + MongoDB).

**Prerrequisitos**
- **Node.js**: v16+ recomendado
- **npm**: incluido con Node.js
- **MongoDB Atlas** o una instancia de MongoDB accesible

**Copiar el proyecto**
```bash
git clone <TU_REPO_URL>
cd Proyecto-6-UDD-C20
```

**Instalar dependencias**
```bash
npm install
```

**Variables de entorno**
Crear un archivo `.env` en la raíz del proyecto con (ejemplo):
```
MONGODB_URI=<tu_uri_mongodb>
SECRET=<clave_secreta_para_jwt>
PORT=3000
```

El proyecto usa `MONGODB_URI` para la conexión a la base de datos y `SECRET` para firmar tokens JWT.

**Ejecutar en desarrollo**
```bash
npm run dev
```

**Endpoints y métodos**

Base users: `/users`
- **POST /users/register** : `registerUser` — Registra un nuevo usuario; hashea la contraseña, crea un `Cart` y devuelve el usuario.
- **POST /users/login** : `loginUser` — Valida credenciales y devuelve un JWT (`SECRET` requerido).
- **GET /users/verify-user** : `verifyUser` — (Requiere `authorization` header) Devuelve datos del usuario autenticado.
- **PUT /users/update-user** : `updateUserById` — (Requiere `authorization`) Actualiza `username`, `email` y `password` del usuario autenticado.
- **DELETE /users/user/:id** : `deleteUserById` — (Requiere `authorization`) Elimina el usuario autenticado. (Nota: la ruta usa `user/:id` bajo `/users`).
- **GET /users/users** : `getUsers` — (Requiere `authorization`) Devuelve todos los usuarios.

Base games: `/games`
- **GET /games/** : `getAllGames` — Devuelve todos los juegos.
- **POST /games/** : `createGame` — Crea un nuevo juego con `title`, `price`, `platform`.
- **PUT /games/:id** : `updateGamebyId` — Actualiza un juego por `id`.
- **DELETE /games/:id** : `deleteGameById` — Elimina un juego por `id`.
- **GET /games/:id** : `getGameById` — Obtiene un juego por `id`.

**Descripción breve de controladores y modelos**
- `registerUser` (`src/controllers/user.controller.js`): crea usuario, hashea la contraseña con `bcryptjs`, crea un `Cart` y guarda la referencia.
- `loginUser`: valida `email` y `password`, firma un JWT con `process.env.SECRET`.
- `verifyUser`: busca usuario por `req.user.id` (seteado por el middleware) y devuelve datos sin `password`.
- `updateUserById`: actualiza los campos y rehasea la contraseña antes de guardar.
- `deleteUserById`: elimina al usuario.
- `getUsers`: lista todos los usuarios.

- `getAllGames`, `createGame`, `updateGamebyId`, `deleteGameById`, `getGameById` (`src/controllers/game.controller.js`): CRUD básico para el modelo `Game`.

Modelos:
- `src/models/Users.js`: esquema `User` con `username`, `email`, `password`, `cart` y datos de contacto.
- `src/models/Games.js`: esquema `Game` con `title`, `price`, `platform`, `description`.
- `src/models/Cart.js`: esquema `Cart` con array `products` (cantidad, priceID, name, price, img, slug).

**Middleware de autorización**
- `src/middleware/authorization.js` espera header `authorization` con formato `Bearer <token>` o `Token <token>`. Verifica el token con `process.env.SECRET` y expone `req.user`.