/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `userId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(255) UNIQUE NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
    (1, 'Marissa','marissa@email.com','password123'),
    (2, 'Scott','scott@email.com','password456'),
    (3, 'Erin','erin@email.com','password789');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `Albums`
--

DROP TABLE IF EXISTS `Albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Albums` (
  `albumId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `albumName` varchar(255) NOT NULL,
  PRIMARY KEY (`albumId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Albums`
--

LOCK TABLES `Albums` WRITE;
/*!40000 ALTER TABLE `Albums` DISABLE KEYS */;
INSERT INTO `Albums` VALUES
    (1,'Magical Mystery Tour'),
    (2,'After Hours'),
    (3,'Made in California');
/*!40000 ALTER TABLE `Albums` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `Songs`
--

DROP TABLE IF EXISTS `Songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Songs` (
  `songId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `songName` varchar(255) NOT NULL,
  `songAlbum` int(11), 
  PRIMARY KEY (`songId`),
  FOREIGN KEY (`songAlbum`) REFERENCES `Albums` (`albumId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Songs`
--

LOCK TABLES `Songs` WRITE;
/*!40000 ALTER TABLE `Songs` DISABLE KEYS */;
INSERT INTO `Songs` VALUES
    (NULL,'Strawberry Fields Forever',1), 
    (NULL,'Blinding Lights',2),
    (NULL,'Kokomo',3);
/*!40000 ALTER TABLE `Songs` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `Artists`
--

DROP TABLE IF EXISTS `Artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Artists` (
  `artistId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `artistName` varchar(255) NOT NULL,
  PRIMARY KEY (`artistId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Artists`
--

LOCK TABLES `Artists` WRITE;
/*!40000 ALTER TABLE `Artists` DISABLE KEYS */;
INSERT INTO `Artists` VALUES
    (1,'The Beatles'),
    (2,'The Weeknd'),
    (3,'The Beach Boys');
/*!40000 ALTER TABLE `Artists` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Genres` (
  `genreId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `genreName` varchar(255) NOT NULL,
  PRIMARY KEY (`genreId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genres`
--

LOCK TABLES `Genres` WRITE;
/*!40000 ALTER TABLE `Genres` DISABLE KEYS */;
INSERT INTO `Genres` VALUES
    (1,'Pop'),
    (2,'Hip-hop'),
    (3,'Rap'),
    (4,'Rock'),
    (5,'Dance and Electronic'),
    (6,'Indie Rock'),
    (7,'Alternative Rock'),
    (8,'Country'),
    (9,'Classical'),
    (10,'Pirate Metal');
/*!40000 ALTER TABLE `Genres` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `UsersSongs`
--

DROP TABLE IF EXISTS `UsersSongs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsersSongs` (
  `songId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  FOREIGN KEY (`songId`) 
    REFERENCES `Songs`(`songId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`userId`) 
    REFERENCES `Users`(`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `UsersSongs`
--

LOCK TABLES `UsersSongs` WRITE;
/*!40000 ALTER TABLE `UsersSongs` DISABLE KEYS */;
INSERT INTO `UsersSongs` VALUES
    (1,3),
    (2,2),
    (3,1);
/*!40000 ALTER TABLE `UsersSongs` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `SongsArtists`
--

DROP TABLE IF EXISTS `SongsArtists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SongsArtists` (
  `songId` int(11) NOT NULL,
  `artistId` int(11) NOT NULL,
  FOREIGN KEY (`songId`) 
    REFERENCES `Songs`(`songId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`artistId`) 
    REFERENCES `Artists`(`artistId`)
    ON DELETE CASCADE,
  PRIMARY KEY (`songId`, `artistId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `SongsArtists`
--

LOCK TABLES `SongsArtists` WRITE;
/*!40000 ALTER TABLE `SongsArtists` DISABLE KEYS */;
INSERT INTO `SongsArtists` VALUES
    (1,1),
    (2,2),
    (3,3);
/*!40000 ALTER TABLE `SongsArtists` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `AlbumsGenres`
--

DROP TABLE IF EXISTS `AlbumsGenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AlbumsGenres` (
  `albumId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL,
  FOREIGN KEY (`albumId`) 
    REFERENCES `Albums`(`albumId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`genreId`) 
    REFERENCES `Genres`(`genreId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AlbumsGenres`
--

LOCK TABLES `AlbumsGenres` WRITE;
/*!40000 ALTER TABLE `AlbumsGenres` DISABLE KEYS */;
INSERT INTO `AlbumsGenres` VALUES
    (1,1),
    (2,5),
    (3,1);
/*!40000 ALTER TABLE `AlbumsGenres` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `ArtistsGenres`
--

DROP TABLE IF EXISTS `ArtistsGenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ArtistsGenres` (
  `artistId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL,
  FOREIGN KEY (`artistId`) 
    REFERENCES `Artists`(`artistId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`genreId`) 
    REFERENCES `Genres`(`genreId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ArtistsGenres`
--

LOCK TABLES `ArtistsGenres` WRITE;
/*!40000 ALTER TABLE `ArtistsGenres` DISABLE KEYS */;
INSERT INTO `ArtistsGenres` VALUES
    (1,1),
    (2,5),
    (3,1);
/*!40000 ALTER TABLE `ArtistsGenres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SongsGenres`
--

DROP TABLE IF EXISTS `SongsGenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SongsGenres` (
  `songId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL,
  FOREIGN KEY (`songId`) 
    REFERENCES `Songs`(`songId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`genreId`) 
    REFERENCES `Genres`(`genreId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `SongsGenres`
--

LOCK TABLES `SongsGenres` WRITE;
/*!40000 ALTER TABLE `SongsGenres` DISABLE KEYS */;
INSERT INTO `SongsGenres` VALUES
    (1,1),
    (2,5),
    (3,1);
/*!40000 ALTER TABLE `SongsGenres` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;