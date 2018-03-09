CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u` varchar(255) NOT NULL,
  `p` varchar(255) NOT NULL,
  `estado` char(3) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;


CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `estado` char(3) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

insert into rol(descripcion,estado) values('Administrador','ACT'),('Vendedor','ACT');

alter table usuario add COLUMN idrol int;
alter table usuario add FOREIGN key (idrol) REFERENCES rol(id);
