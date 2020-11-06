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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(255) UNIQUE NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_planets`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
    (1,'Marissa','marissa@email.com','password123'),
    (2,'Scott','scott@email.com','password456'),
    (3,'Erin','erin@email.com','password789');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs` (
  `songId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `songName` varchar(255) NOT NULL,
  `songAlbum` int(11),
  PRIMARY KEY (`songId`),
  FOREIGN KEY (`songAlbum`) REFERENCES `albums` (`albumId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES
    (1,'Strawberry Fields Forever',1),
    (2,'Blinding Lights',2),
    (3,'Kokomo',3);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `albums` (
  `albumId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `albumName` varchar(255) NOT NULL,
  PRIMARY KEY (`albumId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES
    (1,'Magical Mystery Tour'),
    (2,'After Hours'),
    (3,'Made in California');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  `artistId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `artistName` varchar(255) NOT NULL,
  PRIMARY KEY (`artistId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES
    (1,'The Beatles'),
    (2,'The Weeknd'),
    (3,'The Beach Boys');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `genreId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `genreName` varchar(255) NOT NULL,
  PRIMARY KEY (`genreId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES
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
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song-artists`
--

DROP TABLE IF EXISTS `users_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_songs` (
  `songId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  FOREIGN KEY (`songId`) 
    REFERENCES `songs`(`songId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`userId`) 
    REFERENCES `users`(`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `song-artists`
--

DROP TABLE IF EXISTS `songs_artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs_artists` (
  `songId` int(11) NOT NULL,
  `artistId` int(11) NOT NULL,
  FOREIGN KEY (`songId`) 
    REFERENCES `songs`(`songId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`artistId`) 
    REFERENCES `artists`(`artistId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `albums_genres`
--

DROP TABLE IF EXISTS `albums_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `albums_genres` (
  `albumId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL,
  FOREIGN KEY (`albumId`) 
    REFERENCES `albums`(`albumId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`genreId`) 
    REFERENCES `genres`(`genreId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `artists_genres`
--

DROP TABLE IF EXISTS `artists_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists_genres` (
  `artistId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL,
  FOREIGN KEY (`artistId`) 
    REFERENCES `artists`(`artistId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`genreId`) 
    REFERENCES `genres`(`genreId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `artists_genres`
--

DROP TABLE IF EXISTS `songs_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs_genres` (
  `songId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL,
  FOREIGN KEY (`songId`) 
    REFERENCES `songs`(`songId`)
    ON DELETE CASCADE,
  FOREIGN KEY (`genreId`) 
    REFERENCES `genres`(`genreId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;