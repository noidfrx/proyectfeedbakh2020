-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2020 a las 23:45:30
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

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

--
-- Volcado de datos para la tabla `amigo`
--

INSERT INTO `amigo` (`idAmigo`, `idColaborador1`, `idColaborador2`, `aceptado`) VALUES
(1, 4, 30, 1),
(2, 14, 38, 0),
(3, 14, 52, 0),
(4, 5, 48, 0),
(5, 12, 40, 0),
(6, 23, 36, 0),
(7, 6, 50, 0),
(8, 27, 49, 0),
(9, 18, 38, 0),
(10, 23, 34, 0),
(11, 6, 28, 0),
(12, 15, 45, 0),
(13, 17, 50, 0),
(14, 4, 43, 1),
(15, 22, 36, 0),
(16, 4, 52, 1),
(17, 20, 51, 0),
(18, 24, 28, 0),
(19, 9, 47, 0),
(20, 20, 51, 0),
(21, 6, 47, 0),
(22, 9, 33, 0),
(23, 27, 32, 0),
(24, 6, 38, 0),
(25, 26, 53, 0),
(26, 4, 46, 1),
(27, 16, 53, 0),
(28, 5, 41, 0),
(29, 16, 43, 0),
(30, 4, 35, 1),
(31, 2, 28, 1),
(32, 2, 21, 1),
(33, 2, 45, 1),
(34, 2, 40, 1),
(35, 1, 28, 1),
(36, 1, 30, 1),
(37, 2, 21, 1),
(38, 2, 43, 1),
(39, 3, 16, 1),
(40, 2, 6, 1),
(41, 3, 16, 1),
(42, 1, 31, 1),
(43, 1, 28, 1),
(44, 2, 42, 1),
(45, 2, 13, 1),
(46, 2, 25, 1),
(47, 3, 31, 1),
(48, 3, 15, 1),
(49, 1, 13, 1),
(50, 3, 47, 1);

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
(1, 'Trabajo importante'),
(2, 'Area administrativa'),
(3, 'Area comercial'),
(4, 'categoria 4'),
(5, 'categoria 5');

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
(2, 'Eduardo', 'Ibacache González', '0', 'eduardo@gmail.com', '1235', '2020-10-31 17:40:50.430169'),
(3, 'Karina', 'Hermosilla Moraga', '0', 'kari@kari.com', 'kari', '2020-11-03 02:15:33.655545'),
(4, 'Felipe', 'Javier', '0', 'Ad@ad.com', 'jiji', '2020-11-04 20:42:24.519724'),
(5, 'Omar', 'Valdés', '0', 'venenatis@elementum.ca', 'Nki98MN', '2021-02-11 01:37:01.000000'),
(6, 'Adela', 'Sepúlveda', '0', 'tempor.diam@felispurusac.net', 'Zce68OY', '2020-01-31 12:48:08.000000'),
(7, 'Pilar', 'Campos', '0', 'tempus.non.lacinia@ullamcorpermagnaSed.net', 'Mkg27FP', '2019-12-21 18:54:18.000000'),
(8, 'Eugenio', 'Muñoz', '0', 'risus.odio.auctor@tortorNunccommodo.com', 'Xrk40OK', '2021-10-10 04:54:03.000000'),
(9, 'Miley', 'Figueroa', '0', 'vitae.sodales.at@placerateget.co.uk', 'Rxd56IA', '2021-02-23 10:42:18.000000'),
(10, 'Yeremy', 'Silva', '0', 'Nulla.eget.metus@arcuac.net', 'Jrz65DT', '2019-11-29 21:02:13.000000'),
(11, 'Isaias', 'Araya', '0', 'cubilia.Curae@etpede.com', 'Etx46JQ', '2021-01-09 12:44:55.000000'),
(12, 'Patrick', 'Sepúlveda', '0', 'dui@rutrumeuultrices.ca', 'Nba93HV', '2019-12-15 01:38:44.000000'),
(13, 'Ademir', 'Jiménez', '0', 'cursus.diam@mattis.edu', 'Mod02XD', '2021-04-21 07:24:06.000000'),
(14, 'Joao', 'Martínez', '0', 'aliquet.libero@eutellusPhasellus.org', 'Rub72FA', '2020-07-30 15:43:58.000000'),
(15, 'Cristián', 'Ortega', '0', 'ut.nisi@senectus.co.uk', 'Qec12PZ', '2021-02-04 18:15:29.000000'),
(16, 'Yanira', 'Vega', '0', 'nec@magnis.co.uk', 'Nty25JM', '2020-11-10 20:13:12.000000'),
(17, 'Lorenzo', 'Vásquez', '0', 'Nullam@Nuncquisarcu.net', 'Bit58TU', '2020-09-07 23:15:00.000000'),
(18, 'Maria', 'Muñoz', '0', 'augue.ut.lacus@sapien.edu', 'Wnz15IA', '2021-05-26 03:49:12.000000'),
(19, 'Thiago', 'Alvarado', '0', 'nulla@ultriciesligulaNullam.ca', 'Tsd73VK', '2020-08-02 06:44:49.000000'),
(20, 'Jean', 'Silva', '0', 'Donec.felis@sollicitudincommodo.co.uk', 'Lqy79KE', '2020-01-02 18:45:26.000000'),
(21, 'Michelle', 'Carvajal', '0', 'Suspendisse@Morbi.org', 'Wqs37IT', '2020-11-11 21:17:06.000000'),
(22, 'Amaru', 'Salazar', '0', 'lobortis.quis@viverraDonectempus.co.uk', 'Pcj28YX', '2021-03-24 12:56:21.000000'),
(23, 'Allison', 'Valdés', '0', 'sit.amet.orci@Sedmalesuadaaugue.net', 'Ujj33AE', '2021-04-30 05:28:12.000000'),
(24, 'Lucca', 'Gallardo', '0', 'dignissim.lacus.Aliquam@intempuseu.net', 'Mjg47XI', '2020-10-22 05:17:10.000000'),
(25, 'Thayra', 'García', '0', 'tempor.arcu@et.org', 'Bej33TA', '2020-11-06 21:12:20.000000'),
(26, 'Lucio', 'Campos', '0', 'consectetuer.adipiscing@scelerisque.org', 'Htc34ZR', '2021-10-20 05:47:54.000000'),
(27, 'Jade', 'Medina', '0', 'sodales.Mauris@arcuet.edu', 'Vgv36LY', '2020-05-09 09:33:04.000000'),
(28, 'Renato', 'Sáez', '0', 'sagittis@lectusantedictum.co.uk', 'Fps58BV', '2020-02-13 04:34:21.000000'),
(29, 'Ashly', 'Garrido', '0', 'Quisque@eumetusIn.net', 'Duz90VA', '2020-03-22 07:45:41.000000'),
(30, 'Andrew', 'Pérez', '0', 'posuere.vulputate.lacus@diam.com', 'Uvo05XL', '2021-06-19 00:25:57.000000'),
(31, 'Fernando', 'Riquelme', '0', 'eu@Maurisquis.co.uk', 'Hma73QJ', '2020-05-19 06:07:14.000000'),
(32, 'Rosita', 'Moreno', '0', 'viverra.Maecenas.iaculis@pellentesquetellussem.ca', 'Lvu19UR', '2021-01-04 16:58:43.000000'),
(33, 'Chriss', 'San Martín', '0', 'ornare.lectus.ante@erat.com', 'Jyv84PU', '2021-04-06 05:09:05.000000'),
(34, 'Maytte', 'Cortés', '0', 'eget@sem.edu', 'Fid49KZ', '2019-12-11 22:39:47.000000'),
(35, 'Loreto', 'Palma', '0', 'malesuada.Integer.id@volutpatNulladignissim.edu', 'Fnu22FO', '2020-12-22 09:05:32.000000'),
(36, 'Lesly', 'Vega', '0', 'non@facilisisfacilisismagna.org', 'Qsd49GF', '2021-08-17 15:49:56.000000'),
(37, 'Cecilia', 'Ramírez', '0', 'Nulla.interdum.Curabitur@fringillacursus.edu', 'Gcf29ZA', '2020-08-29 01:27:04.000000'),
(38, 'Jeans', 'Farías', '0', 'non@acfeugiatnon.net', 'Yha55EE', '2020-11-16 17:34:28.000000'),
(39, 'Marthyna', 'Donoso', '0', 'vestibulum.lorem@NullaaliquetProin.ca', 'Ilt28DL', '2020-12-12 06:15:22.000000'),
(40, 'Celso', 'Guerrero', '0', 'adipiscing.enim.mi@ultriciesdignissim.co.uk', 'Nfj13EG', '2020-02-20 12:32:23.000000'),
(41, 'Giorgio', 'Morales', '0', 'laoreet@temporaugueac.ca', 'Lvj19LZ', '2021-06-28 06:11:00.000000'),
(42, 'Ninoska', 'Pérez', '0', 'ipsum@asollicitudinorci.com', 'Pqf40SP', '2021-01-15 10:53:52.000000'),
(43, 'Paola', 'Navarrete', '0', 'diam@nislelementumpurus.edu', 'Fgb45DS', '2020-03-01 22:25:25.000000'),
(44, 'Adonis', 'Vidal', '0', 'nec.quam@Duisat.net', 'Thd68UU', '2020-12-09 05:31:02.000000'),
(45, 'Andrés', 'Ortiz', '0', 'et.risus@erosProinultrices.co.uk', 'Kbo38EG', '2020-07-26 21:26:46.000000'),
(46, 'Nahir', 'Salazar', '0', 'molestie.Sed@ac.ca', 'Xqt25HJ', '2020-04-06 09:24:06.000000'),
(47, 'Joakin', 'Vargas', '0', 'ornare.lectus.ante@ametmetus.ca', 'Tel02WJ', '2020-03-17 18:55:54.000000'),
(48, 'Karina', 'Miranda', '0', 'sit@bibendumfermentummetus.ca', 'Gsv36UO', '2021-01-07 06:55:06.000000'),
(49, 'Dilan', 'Pérez', '0', 'iaculis.nec.eleifend@Donecnibh.edu', 'Utx58FO', '2021-02-08 07:40:14.000000'),
(50, 'Rosita', 'Ramírez', '0', 'massa.Vestibulum@infaucibusorci.org', 'Qku61PO', '2020-11-10 12:49:43.000000'),
(51, 'Jared', 'Jiménez', '0', 'enim.Etiam.imperdiet@ornareelitelit.org', 'Joq18LP', '2021-01-01 00:54:49.000000'),
(52, 'Carolaine', 'Leiva', '0', 'eget@consequat.com', 'Xzy66LZ', '2020-01-25 05:59:49.000000'),
(53, 'Rosita', 'Garrido', '0', 'tellus@Duis.edu', 'Nrz35IO', '2020-03-08 03:19:26.000000'),
(54, 'Jahir', 'Flores', '0', 'lobortis.ultrices@enimnislelementum.org', 'Cjc08DE', '2020-04-17 02:50:56.000000');

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
(2, 'sapien', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2020-04-18 15:35:10.000000'),
(3, 'mattis', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2020-12-26 12:27:21.000000'),
(4, 'tempor bibendum.', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec', '2020-04-09 09:10:11.000000'),
(5, 'senectus', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.', '2020-04-14 17:08:49.000000'),
(6, 'amet metus. Aliquam', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-04-05 10:38:53.000000'),
(7, 'ac risus. Morbi metus. Vivamus', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis', '2020-04-29 02:52:45.000000'),
(8, 'faucibus orci luctus et', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam', '2020-04-24 12:56:08.000000'),
(9, 'ac tellus.', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2020-08-31 18:51:27.000000'),
(10, 'sagittis felis.', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu', '2020-04-29 09:45:47.000000'),
(11, 'diam luctus lobortis.', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus', '2021-05-03 21:31:22.000000'),
(12, 'Morbi', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.', '2021-01-05 09:51:41.000000'),
(13, 'justo. Praesent', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2020-04-23 06:34:03.000000'),
(14, 'ipsum. Curabitur', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus', '2021-10-06 05:38:09.000000'),
(15, 'nec tempus scelerisque, lorem', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus.', '2020-05-02 03:46:32.000000'),
(16, 'congue. In scelerisque scelerisque', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque', '2020-10-09 12:15:04.000000'),
(17, 'Phasellus nulla. Integer', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec', '2020-04-10 06:31:07.000000'),
(18, 'vel,', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec', '2020-12-07 16:29:40.000000'),
(19, 'facilisis', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2020-03-15 09:48:31.000000'),
(20, 'ante. Nunc mauris sapien,', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.', '2019-12-25 18:03:36.000000'),
(21, 'sit', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2019-12-28 23:47:38.000000');

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
(1, 1, 3, 0);

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
(1, 1, 3);

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
(1, 'Comer mucho', '2020-11-26', '2020-11-05 02:33:03.000000', 'La idea es comer mucho', 1, 1);

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
  MODIFY `idAmigo` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `idColaborador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `idEquipo` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
  MODIFY `idTarea` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
