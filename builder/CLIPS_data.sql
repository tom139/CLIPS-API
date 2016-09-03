-- phpMyAdmin SQL Dump
-- version 4.0.10.16
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generato il: Set 03, 2016 alle 15:58
-- Versione del server: 5.5.46
-- Versione PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `CLIPS`
--
CREATE DATABASE IF NOT EXISTS `CLIPS` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `CLIPS`;

--
-- Dump dei dati per la tabella `Beacon`
--

INSERT INTO `Beacon` (`id`, `UUID`, `minor`, `major`) VALUES
(1, '12345678912345678912345678912345', 11, 22),
(2, '12345678912345678912344', 22, 33),
(3, '12312312312312312312312312312312', 1, 20),
(4, '45674567456745674567654567654567', 12, 21),
(5, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 26106, 37898),
(6, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 29457, 51009),
(7, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 6133, 17321),
(8, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 48168, 13558),
(9, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 61201, 13028),
(10, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 7108, 54923),
(11, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 47095, 26547),
(12, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 25249, 1512),
(13, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 37164, 43440),
(14, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 33227, 39760),
(15, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 25713, 62300),
(16, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 59014, 30426),
(17, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 13146, 51883),
(18, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 17506, 33027),
(19, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 47235, 56102),
(20, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 21334, 25387),
(21, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 37059, 56878),
(22, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 57277, 42651),
(23, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 56218, 16360),
(24, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 21068, 48801),
(25, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 3687, 64117),
(26, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 30351, 21551),
(27, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 29361, 61859),
(28, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 33979, 2009),
(29, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 14330, 48446),
(30, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 23222, 28582),
(31, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 36000, 51183),
(32, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 56755, 50977),
(33, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 32558, 22237),
(34, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 1433, 54009),
(35, 'a495f1aa-c5b1-4b44-b512-1370f02d74de', 13, 13),
(36, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 9150, 64849),
(37, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 59371, 7033),
(38, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 12502, 1540),
(39, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 21937, 48906),
(40, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 27570, 52331),
(41, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 53562, 43222),
(42, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 17731, 24013),
(43, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 38074, 56125),
(44, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 58651, 3807),
(45, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 58639, 30881),
(46, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 24867, 41352),
(47, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 43850, 29205),
(48, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 20601, 12509),
(49, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 7988, 24082),
(50, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 51706, 30507),
(51, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 22666, 22910),
(52, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 49337, 10185),
(53, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 22322, 22115),
(54, 'f7826da6-4fa2-4e98-8024-bc5b71e0893e', 1659, 4326);

--
-- Dump dei dati per la tabella `Building`
--

INSERT INTO `Building` (`id`, `name`, `description`, `otherInfo`, `openingTime`, `address`, `latitude`, `longitude`, `telephone`, `email`, `whatsapp`, `telegram`, `websiteURL`, `twitter`, `facebook`) VALUES
(1, 'Torre Archimede', 'Facoltà di matematica fisica e scienze naturali', 'Luogo per lezioni universitarie', '07:30-19:30', 'Via Trieste, 63, 35121 Padova PD, Italia', 45.4113311, 11.887631800000008, '049 827 120', 'dipmath@math.unipd.it', '', '', 'http://www.math.unipd.it/', '', ''),
(2, 'Casa Tommaso', 'Casa di tom', 'altre info', '0-24', 'via delle banane', 45, 5, '0445524846', 'tom@tom.tom', '', '', '', '', '');

--
-- Dump dei dati per la tabella `Path`
--

INSERT INTO `Path` (`id`, `title`, `description`, `target`, `estimatedDuration`, `startingMessage`, `rewardMessage`, `position`, `buildingID`) VALUES
(1, 'Prova', 'Descrizione del percorso prova', 'Destinato agli sviluppatori', '2 ore', 'Buongiorno sviluppatore, prova questo percorso se funziona', 'Complimenti funziona!', 1, 1),
(2, 'Giro di casa tom', 'giro turistico della casa di tom', 'tutti', '10 minuti', 'Pronto a partire?', 'Grande!!', 0, 2),
(3, 'Giro del giardino', 'gita in giardino', 'solo gnomi e fate', '3 ere', 'CIAO', 'complimenti', 1, 2);

