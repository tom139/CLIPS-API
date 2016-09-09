--
-- @file ./builder/CLIPS_structure.sql
-- @date 03/09/2016
-- @version 1.0
-- @author Tommaso Panozzo
--
-- File per creare la struttura del database


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

-- --------------------------------------------------------

--
-- Struttura della tabella `AuthToken`
--

DROP TABLE IF EXISTS `AuthToken`;
CREATE TABLE IF NOT EXISTS `AuthToken` (
  `token` varchar(127) NOT NULL,
  `userID` int(10) unsigned NOT NULL,
  `expirationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`token`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `Beacon`
--

DROP TABLE IF EXISTS `Beacon`;
CREATE TABLE IF NOT EXISTS `Beacon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `UUID` char(36) NOT NULL,
  `minor` smallint(5) unsigned NOT NULL,
  `major` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=55 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `Building`
--

DROP TABLE IF EXISTS `Building`;
CREATE TABLE IF NOT EXISTS `Building` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `otherInfo` text NOT NULL,
  `openingTime` text NOT NULL,
  `address` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `telephone` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `telegram` varchar(255) DEFAULT NULL,
  `websiteURL` varchar(500) NOT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `LeaderBoard`
--

DROP TABLE IF EXISTS `LeaderBoard`;
CREATE TABLE IF NOT EXISTS `LeaderBoard` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pathID` int(10) unsigned NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nPlayers` int(10) NOT NULL,
  `topScore` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pathID` (`pathID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `Path`
--

DROP TABLE IF EXISTS `Path`;
CREATE TABLE IF NOT EXISTS `Path` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `target` text NOT NULL,
  `estimatedDuration` varchar(255) NOT NULL,
  `startingMessage` text NOT NULL,
  `rewardMessage` text NOT NULL,
  `position` int(10) unsigned NOT NULL,
  `buildingID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BuildingID` (`buildingID`),
  KEY `BuildingID_2` (`buildingID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `PathResult`
--

DROP TABLE IF EXISTS `PathResult`;
CREATE TABLE IF NOT EXISTS `PathResult` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pathID` int(10) unsigned NOT NULL,
  `userID` int(10) unsigned NOT NULL,
  `totalScore` smallint(6) DEFAULT NULL,
  `startDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pathresult_path` (`pathID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `Proof`
--

DROP TABLE IF EXISTS `Proof`;
CREATE TABLE IF NOT EXISTS `Proof` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `instructions` text NOT NULL,
  `scoringAlgorithmData` text NOT NULL,
  `testType` int(10) unsigned NOT NULL,
  `testData` text NOT NULL,
  `testTitle` varchar(255) NOT NULL,
  `testInstructions` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `ProofResult`
--

DROP TABLE IF EXISTS `ProofResult`;
CREATE TABLE IF NOT EXISTS `ProofResult` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `proofID` int(10) unsigned DEFAULT NULL,
  `pathResultID` int(10) unsigned NOT NULL,
  `startTime` timestamp NULL DEFAULT NULL,
  `endTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `score` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pathResultID` (`pathResultID`),
  KEY `proofID` (`proofID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `Proximity`
--

DROP TABLE IF EXISTS `Proximity`;
CREATE TABLE IF NOT EXISTS `Proximity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `beaconID` int(10) unsigned DEFAULT NULL,
  `percentage` tinyint(4) DEFAULT NULL COMMENT 'da -100 a +100',
  `textToDisplay` text,
  PRIMARY KEY (`id`),
  KEY `beaconID` (`beaconID`),
  KEY `beaconID_2` (`beaconID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `Score`
--

DROP TABLE IF EXISTS `Score`;
CREATE TABLE IF NOT EXISTS `Score` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `leaderBoardID` int(10) unsigned NOT NULL,
  `userID` int(10) unsigned NOT NULL,
  `score` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `leaderBoardID` (`leaderBoardID`),
  KEY `userID` (`userID`),
  KEY `leaderBoardID_2` (`leaderBoardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `Step`
--

DROP TABLE IF EXISTS `Step`;
CREATE TABLE IF NOT EXISTS `Step` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `stopBeaconID` int(10) unsigned NOT NULL,
  `proofID` int(10) unsigned DEFAULT NULL,
  `pathID` int(10) unsigned NOT NULL,
  `position` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stopBeaconID` (`stopBeaconID`,`pathID`),
  KEY `stopBeaconID_2` (`stopBeaconID`),
  KEY `pathID` (`pathID`),
  KEY `proofID` (`proofID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `StepProximity`
--

DROP TABLE IF EXISTS `StepProximity`;
CREATE TABLE IF NOT EXISTS `StepProximity` (
  `stepID` int(10) unsigned DEFAULT NULL,
  `proximityID` int(10) unsigned DEFAULT NULL,
  KEY `stepID` (`stepID`),
  KEY `proximityID` (`proximityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(127) NOT NULL,
  `password` varchar(255) NOT NULL,
  `modificationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creationDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `email_2` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=121 ;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `AuthToken`
--
ALTER TABLE `AuthToken`
  ADD CONSTRAINT `fk_authtoken_user` FOREIGN KEY (`userID`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `LeaderBoard`
--
ALTER TABLE `LeaderBoard`
  ADD CONSTRAINT `fk_leaderboard_path` FOREIGN KEY (`pathID`) REFERENCES `Path` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `Path`
--
ALTER TABLE `Path`
  ADD CONSTRAINT `fk_path_building` FOREIGN KEY (`BuildingID`) REFERENCES `Building` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `PathResult`
--
ALTER TABLE `PathResult`
  ADD CONSTRAINT `fk_pathresult_path` FOREIGN KEY (`pathID`) REFERENCES `Path` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pathresult_user` FOREIGN KEY (`userID`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `ProofResult`
--
ALTER TABLE `ProofResult`
  ADD CONSTRAINT `fk_proofresult_pathresult` FOREIGN KEY (`pathResultID`) REFERENCES `PathResult` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_proofresult_proof` FOREIGN KEY (`proofID`) REFERENCES `Proof` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limiti per la tabella `Proximity`
--
ALTER TABLE `Proximity`
  ADD CONSTRAINT `fk_proximity_beacon` FOREIGN KEY (`beaconID`) REFERENCES `Beacon` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limiti per la tabella `Score`
--
ALTER TABLE `Score`
  ADD CONSTRAINT `fk_score_user` FOREIGN KEY (`userID`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_score_leaderbord` FOREIGN KEY (`leaderBoardID`) REFERENCES `LeaderBoard` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `Step`
--
ALTER TABLE `Step`
  ADD CONSTRAINT `fk_step_proof` FOREIGN KEY (`proofID`) REFERENCES `Proof` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_step_beacon` FOREIGN KEY (`stopBeaconID`) REFERENCES `Beacon` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_step_path` FOREIGN KEY (`pathID`) REFERENCES `Path` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `StepProximity`
--
ALTER TABLE `StepProximity`
  ADD CONSTRAINT `fk_stepproximity_proximity` FOREIGN KEY (`proximityID`) REFERENCES `Proximity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_stepproximity_step` FOREIGN KEY (`stepID`) REFERENCES `Step` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
