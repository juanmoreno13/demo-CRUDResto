/*
    create database <nombre-base-de-datos>;
*/

create table Roles (
    id int AUTO_INCREMENT primary key,
    nombre varchar(30),
    createdAt  DATETIME DEFAULT   CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT   CURRENT_TIMESTAMP
);
INSERT INTO Roles(`nombre`, `createdAt`, `updatedAt`) VALUES('ADMIN', NOW(), NOW()), ('USER', NOW(), NOW());


create table Usuarios(
    id int AUTO_INCREMENT primary key,
    nombrecompleto varchar(50) not null,
    correo varchar(50) not null,
    contrasena varchar(50) not null,
    telefono varchar(50),
    direccion varchar(150),
    id_rol int not null,
    createdAt  DATETIME DEFAULT   CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT   CURRENT_TIMESTAMP,
    constraint fk_usuario_rol foreign key (id_rol) references Roles(id) on delete restrict
);


INSERT INTO `Usuarios`(`nombrecompleto`, `correo`, `contrasena`, `telefono`,`direccion`,`id_rol`, `createdAt`, `updatedAt`) VALUES 
('JUAN', 'JUAN@HOLA.COM','1234', '099349324', 'CALLE FALSA', (SELECT ID FROM `Roles` WHERE `NOMBRE` = 'ADMIN'), NOW(), NOW()),
('PEDRO', 'PEDRO@HOLA.COM','1234', '0993493294', 'CALLE A CON B', (SELECT ID FROM `Roles` WHERE `NOMBRE` = 'USER'), NOW(), NOW());


create table Platos(
    id int AUTO_INCREMENT primary key,
    nombre varchar(50) not null,
    precio decimal(8,2) default(0),
    imagen varchar(100),
    createdAt  DATETIME DEFAULT   CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT   CURRENT_TIMESTAMP
);

INSERT INTO Platos (`nombre`, `precio`, `imagen`, `createdAt`, `updatedAt`)
VALUES ('Sanduche Vegetariano', '200','wwww.imagen.com', NOW(), NOW()),
('Sanduche de Atun', '300','wwww.imagen.com', NOW(), NOW()),
('Hamburguesa Completa', '500','wwww.imagen.com', NOW(), NOW());


create table Pedidos(
    id int AUTO_INCREMENT primary key,
    id_usuario int not null,
    total decimal(8,2) default(0),
    forma_de_pago varchar(15),
    estado varchar(12) not null,
    createdAt  DATETIME DEFAULT   CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT   CURRENT_TIMESTAMP,
    constraint fk_pedido_usuario foreign key(id_usuario) references Usuarios(id) on delete restrict
);


create table DetallePedidos(
    id int AUTO_INCREMENT primary key,
    id_pedido int not null,
    id_producto int not null,
    cantidad int not null,
    precio_unitario decimal(8, 2),
    precio_total decimal(8, 2) not null,
    createdAt  DATETIME DEFAULT   CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT   CURRENT_TIMESTAMP,
    constraint fk_detalle_pedido foreign key(id_pedido) references Pedidos(id) on delete restrict,
    constraint fk_detalle_producto foreign key(id_producto) references Platos(id) on delete restrict
);