--
-- Dump dei dati per la tabella `Proof`
--

INSERT INTO `Proof` (`id`, `title`, `instructions`, `scoringAlgorithmData`, `testType`, `testData`, `testTitle`, `testInstructions`) VALUES
(4, 'Domanda delle scale', 'Rispondi alla domanda', '5050.json', 1, 'GameCollection.json', 'Domandone', 'Seleziona la risposta corretta'),
(5, 'Domanda della lavagna', 'Rispondi alla domanda', 'CorrectnessOnly.json', 2, 'CulturaGeneraleMultipleChoice.json', 'Banalità', 'Seleziona la risposta giusta tra vero e falso');

--
-- Dump dei dati per la tabella `Proximity`
--

INSERT INTO `Proximity` (`id`, `beaconID`, `percentage`, `textToDisplay`) VALUES
(1, 1, -30, 'Acqua'),
(2, 2, 80, 'fuoco');

--
-- Dump dei dati per la tabella `Step`
--

INSERT INTO `Step` (`id`, `stopBeaconID`, `proofID`, `pathID`, `position`) VALUES
(3, 1, 4, 1, 1),
(4, 2, 5, 1, 2),
(5, 2, 4, 2, 1),
(6, 1, 5, 2, 2);

--
-- Dump dei dati per la tabella `StepProximity`
--

INSERT INTO `StepProximity` (`stepID`, `proximityID`) VALUES
(3, 2),
(5, 1);

--
-- Dump dei dati per la tabella `User`
--

