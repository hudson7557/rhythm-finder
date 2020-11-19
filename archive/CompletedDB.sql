/*
-- Query to delete M:M tables
DROP TABLES SongsGenres, SongsArtists, UsersSongs, ArtistsGenres, AlbumsGenres
DROP TABLE Songs
DROP TABLES Genres, Artists, Users, Albums
*/

-- New database definition 

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
-- Creating the Albums table
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Albums` (
  `albumId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `albumName` varchar(255) NOT NULL,
  PRIMARY KEY (`albumId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Creating the Songs table
--

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
-- Creating the Artists table
-- 

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Artists` (
  `artistId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `artistName` varchar(255) NOT NULL,
  PRIMARY KEY (`artistId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Creating the Genres table
-- 

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
-- Table structure for table `Songs-Artists`
--

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
-- Table structure for table `AlbumsGenres`
--

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
-- Table structure for table `ArtistsGenres`
--

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
-- Table structure for table `ArtistsGenres`
--

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