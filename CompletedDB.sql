/*
-- Query to delete M:M tables
DROP TABLES songs_genres, songs_artists, users_songs, artists_genres, albums_genres
DROP TABLE songs
DROP TABLES genres, artists, users, albums.
*/

-- New database definition 

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
-- Creating the albums table
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `albums` (
  `albumId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `albumName` varchar(255) NOT NULL,
  PRIMARY KEY (`albumId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Creating the songs table
--

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
-- Creating the artists table
-- 

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  `artistId` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `artistName` varchar(255) NOT NULL,
  PRIMARY KEY (`artistId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Creating the genres table
-- 

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
-- Table structure for table `users_songs`
--

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
-- Table structure for table `songs-artists`
--

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
    ON DELETE CASCADE,
  PRIMARY KEY (`songId`, `artistId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `albums_genres`
--

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