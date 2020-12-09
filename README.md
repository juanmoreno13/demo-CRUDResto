# Proyecto Deliah Resto
## Documentacion para iniciar el proyecto

###

En el archivo App.js se crea la aplicación con express en el servidor y se inicializa en el puerto local. Para llamar a la base de datos utilizamos sequelize y se conecta con los parametros del archivo db.js

Se instalan las siguientes dependencias via npm:

BD
- express
- sequelize
- mysql2

JSON
- bodyparser 

Autenticación 
- jsonwebtoken
- dotenv

Se definen 5 modelos para las tablas de la base de datos:

- Food para "Platos"
- Order para las "Pedidos" 
- OrderDetail para el detalle completo de los Pedidos
- Rol para definir que tipo de usuario es
- Usuario para almacenar los usuarios 

Se crean las siguientes rutas en la applicación:

Rutas 
- Usuarios /api/users
- Platos  /api/productos
- Log In  /api/login
- Pedidos  /api/pedidos

Se utiliza Middlewares para Autenticación de Usuarios para solo permitir ciertas rutas a los usuarios y otras solo al Admin.

