delete from `Roles`;
INSERT INTO `Roles`(`nombre`, `createdAt`, `updatedAt`) VALUES('ADMIN', NOW(), NOW()), ('USER', NOW(), NOW());
delete from `Usuarios`;
INSERT INTO `Usuarios`(`nombrecompleto`, `correo`, `contrasena`, `telefono`,`direccion`,`id_rol`, `createdAt`, `updatedAt`) VALUES 
('JUAN', 'JUAN@HOLA.COM','1234', '099349324', 'CALLE FALSA', (SELECT ID FROM `Roles` WHERE `NOMBRE` = 'ADMIN'), NOW(), NOW()),
('PEDRO', 'PEDRO@HOLA.COM','1234', '0993493294', 'CALLE A CON B', (SELECT ID FROM `Roles` WHERE `NOMBRE` = 'USER'), NOW(), NOW());

INSERT INTO `Platos` (`nombre`, `precio`, `imagen`, `createdAt`, `updatedAt`)
VALUES ('Sanduche Vegetariano', '200','wwww.imagen.com', NOW(), NOW()),
('Sanduche de Atun', '300','wwww.imagen.com', NOW(), NOW()),
('Hamburguesa Completa', '500','wwww.imagen.com', NOW(), NOW());