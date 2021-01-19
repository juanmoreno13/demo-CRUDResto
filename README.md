# Proyecto Deliah Resto


## Instalaci&oacute;n del proyecto:

- Dependencias:
    - Node
    - Servidor MariaDB
    

Instalacion de depencias del proyecto:

```
npm install
```

Una vez ejecutado el comando, se instalan las siguientes dependencias:

BD
- express
- sequelize
- mysql2

JSON
- bodyparser 

Autenticación 
- jsonwebtoken
- dotenv

## Puesta en marcha del proyecto:

```
npm start
```


## Inicializacion de base de datos:
Actualmente el proyecto se encuentra configurado para trabajar con una base de datos en la nube; pero en caso de que se requiera hacer pruebas con otra base de datos se debe ejecutar el archivo **bootstrap.sql** localizado en la raiz del proyecto.

Para crear un base de datos se va a remotemysql.com, se crea un  usuario, y se genera un base de datos. Una vez generado 
la base de datos en SQL se pega el script del archivo **bootstrap.sql** y se generan las tablas y se agregan datos 
iniciales para las pruebas. 

Existe una base de datos credenciales :

username: 'nke22KUC6U',
password: 'EHdNMzfjWO',
database: 'nke22KUC6U',


## Datos de pruebas

El proyecto se encuentra listo para realizar pruebas ya que se encuentra enlazado a un servicio en la nube de base de datos.

Hay dos usuarios ADMIN Y USER de prueba:

- Usuario administrador: 
    - username: JUAN@HOLA.COM
    - password: 1234
    
- Usuario normal:
    - username: PEDRO@HOLA.COM
    - password: 1234

## Estructura del proyecto

Se definen 5 modelos para las tablas de la base de datos:

- Food para "Platos"
- Order para las "Pedidos" 
- OrderDetail para el detalle completo de los Pedidos
- Rol para definir que tipo de usuario es
- User para almacenar los usuarios 

Se crean las siguientes rutas en la applicación:

Rutas 
- Usuarios /api/users
- Platos  /api/productos
- Log In  /api/login
- Pedidos  /api/pedidos

Se utiliza Middlewares para Autenticación de Usuarios para solo permitir ciertas rutas a los usuarios y otras solo al Admin.

## Postman
El siguiente enlace de Postman se puede utilizar para realizar las pruebas:

https://www.getpostman.com/collections/8e513c92dce579a5184f

Documentación localhost:3003/api-docs