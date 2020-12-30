# Proyecto Deliah Resto
## Documentacion para iniciar el proyecto

###

En el archivo App.js se crea la aplicación con express en el servidor y se inicializa en el puerto local. Para crear la base de datos utilizamos sequelize y se conecta con los parametros del archivo db.js

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

Documentacion localhost:3003/api-docs

### Inicializacion de base de datos:
Actualmente el proyecto se encuentra configurado para trabajar con una base de datos en la nube pero en caso de que se requiera hacer pruebas con otra base de datos se debe ejecutar el archivo **bootstrap.sql** localizado en la raiz del proyecto.

La configuración para acceder al remotemysql.com es: 

username: 'VvVXuJ5tEr'
y la password esta en el archivo db.js


## Datos de pruebas

El proyecto se encuentra listo para realizar pruebas ya que se encuentra enlazado a un servicio en la nube de base de datos.

Los usuarios de prueba para acceder al proyecto los siguientes:
- Usuario administrador: 
    - username: JUAN@HOLA.COM
    - password: 1234
- Usuario normal:
    - username: PEDRO@HOLA.COM
    - password: 1234

## Postman
Se adjunto archivo Postman Deliah Resto JSON para importar y realizar las pruebas.  