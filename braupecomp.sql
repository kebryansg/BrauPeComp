/*
 Navicat Premium Data Transfer

 Source Server         : LocalMySQL
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : braupecomp

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 19/01/2018 20:51:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tipoidentificacion` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `identificacion` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `celular` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for configuracion
-- ----------------------------
DROP TABLE IF EXISTS `configuracion`;
CREATE TABLE `configuracion`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ruc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `celular` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of configuracion
-- ----------------------------
INSERT INTO `configuracion` VALUES (1, 'BrauPeComp Tecnologies', 'SAN VICENTE Y SALINAS, CALLE 21 (Mz - 03; S - 05)', ' 1311136954001 ', '0999999999', ' 099789073', 'brau_ps@hotmail.com', 'resource/ConfigIMG/logo.png');

-- ----------------------------
-- Table structure for detalleproforma
-- ----------------------------
DROP TABLE IF EXISTS `detalleproforma`;
CREATE TABLE `detalleproforma`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproforma` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `cantidad` int(11) NULL DEFAULT NULL,
  `precioProveedor` decimal(12, 2) NULL DEFAULT NULL,
  `precioComision` decimal(12, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_detalleproforma__producto`(`idproducto`) USING BTREE,
  INDEX `idx_detalleproforma__proforma`(`idproforma`) USING BTREE,
  CONSTRAINT `fk_detalleproforma__producto` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_detalleproforma__proforma` FOREIGN KEY (`idproforma`) REFERENCES `proforma` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for garantia
-- ----------------------------
DROP TABLE IF EXISTS `garantia`;
CREATE TABLE `garantia`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `estado` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `observacion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  FULLTEXT INDEX `index_name`(`descripcion`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for proforma
-- ----------------------------
DROP TABLE IF EXISTS `proforma`;
CREATE TABLE `proforma`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fecha` datetime(0) NOT NULL,
  `idcliente` int(11) NULL DEFAULT NULL,
  `ganancia` decimal(12, 2) NOT NULL,
  `envio` decimal(12, 2) NULL DEFAULT NULL,
  `idgarantia` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_proforma__cliente`(`idcliente`) USING BTREE,
  INDEX `fk_proforma__garantia`(`idgarantia`) USING BTREE,
  CONSTRAINT `fk_proforma__cliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_proforma__garantia` FOREIGN KEY (`idgarantia`) REFERENCES `garantia` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- View structure for viewdetalleproforma
-- ----------------------------
DROP VIEW IF EXISTS `viewdetalleproforma`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `viewdetalleproforma` AS select `dp`.`id` AS `id`,`dp`.`idproforma` AS `idproforma`,`dp`.`idproducto` AS `idproducto`,`dp`.`cantidad` AS `cantidad`,`dp`.`precioProveedor` AS `precioProveedor`,`dp`.`precioComision` AS `precioComision`,`p`.`descripcion` AS `producto` from (`detalleproforma` `dp` join `producto` `p` on((`p`.`id` = `dp`.`idproducto`)));

-- ----------------------------
-- View structure for viewproforma
-- ----------------------------
DROP VIEW IF EXISTS `viewproforma`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `viewproforma` AS select `p`.`id` AS `id`,`p`.`codigo` AS `codigo`,`p`.`fecha` AS `fecha`,`p`.`idcliente` AS `idcliente`,`p`.`ganancia` AS `ganancia`,`p`.`envio` AS `envio`,`p`.`idgarantia` AS `idgarantia`,`c`.`nombres` AS `nombres`,`g`.`descripcion` AS `garantia` from ((`proforma` `p` join `cliente` `c` on((`c`.`id` = `p`.`idcliente`))) join `garantia` `g` on((`g`.`id` = `p`.`idgarantia`)));

SET FOREIGN_KEY_CHECKS = 1;
