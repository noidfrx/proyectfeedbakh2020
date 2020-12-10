-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-12-2020 a las 16:59:04
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `feedbakh_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigo`
--

CREATE TABLE `amigo` (
  `idAmigo` int(255) NOT NULL,
  `idColaborador1` int(255) NOT NULL,
  `idColaborador2` int(255) NOT NULL,
  `aceptado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `amigo`
--

INSERT INTO `amigo` (`idAmigo`, `idColaborador1`, `idColaborador2`, `aceptado`) VALUES
(1, 4, 3, 1),
(2, 4, 5, 1),
(3, 4, 6, 1),
(4, 4, 7, 1),
(11, 2, 4, 1),
(12, 8, 2, 1),
(13, 7, 2, 1),
(14, 6, 2, 1),
(15, 3, 2, 1),
(16, 5, 2, 1),
(18, 11, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(255) NOT NULL,
  `nombreCategoria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`) VALUES
(0, 'Sin Categoría'),
(1, 'Prioridad Alta'),
(2, 'Prioridad Media'),
(3, 'Prioridad Baja'),
(4, 'Administración'),
(5, 'Economía'),
(6, 'Diseño'),
(7, 'Programación'),
(8, 'Análisis');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaborador`
--

CREATE TABLE `colaborador` (
  `idColaborador` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `fotoPerfil` varchar(255) DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fechaCreacion` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `tutorial` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `colaborador`
--

INSERT INTO `colaborador` (`idColaborador`, `nombre`, `apellidos`, `fotoPerfil`, `email`, `password`, `fechaCreacion`, `tutorial`) VALUES
(1, 'admin', 'admin admin', '0', 'admin@admin.com', '$2b$10$EPMY/FTULzK/6rlw68RrQOok6spT.tWpSZpLOHzXtTrKEptYtAMcO', '2020-12-07 22:24:15.947766', 1),
(2, 'Kharinna', 'Hermosilla Moraga', '4', 'kharinna.hermosilla.m@mail.pucv.cl', '$2b$10$A/5n5KnLK3Q437/IJ3aoaedOZxcIWDl6taVb9QNL2t/2F32KFSTQq', '2020-12-08 01:23:46.765253', 1),
(3, 'Eduardo', 'Ibacache Gonzalez', '0', 'eduardo.ibacache.g@mail.pucv.cl', '$2b$10$8QPEybwzFAUsQLecvgjtx.ezOb9u2KvGYmVL7hkDolk83RbSsz4gC', '2020-12-08 02:10:49.547309', 1),
(4, 'Nicolás', 'Lara Medina', '0', 'nicolas.lara.m@gmail.com', '$2b$10$faQeo5rO2ZJy79jlpzHZuuzdR5LdVR/FwkkpmxgULbV0kWLi6DY7a', '2020-12-08 02:11:57.925598', 1),
(5, 'Nelson', 'Polo Giraldo', '0', 'nelson.polo.g@gmail.com', '$2b$10$w1oW0dI2E9C7S4vo6IWo2.4394mUSAkweFuPk4ZdY00PPL0.JJnhG', '2020-12-08 02:12:27.998221', 1),
(6, 'Evangelina', 'Soriano De La Torre', '0', 'evangelina.soriano@gmail.com', '$2b$10$cw6tDeVievPITHDF1DTGFerImzGh63VCFIN6WhKONaHDsZ/Bo0ar6', '2020-12-08 02:13:04.446285', 1),
(7, 'Sergio', 'Acuña Canovas', '0', 'sergioac@gmail.com', '$2b$10$RedXqM8ZNwkjiFR/dnb74u.F4ZyHODRJBzlfTcxveoPSytDioTnDa', '2020-12-08 02:13:48.064899', 1),
(8, 'Ricardo', 'Velasco Grau', '0', 'ricardo.velasco.g@gmail.com', '$2b$10$Kx14F0FN7swEdanQXKFlFOBJ7Aw/PbZ.D.9v9.Wm5BLcH0Qng4StG', '2020-12-08 02:14:24.817347', 1),
(9, 'Nicolás', 'Colomer Rojas', '0', 'nicolas.colomer@gmail.com', '$2b$10$jllwUcwwjZ0hAVfIxkbp3uH5F8RKm40w5GDLsYoRfGryJbjyLoq1i', '2020-12-08 02:15:28.522149', 0),
(10, 'Nicolás', 'Pellicer Barrio', '0', 'nicolas.pellicer@gmail.com', '$2b$10$XmdDLR./cJvnRDX5opwlp.J9BvBZA2cSbxA/wqouBbWQCDkYwOQM2', '2020-12-08 02:16:01.748424', 1),
(11, 'Felipe', 'Barraza Salazar', '0', 'felipe.barraza.s@mail.pucv.cl', '$2b$10$BB6QGwB2rPgg7Zy1wx6xXOFu/fXT89WdIZlUgOeEn25D1eifGtjsm', '2020-12-09 20:01:51.194295', 1),
(12, 'Eduardo', 'Barrio Huertas', '0', 'eduardo.barrio.h@gmail.com', '$2b$10$khsLgxjnQiHqyPhzayHueucEeRQoYvE99wDtnA0LviyXeyuX/S8Rm', '2020-12-10 15:45:58.099750', 0),
(13, 'Eduardo', 'Carpio Sierra', '0', 'eduardo.carpio.s@gmail.com', '$2b$10$qpK/oJgpCvkyLnzWgTlGBOJk9O9jFKADLt7nR2utEimh4chuMrBHm', '2020-12-10 15:46:45.296131', 0),
(14, 'Eduardo', 'Palomo Amor', '0', 'eduardo.palomo.a@gmail.com', '$2b$10$vGFqp1ZnQlV3LjEiQIuXXukRneN5maf1iNpJPiLVzK9ID3lYsdTHy', '2020-12-10 15:47:17.109140', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `idEquipo` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `objetivo` varchar(255) DEFAULT NULL,
  `fechaCreacion` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`idEquipo`, `nombre`, `objetivo`, `fechaCreacion`) VALUES
(8, 'Proyecto Final', 'Crear un proyecto que nos permita finalizar el semestre.', '2020-12-08 20:51:38.911048'),
(9, 'Espacio Personal', 'Organizar todas las tareas para mi bienestar físico y emocional.', '2020-12-09 20:06:54.696267'),
(10, 'Tareas IO', 'Organización para las tareas de investigación de operaciones.', '2020-12-10 01:48:04.152784'),
(11, 'Tareas de Redes', 'Organización para las últimas tareas de redes.', '2020-12-10 01:52:29.071850');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` varchar(6) NOT NULL,
  `fechaCreacion` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `enlaceVideoconferencia` varchar(255) DEFAULT NULL,
  `idCategoria` int(255) DEFAULT NULL,
  `idEquipo` int(255) NOT NULL,
  `privacidad` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`idEvento`, `nombre`, `descripcion`, `fecha`, `hora`, `fechaCreacion`, `enlaceVideoconferencia`, `idCategoria`, `idEquipo`, `privacidad`) VALUES
(7, 'Definir parámetros', 'Sin descripción.', '2020-12-16', '15:30', '2020-12-10 01:55:42.965116', 'https://meet.google.com/jix-dmaj-upy', 1, 11, 0),
(8, 'Definir roles', 'Definir los roles para el proyecto.', '2020-12-10', '17:30', '2020-12-10 01:58:20.421985', 'https://meet.google.com/dzf-rowt-tzc', 1, 8, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaequipo`
--

CREATE TABLE `listaequipo` (
  `idListaEquipo` int(255) NOT NULL,
  `idEquipo` int(255) NOT NULL,
  `idColaborador` int(255) NOT NULL,
  `encargado` tinyint(1) NOT NULL,
  `fechaAsignacionEquipo` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `listaequipo`
--

INSERT INTO `listaequipo` (`idListaEquipo`, `idEquipo`, `idColaborador`, `encargado`, `fechaAsignacionEquipo`) VALUES
(10, 8, 2, 1, '2020-12-08 20:51:39.110054'),
(15, 8, 3, 0, '2020-12-09 19:51:09.293812'),
(16, 8, 4, 0, '2020-12-09 20:00:48.108148'),
(17, 8, 11, 0, '2020-12-09 20:04:11.055865'),
(18, 9, 2, 1, '2020-12-09 20:06:54.830837'),
(19, 10, 3, 1, '2020-12-10 01:48:04.268310'),
(20, 10, 4, 0, '2020-12-10 01:48:27.484284'),
(21, 10, 2, 0, '2020-12-10 01:48:40.000123'),
(22, 11, 4, 1, '2020-12-10 01:52:29.256040'),
(23, 11, 2, 0, '2020-12-10 01:52:44.981383');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaeventos`
--

CREATE TABLE `listaeventos` (
  `idListaEventos` int(255) NOT NULL,
  `idEvento` int(255) NOT NULL,
  `idColaborador` int(255) NOT NULL,
  `fechaAsignacionEvento` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `listaeventos`
--

INSERT INTO `listaeventos` (`idListaEventos`, `idEvento`, `idColaborador`, `fechaAsignacionEvento`) VALUES
(43, 7, 4, '2020-12-10 01:55:43.088118'),
(44, 7, 2, '2020-12-10 01:55:43.143611'),
(45, 8, 2, '2020-12-10 01:58:20.633885'),
(46, 8, 3, '2020-12-10 01:58:20.814980'),
(47, 8, 4, '2020-12-10 01:58:20.914519'),
(48, 8, 11, '2020-12-10 01:58:21.069044');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listatareas`
--

CREATE TABLE `listatareas` (
  `idListaTareas` int(255) NOT NULL,
  `idTarea` int(255) NOT NULL,
  `idColaborador` int(255) NOT NULL,
  `fechaAsignacionTarea` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `listatareas`
--

INSERT INTO `listatareas` (`idListaTareas`, `idTarea`, `idColaborador`, `fechaAsignacionTarea`) VALUES
(3, 3, 3, '2020-12-09 20:45:55.553856'),
(4, 4, 2, '2020-12-09 20:46:45.907545'),
(5, 5, 11, '2020-12-09 20:47:27.165151'),
(6, 6, 11, '2020-12-09 21:24:40.207401'),
(7, 7, 2, '2020-12-09 23:14:23.173054'),
(8, 8, 2, '2020-12-09 23:15:53.111199'),
(9, 9, 2, '2020-12-09 23:16:33.485765'),
(10, 10, 2, '2020-12-10 01:49:21.584712'),
(11, 11, 2, '2020-12-10 01:50:12.826662'),
(12, 12, 2, '2020-12-10 01:53:24.756629'),
(13, 13, 4, '2020-12-10 01:53:53.776130');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha` date DEFAULT NULL,
  `fechaCreacion` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `descripcion` varchar(255) NOT NULL,
  `idCategoria` int(255) DEFAULT NULL,
  `idEquipo` int(255) NOT NULL,
  `completado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `nombre`, `fecha`, `fechaCreacion`, `descripcion`, `idCategoria`, `idEquipo`, `completado`) VALUES
(3, 'Redactar descripción general', '2020-12-11', '2020-12-09 20:45:55.356744', 'Escribir en el informe la descripción general del problema.', 1, 8, 0),
(4, 'Redactar gestión de riesgos', '2020-12-12', '2020-12-09 20:46:45.645526', 'Escribir en el informe la gestión de riesgos.', 2, 8, 0),
(5, 'Redactar estudio de factibilidad', '2020-12-11', '2020-12-09 20:47:27.074966', 'Escribir en el informe el estudio de factibilidad.', 1, 8, 0),
(6, 'Redactar introducción', '2020-12-09', '2020-12-09 21:24:40.092611', 'Escribir en el informe la introducción.', 3, 8, 1),
(7, 'Meditar', '2020-12-10', '2020-12-09 23:14:22.859976', 'Sin descripción.', 0, 9, 0),
(8, 'Hacer ejercicio', '2020-12-10', '2020-12-09 23:15:52.739167', 'Sin descripción.', 0, 9, 0),
(9, 'Dormir 8 horas', '2020-12-10', '2020-12-09 23:16:33.342018', 'Sin descripción.', 0, 9, 0),
(10, 'Avanzar en el código', '2020-12-16', '2020-12-10 01:49:21.400367', 'Agregar las estructuras de datos.', 2, 10, 0),
(11, 'Avanzar en el informe', '2020-12-16', '2020-12-10 01:50:12.682804', 'Completar introducción y desarrollo.', 2, 10, 0),
(12, 'Terminar tarea 3a', '2020-12-23', '2020-12-10 01:53:24.675338', 'Terminar el código de la tarea 3a', 3, 11, 0),
(13, 'Terminar tarea 3b', '2020-12-23', '2020-12-10 01:53:53.517360', 'Terminar de escribir el informe.', 2, 11, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigo`
--
ALTER TABLE `amigo`
  ADD PRIMARY KEY (`idAmigo`),
  ADD KEY `idColaborador1` (`idColaborador1`),
  ADD KEY `idColaborador2` (`idColaborador2`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `colaborador`
--
ALTER TABLE `colaborador`
  ADD PRIMARY KEY (`idColaborador`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`idEquipo`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`idEvento`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idEquipo` (`idEquipo`);

--
-- Indices de la tabla `listaequipo`
--
ALTER TABLE `listaequipo`
  ADD PRIMARY KEY (`idListaEquipo`),
  ADD KEY `idEquipo` (`idEquipo`),
  ADD KEY `idColaborador` (`idColaborador`);

--
-- Indices de la tabla `listaeventos`
--
ALTER TABLE `listaeventos`
  ADD PRIMARY KEY (`idListaEventos`),
  ADD KEY `idEvento` (`idEvento`),
  ADD KEY `idColaborador` (`idColaborador`);

--
-- Indices de la tabla `listatareas`
--
ALTER TABLE `listatareas`
  ADD PRIMARY KEY (`idListaTareas`),
  ADD KEY `idTarea` (`idTarea`),
  ADD KEY `idColaborador` (`idColaborador`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idEquipo` (`idEquipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amigo`
--
ALTER TABLE `amigo`
  MODIFY `idAmigo` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `idColaborador` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `idEquipo` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `listaequipo`
--
ALTER TABLE `listaequipo`
  MODIFY `idListaEquipo` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `listaeventos`
--
ALTER TABLE `listaeventos`
  MODIFY `idListaEventos` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `listatareas`
--
ALTER TABLE `listatareas`
  MODIFY `idListaTareas` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigo`
--
ALTER TABLE `amigo`
  ADD CONSTRAINT `amigo_ibfk_1` FOREIGN KEY (`idColaborador1`) REFERENCES `colaborador` (`idColaborador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `amigo_ibfk_2` FOREIGN KEY (`idColaborador2`) REFERENCES `colaborador` (`idColaborador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evento_ibfk_2` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listaequipo`
--
ALTER TABLE `listaequipo`
  ADD CONSTRAINT `listaequipo_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listaequipo_ibfk_2` FOREIGN KEY (`idColaborador`) REFERENCES `colaborador` (`idColaborador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listaeventos`
--
ALTER TABLE `listaeventos`
  ADD CONSTRAINT `listaeventos_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listaeventos_ibfk_2` FOREIGN KEY (`idColaborador`) REFERENCES `colaborador` (`idColaborador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listatareas`
--
ALTER TABLE `listatareas`
  ADD CONSTRAINT `listatareas_ibfk_1` FOREIGN KEY (`idColaborador`) REFERENCES `colaborador` (`idColaborador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listatareas_ibfk_2` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