INSERT INTO `User` (`id`, `email`, `username`, `password`, `modificationDate`, `creationDate`) VALUES
(1, 'tommaso@gmail.com', 'YO', 'banana33', '2016-09-03 15:43:57', '0000-00-00 00:00:00'),
(2, 'cicciopasticcio@gmail.com', 'fdlsa', 'password', '2016-08-04 14:47:46', '0000-00-00 00:00:00'),
(3, 'testb419f@testemail.com', 'testb419f', '123abcDEF', '2016-08-04 14:58:28', '0000-00-00 00:00:00'),
(4, 'testec7a3@testemail.com', 'testec7a3', '123abcDEF', '2016-08-04 14:59:56', '0000-00-00 00:00:00'),
(7, 'cenze@gmail.com', 'Cenze', 'Cenze94', '2016-09-02 07:31:32', '0000-00-00 00:00:00'),
(9, 'prova@gmail.com', 'Prova', 'prova33', '2016-08-23 17:59:40', '0000-00-00 00:00:00'),
(10, 'provalog@gmail.cenze', 'Provalog', 'provalog33', '2016-08-15 10:51:40', '0000-00-00 00:00:00'),
(25, 'vivi.prova@gmail.com', '', '', '2016-09-02 14:56:46', '0000-00-00 00:00:00'),
(26, 'prova2@gmail.com', 'vivi', 'password1000', '2016-09-02 16:20:17', '0000-00-00 00:00:00'),
(30, 'gianburrasca@gmail.com', 'mannaggia', 'password', '2016-08-27 10:21:33', '0000-00-00 00:00:00'),
(31, 'test_acdd@test.com', 'test_acdd', 'test-passw0rd', '2016-09-03 08:15:38', '0000-00-00 00:00:00'),
(32, 'test_8f2f@test.com', 'test_8f2f', 'test-passw0rd', '2016-09-03 08:16:09', '0000-00-00 00:00:00'),
(33, 'test_4763@test.com', 'test_4763', 'test-passw0rd', '2016-09-03 08:30:54', '0000-00-00 00:00:00'),
(34, 'test_2ac3@test.com', 'test_2ac3', 'test-passw0rd', '2016-09-03 08:32:21', '0000-00-00 00:00:00'),
(35, 'test_8223@test.com', 'test_8223', 'test-passw0rd', '2016-09-03 08:37:47', '0000-00-00 00:00:00'),
(36, 'test_fb6e@test.com', 'test_fb6e', 'test-passw0rd', '2016-09-03 08:38:03', '0000-00-00 00:00:00'),
(37, 'test_ceb8@test.com', 'test_ceb8', 'test-passw0rd', '2016-09-03 08:38:17', '0000-00-00 00:00:00'),
(38, 'test_11f5@test.com', 'test_11f5', 'test-passw0rd', '2016-09-03 08:39:11', '0000-00-00 00:00:00'),
(39, 'test_62de@test.com', 'test_62de', 'test-passw0rd', '2016-09-03 08:39:18', '0000-00-00 00:00:00'),
(40, 'test_89b0@test.com', 'test_89b0', 'test-passw0rd', '2016-09-03 08:39:44', '0000-00-00 00:00:00'),
(41, 'test_96af@test.com', 'test_96af', 'test-passw0rd', '2016-09-03 08:39:52', '0000-00-00 00:00:00'),
(42, 'test_f290@test.com', 'test_f290', 'test-passw0rd', '2016-09-03 08:40:09', '0000-00-00 00:00:00'),
(43, 'test_9788@test.com', 'test_9788', 'test-passw0rd', '2016-09-03 08:40:16', '0000-00-00 00:00:00'),
(44, 'test_51c8@test.com', 'test_51c8', 'test-passw0rd', '2016-09-03 08:40:42', '0000-00-00 00:00:00'),
(45, 'test_b281@test.com', 'test_b281', 'test-passw0rd', '2016-09-03 08:41:01', '0000-00-00 00:00:00'),
(46, 'test_0c35@test.com', 'test_0c35', 'test-passw0rd', '2016-09-03 08:41:04', '0000-00-00 00:00:00'),
(47, 'test_c168@test.com', 'test_c168', 'test-passw0rd', '2016-09-03 08:41:06', '0000-00-00 00:00:00'),
(48, 'test_2ecf@test.com', 'test_2ecf', 'test-passw0rd', '2016-09-03 08:41:08', '0000-00-00 00:00:00'),
(49, 'test_3b78@test.com', 'test_3b78', 'test-passw0rd', '2016-09-03 08:42:46', '0000-00-00 00:00:00'),
(50, 'test_73ee@test.com', 'test_73ee', 'test-passw0rd', '2016-09-03 08:42:55', '0000-00-00 00:00:00'),
(51, 'test_5dda@test.com', 'test_5dda', 'test-passw0rd', '2016-09-03 08:43:33', '0000-00-00 00:00:00'),
(52, 'test_292f@test.com', 'test_292f', 'test-passw0rd', '2016-09-03 08:45:13', '0000-00-00 00:00:00'),
(53, 'test_f4c1@test.com', 'test_f4c1', 'test-passw0rd', '2016-09-03 08:45:26', '0000-00-00 00:00:00'),
(54, 'test_7006@test.com', 'test_7006', 'test-passw0rd', '2016-09-03 08:53:13', '0000-00-00 00:00:00'),
(55, 'test_7d2a@test.com', 'test_7d2a', 'test-passw0rd', '2016-09-03 08:53:25', '0000-00-00 00:00:00'),
(56, 'test_4ad8@test.com', 'test_4ad8', 'test-passw0rd', '2016-09-03 08:54:44', '0000-00-00 00:00:00'),
(57, 'test_b24a@test.com', 'test_b24a', 'test-passw0rd', '2016-09-03 08:55:07', '0000-00-00 00:00:00'),
(58, 'test_c19b@test.com', 'test_c19b', 'test-passw0rd', '2016-09-03 08:55:23', '0000-00-00 00:00:00'),
(59, 'test_7365@test.com', 'test_7365', 'test-passw0rd', '2016-09-03 08:55:40', '0000-00-00 00:00:00'),
(60, 'test_ced0@test.com', 'test_ced0', 'test-passw0rd', '2016-09-03 08:56:01', '0000-00-00 00:00:00'),
(61, 'test_8e5a@test.com', 'test_8e5a', 'test-passw0rd', '2016-09-03 08:56:41', '0000-00-00 00:00:00'),
(62, 'test_125e@test.com', 'test_125e', 'test-passw0rd', '2016-09-03 09:08:36', '0000-00-00 00:00:00'),
(63, 'test_aac0@test.com', 'test_aac0', 'test-passw0rd', '2016-09-03 09:11:00', '0000-00-00 00:00:00'),
(64, 'test_040f@test.com', 'test_040f', 'test-passw0rd', '2016-09-03 09:11:56', '0000-00-00 00:00:00'),
(65, 'test_d464@test.com', 'test_d464', 'test-passw0rd', '2016-09-03 09:12:26', '0000-00-00 00:00:00'),
(66, 'test_86c3@test.com', 'test_86c3', 'test-passw0rd', '2016-09-03 09:13:16', '0000-00-00 00:00:00'),
(67, 'test_a213@test.com', 'test_a213', 'test-passw0rd', '2016-09-03 09:16:50', '0000-00-00 00:00:00'),
(68, 'test_0b3f@test.com', 'test_0b3f', 'test-passw0rd', '2016-09-03 09:22:38', '0000-00-00 00:00:00'),
(69, 'test_02fd@test.com', 'test_02fd', 'test-passw0rd', '2016-09-03 09:23:51', '0000-00-00 00:00:00'),
(70, 'test_d357@test.com', 'test_d357', 'test-passw0rd', '2016-09-03 09:26:44', '0000-00-00 00:00:00'),
(71, 'test_c3af@test.com', 'test_c3af', 'test-passw0rd', '2016-09-03 09:27:49', '0000-00-00 00:00:00'),
(72, 'test_d244@test.com', 'test_d244', 'test-passw0rd', '2016-09-03 09:29:36', '0000-00-00 00:00:00'),
(73, 'test_2b1b@test.com', 'test_2b1b', 'test-passw0rd', '2016-09-03 09:30:21', '0000-00-00 00:00:00'),
(74, 'test_6ab3@test.com', 'test_6ab3', 'test-passw0rd', '2016-09-03 09:32:15', '0000-00-00 00:00:00'),
(75, 'test_d8cf@test.com', 'test_d8cf', 'test-passw0rd', '2016-09-03 09:32:29', '0000-00-00 00:00:00'),
(76, 'test_edef@test.com', 'test_edef', 'test-passw0rd', '2016-09-03 09:33:34', '0000-00-00 00:00:00'),
(77, 'test_eee4@test.com', 'test_eee4', 'test-passw0rd', '2016-09-03 09:33:55', '0000-00-00 00:00:00'),
(78, 'test_42f4@test.com', 'test_42f4', 'test-passw0rd', '2016-09-03 09:34:25', '0000-00-00 00:00:00'),
(79, 'test_bb1e@test.com', 'test_bb1e', 'test-passw0rd', '2016-09-03 09:54:42', '0000-00-00 00:00:00'),
(80, 'test_368d@test.com', 'test_368d', 'test-passw0rd', '2016-09-03 09:55:03', '0000-00-00 00:00:00'),
(81, 'test_d06d@test.com', 'test_d06d', 'test-passw0rd', '2016-09-03 10:14:44', '0000-00-00 00:00:00'),
(82, 'test_cfb8@test.com', 'test_cfb8', 'test-passw0rd', '2016-09-03 10:43:09', '0000-00-00 00:00:00'),
(83, 'test_bf34@test.com', 'test_bf34', 'test-passw0rd', '2016-09-03 10:43:36', '0000-00-00 00:00:00'),
(84, 'test_3134@test.com', 'test_3134', 'test-passw0rd', '2016-09-03 10:49:05', '0000-00-00 00:00:00'),
(85, 'test_b1fa@test.com', 'test_b1fa', 'test-passw0rd', '2016-09-03 10:50:50', '0000-00-00 00:00:00'),
(86, 'test_1196@test.com', 'test_1196', 'test-passw0rd', '2016-09-03 11:00:55', '0000-00-00 00:00:00'),
(87, 'test_f31e@test.com', 'test_f31e', 'test-passw0rd', '2016-09-03 11:02:01', '0000-00-00 00:00:00'),
(88, 'test_4545@test.com', 'test_4545', 'test-passw0rd', '2016-09-03 11:04:19', '0000-00-00 00:00:00'),
(89, 'test_1d7e@test.com', 'test_1d7e', 'test-passw0rd', '2016-09-03 11:05:08', '0000-00-00 00:00:00'),
(90, 'test_1191@test.com', 'test_1191', 'test-passw0rd', '2016-09-03 11:11:59', '0000-00-00 00:00:00'),
(91, 'test_2679@test.com', 'test_2679', 'test-passw0rd', '2016-09-03 11:12:22', '0000-00-00 00:00:00'),
(92, 'test_39e8@test.com', 'test_39e8', 'test-passw0rd', '2016-09-03 11:12:44', '0000-00-00 00:00:00'),
(93, 'test_6a7a@test.com', 'test_6a7a', 'test-passw0rd', '2016-09-03 11:15:04', '0000-00-00 00:00:00'),
(94, 'test_85d9@test.com', 'test_85d9', 'test-passw0rd', '2016-09-03 11:15:20', '0000-00-00 00:00:00'),
(95, 'test_f24c@test.com', 'test_f24c', 'test-passw0rd', '2016-09-03 11:17:05', '0000-00-00 00:00:00'),
(96, 'test_7910@test.com', 'test_7910', 'test-passw0rd', '2016-09-03 11:28:08', '0000-00-00 00:00:00'),
(97, 'test_903d@test.com', 'test_903d', 'test-passw0rd', '2016-09-03 11:29:12', '0000-00-00 00:00:00'),
(98, 'test_decc@test.com', 'test_decc', 'test-passw0rd', '2016-09-03 11:30:15', '0000-00-00 00:00:00'),
(99, 'test_a346@test.com', 'test_a346', 'test-passw0rd', '2016-09-03 11:31:24', '0000-00-00 00:00:00'),
(100, 'test_123b@test.com', 'test_123b', 'test-passw0rd', '2016-09-03 11:31:51', '0000-00-00 00:00:00'),
(101, 'test_195e@test.com', 'test_195e', 'test-passw0rd', '2016-09-03 11:32:46', '0000-00-00 00:00:00'),
(102, 'test_0524@test.com', 'test_0524', 'test-passw0rd', '2016-09-03 11:33:25', '0000-00-00 00:00:00'),
(103, 'test_3883@test.com', 'test_3883', 'test-passw0rd', '2016-09-03 11:37:56', '0000-00-00 00:00:00'),
(104, 'test_e50e@test.com', 'test_e50e', 'test-passw0rd', '2016-09-03 11:38:52', '0000-00-00 00:00:00'),
(105, 'test_6a7c@test.com', 'test_6a7c', 'test-passw0rd', '2016-09-03 11:39:00', '0000-00-00 00:00:00'),
(106, 'test_fdd9@test.com', 'test_fdd9', 'test-passw0rd', '2016-09-03 11:39:09', '0000-00-00 00:00:00'),
(107, 'test_1ddd@test.com', 'test_1ddd', 'test-passw0rd', '2016-09-03 11:39:51', '0000-00-00 00:00:00'),
(108, 'test_7435@test.com', 'test_7435', 'test-passw0rd', '2016-09-03 11:41:19', '0000-00-00 00:00:00'),
(109, 'test_624f@test.com', 'test_624f', 'test-passw0rd', '2016-09-03 11:44:14', '0000-00-00 00:00:00'),
(110, 'test_533d@test.com', 'test_533d', 'test-passw0rd', '2016-09-03 11:46:48', '0000-00-00 00:00:00'),
(111, 'test_b931@test.com', 'test_b931', 'test-passw0rd', '2016-09-03 15:00:22', '0000-00-00 00:00:00'),
(112, 'test_fdfc@test.com', 'test_fdfc', 'test-passw0rd', '2016-09-03 15:05:20', '0000-00-00 00:00:00'),
(113, 'test_1753@test.com', 'test_1753', 'test-passw0rd', '2016-09-03 15:08:57', '0000-00-00 00:00:00'),
(114, 'test_f940@test.com', 'test_f940', 'test-passw0rd', '2016-09-03 15:32:46', '0000-00-00 00:00:00'),
(115, 'test_00b0@test.com', 'test_00b0', 'test-passw0rd', '2016-09-03 15:35:39', '0000-00-00 00:00:00'),
(116, 'test_b19f@test.com', 'test_b19f', 'test-passw0rd', '2016-09-03 15:38:39', '0000-00-00 00:00:00'),
(117, 'test_dc99@test.com', 'test_dc99', 'test-passw0rd', '2016-09-03 15:38:39', '0000-00-00 00:00:00'),
(118, 'test_8028@test.com', 'test_8028', 'test-passw0rd', '2016-09-03 15:39:17', '0000-00-00 00:00:00'),
(119, 'test_d1dc@test.com', 'test_d1dc', 'test-passw0rd', '2016-09-03 15:44:21', '0000-00-00 00:00:00'),
(120, 'test_1811@test.com', 'test_1811', 'test-passw0rd', '2016-09-03 15:47:15', '0000-00-00 00:00:00');

