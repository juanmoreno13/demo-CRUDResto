# Proyecto Deliah Resto
## Documentacion para iniciar el proyecto

###

En el archivo App.js se crea la aplicación con express en servidor y se inicia en el puerto. Para llamar a la base de datos utilizamos sequelice en el archivo db.js

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

Hay 5 modelos para las tablas de las base de datos:
- Food para Platos
- Order para las Pedidos 
- OrderDetail para el detalle completo de los Pedidos
- Rol para definir que tipo de usuario es 
- Usuario para almacenar los usuarios 

Se crean las rutas y se llaman los modelos que corresponden a cada una 

Rutas 
- Usuarios
- Platos
- Log In 
- Pedidos 

Se utiliza Middlewares para Autenticación de Usuarios para solo permitir ciertas rutas a los usuarios y otras al Admin

