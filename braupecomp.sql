/*
 Navicat Premium Data Transfer

 Source Server         : Xammp
 Source Server Type    : MySQL
 Source Server Version : 100129
 Source Host           : localhost:3306
 Source Schema         : braupecomp

 Target Server Type    : MySQL
 Target Server Version : 100129
 File Encoding         : 65001

 Date: 11/01/2018 17:55:07
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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (1, 'Consumidor Final', '1', '9999999999999', '9999999999', '9999999999', 'consumidor@gmail.com', 'El Empalme');
INSERT INTO `cliente` VALUES (6, 'SUAREZ GUZMAN KEVIN BRYAN', '1', '1206249391', '0986735012', '0986735012', 'kebryansg@gmail.com', 'Quevedo, San Camilo');

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
INSERT INTO `configuracion` VALUES (1, 'BrauPeComp', 'El empalme', '0990', '0999999999', '0987654321', 'BrauPeConfig@gmail.com', 'resource/ConfigIMG/vlcsnap-2017-01-04-18h36m53s662.png');

-- ----------------------------
-- Table structure for detalleproforma
-- ----------------------------
DROP TABLE IF EXISTS `detalleproforma`;
CREATE TABLE `detalleproforma`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proforma` int(11) NOT NULL,
  `producto` int(11) NOT NULL,
  `cantidad` int(11) NULL DEFAULT NULL,
  `precioProveedor` decimal(12, 2) NULL DEFAULT NULL,
  `precioComision` decimal(12, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_detalleproforma__producto`(`producto`) USING BTREE,
  INDEX `idx_detalleproforma__proforma`(`proforma`) USING BTREE,
  CONSTRAINT `fk_detalleproforma__producto` FOREIGN KEY (`producto`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_detalleproforma__proforma` FOREIGN KEY (`proforma`) REFERENCES `proforma` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (1, 'Core i3', 'ACT', '');
INSERT INTO `producto` VALUES (2, 'Core i7', 'ACT', 'Septima Generación');

-- ----------------------------
-- Table structure for proforma
-- ----------------------------
DROP TABLE IF EXISTS `proforma`;
CREATE TABLE `proforma`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fecha` datetime(0) NULL DEFAULT NULL,
  `cliente` int(11) NULL DEFAULT NULL,
  `ganancia` decimal(12, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_proforma__cliente`(`cliente`) USING BTREE,
  CONSTRAINT `fk_proforma__cliente` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of proforma
-- ----------------------------
INSERT INTO `proforma` VALUES (1, '', '2018-01-11 00:00:00', 1, 0.00);
INSERT INTO `proforma` VALUES (2, '', '2018-01-11 00:00:00', 6, 50.00);
INSERT INTO `proforma` VALUES (3, '', '2018-01-11 00:00:00', 6, 0.00);

SET FOREIGN_KEY_CHECKS = 1;