--
-- Dump dei dati per la tabella `PathResult`
--

INSERT INTO `PathResult` (`id`, `pathID`, `userID`, `totalScore`, `startDate`, `endDate`) VALUES
(1, 1, 1, 200, '2016-07-27 09:29:31', '2016-07-27 11:00:00'),
(2, 1, 1, 34, '2016-08-19 10:53:24', '2016-08-19 13:22:15'),
(3, 1, 1, 34, '2016-08-19 10:53:24', '2016-08-19 13:22:15'),
(4, 1, 1, 34, '2016-08-19 10:53:24', '2016-08-19 13:22:15'),
(5, 1, 1, 29, '2016-08-19 10:53:24', '2016-08-19 13:22:15'),
(6, 1, 7, 34, '2016-08-19 10:53:24', '2016-08-19 13:22:15'),
(14, 1, 7, 34, '2016-08-19 10:53:24', '2016-08-19 13:22:15');

--
-- Dump dei dati per la tabella `ProofResult`
--

INSERT INTO `ProofResult` (`id`, `proofID`, `pathResultID`, `startTime`, `endTime`, `score`) VALUES
(1, 4, 1, '2016-07-27 09:20:00', '2016-08-19 14:39:13', 10),
(3, 5, 1, '2016-07-27 10:00:00', '2016-08-19 14:39:29', 5),
(4, 4, 4, '2016-08-19 10:53:55', '2016-08-19 11:56:05', 15),
(5, 5, 4, '2016-08-19 12:03:12', '2016-08-19 13:22:15', 19),
(6, 4, 5, '2016-08-24 10:53:55', '2016-08-24 11:56:05', 12),
(7, 5, 5, '2016-08-24 12:03:12', '2016-08-24 13:22:15', 17),
(8, 4, 6, '2016-08-19 10:53:55', '2016-08-19 11:56:05', 15),
(9, 5, 6, '2016-08-19 12:03:12', '2016-08-19 13:22:15', 19),
(24, 4, 14, '2016-08-19 10:53:55', '2016-08-19 11:56:05', 15),
(25, 5, 14, '2016-08-19 12:03:12', '2016-08-19 13:22:15', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
