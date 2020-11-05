-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2020 a las 04:52:59
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
  `aceptado` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(100) NOT NULL,
  `nombreCategoria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'Trabajo importante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaborador`
--

CREATE TABLE `colaborador` (
  `idColaborador` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `fotoPerfil` varchar(255) DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fechaCreacion` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `colaborador`
--

INSERT INTO `colaborador` (`idColaborador`, `nombre`, `apellidos`, `fotoPerfil`, `email`, `password`, `fechaCreacion`) VALUES
(1, 'admin', 'admin', '0', 'admin@admin.com', 'admin', '2020-10-31 17:40:06.000000'),
(5, 'Eduardo', 'Ibacache González', '0', 'eduardo@gmail.com', '1235', '2020-10-31 17:40:50.430169'),
(6, 'Karina', 'Hermosilla Moraga', '0', 'kari@kari.com', 'kari', '2020-11-03 02:15:33.655545'),
(7, 'Felipe', 'Javier', '0', 'Ad@ad.com', 'jiji', '2020-11-04 20:42:24.519724');

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
(1, 'Los chanchitos', 'La idea del grupo los chanchitos es comer lo que más pueda en el menor tiempo posible.', '2020-11-04 19:44:09.000000'),
(2, 'los voludos', 'ff', '2020-11-05 02:34:40.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` int(255) NOT NULL,
  `fechaCreacion` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `enlaceVideoconferencia` varchar(255) DEFAULT NULL,
  `idCategoria` int(255) DEFAULT NULL,
  `idEquipo` int(255) NOT NULL,
  `privacidad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaequipo`
--

CREATE TABLE `listaequipo` (
  `idListaEquipo` int(255) NOT NULL,
  `idEquipo` int(255) NOT NULL,
  `idColaborador` int(255) NOT NULL,
  `encargado` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `listaequipo`
--

INSERT INTO `listaequipo` (`idListaEquipo`, `idEquipo`, `idColaborador`, `encargado`) VALUES
(1, 1, 6, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaeventos`
--

CREATE TABLE `listaeventos` (
  `idListaEventos` int(255) NOT NULL,
  `idEvento` int(255) NOT NULL,
  `idColaborador` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listatareas`
--

CREATE TABLE `listatareas` (
  `idListaTareas` int(255) NOT NULL,
  `idTarea` int(255) NOT NULL,
  `idColaborador` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `listatareas`
--

INSERT INTO `listatareas` (`idListaTareas`, `idTarea`, `idColaborador`) VALUES
(1, 1, 6),
(2, 4, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `fechaCreacion` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `descripcion` varchar(255) NOT NULL,
  `idCategoria` int(255) DEFAULT NULL,
  `idEquipo` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `nombre`, `fecha`, `fechaCreacion`, `descripcion`, `idCategoria`, `idEquipo`) VALUES
(1, 'Comer mucho', '2020-11-26', '2020-11-05 02:33:03.000000', 'La idea es comer mucho', 1, 1),
(3, 'ff', '2020-11-21', '2020-11-05 02:34:52.000000', 'UNA DESCRIPCION', 1, 2),
(4, 'Tirarse las bolas', '2020-11-14', '2020-11-05 02:41:27.000000', 'Tirarase las bolas mucho', 1, 1);

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
  MODIFY `idAmigo` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `idColaborador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `idEquipo` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `listaequipo`
--
ALTER TABLE `listaequipo`
  MODIFY `idListaEquipo` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `listaeventos`
--
ALTER TABLE `listaeventos`
  MODIFY `idListaEventos` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `listatareas`
--
ALTER TABLE `listatareas`
  MODIFY `idListaTareas` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigo`
--
ALTER TABLE `amigo`
  ADD CONSTRAINT `amigo_ibfk_1` FOREIGN KEY (`idColaborador1`) REFERENCES `colaborador` (`idColaborador`),
  ADD CONSTRAINT `amigo_ibfk_2` FOREIGN KEY (`idColaborador2`) REFERENCES `colaborador` (`idColaborador`);

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`),
  ADD CONSTRAINT `evento_ibfk_2` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`);

--
-- Filtros para la tabla `listaequipo`
--
ALTER TABLE `listaequipo`
  ADD CONSTRAINT `listaequipo_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`),
  ADD CONSTRAINT `listaequipo_ibfk_2` FOREIGN KEY (`idColaborador`) REFERENCES `colaborador` (`idColaborador`);

--
-- Filtros para la tabla `listaeventos`
--
ALTER TABLE `listaeventos`
  ADD CONSTRAINT `listaeventos_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`),
  ADD CONSTRAINT `listaeventos_ibfk_2` FOREIGN KEY (`idColaborador`) REFERENCES `colaborador` (`idColaborador`);

--
-- Filtros para la tabla `listatareas`
--
ALTER TABLE `listatareas`
  ADD CONSTRAINT `listatareas_ibfk_1` FOREIGN KEY (`idColaborador`) REFERENCES `colaborador` (`idColaborador`),
  ADD CONSTRAINT `listatareas_ibfk_2` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`);

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`),
  ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
