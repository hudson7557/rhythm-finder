-- Select Queries. All have been tested and are functioning 
-- on flip server

-- Select All Songs with Artists, Albums, Genres (Detailed)

SELECT s.songId, s.songName, an.artistName, IFNULL(a.albumName, "NULL") AS albumName, gn.genreName 
FROM Songs s 
LEFT JOIN Albums a ON a.albumId = s.songAlbum 
LEFT JOIN(
    SELECT sg.songId, g.genreName 
    FROM SongsGenres sg 
    INNER JOIN Genres g ON g.genreId = sg.genreId) gn 
ON s.songId = gn.songId 
LEFT JOIN(
    SELECT sar.songId, ar.artistName 
    FROM SongsArtists sar
    INNER JOIN Artists ar ON ar.artistId = sar.artistId) an
ON s.songId = an.songId;

-- Select SongsArtists

SELECT s.songId, s.songName, arn.artistName, arn.artistId 
FROM Songs s
LEFT JOIN (
    SELECT sar.songId, ar.artistName, ar.artistId
    FROM Artists ar 
    INNER JOIN SongsArtists sar ON sar.artistId = ar.artistId) arn
ON s.songId = arn.songId WHERE arn.artistId = ? ;

-- Select Songs by Album

SELECT s.songId, s.songName, IFNULL(a.albumName, 'NULL') AS albumName
FROM Songs s LEFT JOIN Albums a
ON a.albumId = s.songAlbum 
WHERE a.albumId = ? ;

-- Select SongsGenres

SELECT s.songId, s.songName, an.artistName,
    IFNULL(a.albumName, 'NULL') AS albumName,
    gn.genreName
FROM Songs s
LEFT JOIN Albums a ON a.albumId = s.songAlbum
LEFT JOIN (
    SELECT sg.songId, g.genreName, g.genreId
    FROM SongsGenres sg
    INNER JOIN Genres g ON g.genreId = sg.genreId
) gn
ON s.songId = gn.songId
LEFT JOIN(
    SELECT sar.songId, ar.artistName
    FROM SongsArtists sar
    INNER JOIN Artists ar ON ar.artistId = sar.artistId
) an ON s.songId = an.songId
WHERE gn.genreId = ?;

-- Select Albums by Genre

SELECT a.albumId, a.albumName, gn.genreName
FROM Albums a
LEFT JOIN (
    SELECT ag.albumId, g.genreName FROM AlbumsGenres ag
    INNER JOIN Genres g ON g.genreId = ag.genreId) gn
ON a.albumId = gn.albumId;

-- Select Albums by a specific Genre

SELECT a.albumId, a.albumName, gn.genreName 
FROM Albums a
LEFT JOIN(
    SELECT ag.albumId, g.genreId, g.genreName FROM AlbumsGenres ag 
    INNER JOIN Genres g ON g.genreId = ag.genreId) gn
ON a.albumId = gn.albumId
WHERE gn.genreId = ?;

-- Select ArtistsGenres

SELECT a.artistId, a.artistName, gn.genreName
FROM Artists a 
LEFT JOIN 
    (SELECT ag.artistId, g.genreName FROM ArtistsGenres ag 
    INNER JOIN Genres g ON g.genreId = ag.genreId) gn 
ON a.artistId = gn.artistId;

-- Select Artists by specific Genre

SELECT a.artistId, a.artistName, gn.genreName 
FROM Artists a 
LEFT JOIN 
    (SELECT ag.artistId, g.genreName, g.genreId FROM ArtistsGenres ag 
    INNER JOIN Genres g ON g.genreId = ag.genreId) gn 
ON a.artistId = gn.artistId 
WHERE gn.genreId = ?;

-- Select all Genres

SELECT * FROM Genres;

-- Select Users

SELECT * FROM Users;

SELECT * FROM Users WHERE userId = ?;

-- Select UserSongs

SELECT u.userId, u.userName, sn.songName, sn.songId
FROM Users u
LEFT JOIN(
    SELECT us.songId, us.userId, s.songName FROM UsersSongs us
    JOIN Songs s ON s.songId = us.songId) sn
ON u.userId = sn.userId
WHERE u.userId = ?;


-- 
-- Query to insert an artist and song, also establishes the M:M connect in SongsArtists
-- 

INSERT INTO `Artists` VALUES (NUll, "Notorious C.A.T."); 
SET @artistId = LAST_INSERT_ID();
INSERT INTO `Songs` VALUES (NULL, "One more life", 2);
SET @songId = LAST_INSERT_ID();
INSERT INTO `SongsArtists` VALUES (@songId, @artistId);

/*
-- Testing query 
SELECT t1.artistName, t3.songName FROM Artists AS t1 JOIN SongsArtists AS t2 ON t1.artistId = t2.artistId JOIN Songs AS t3 ON t2.songId=t3.songId
*/


-- 
-- Query to insert an album and a Genre, also establishes the M:M connect in AlbumsGenres
-- Assuming Genres id would be provided back to us automatically. 
--

INSERT INTO `Albums` VALUES (NUll, "Notorious"); 
SET @albumId = LAST_INSERT_ID();
INSERT INTO `AlbumsGenres` VALUES (@albumId, 3); -- edit the three to change value

/*
-- Testing query
SELECT t1.albumName, t3.genreName FROM Albums AS t1 JOIN AlbumsGenress AS t2 ON t1.albumId = t2.albumId JOIN Genress AS t3 ON t2.genreId=t3.genreId
*/


--
--  Query to insert a song and Genre, also establishes the M:M connect in SongsGenres and gets an AlbumsId since that's referenced in the schema
--
INSERT INTO `Albums` VALUES (NUll, "Notorious"); 
SET @albumId = LAST_INSERT_ID();
INSERT INTO `Songs` VALUES (NUll, "Notorious C.A.T.", @albumId); 
SET @songId = LAST_INSERT_ID();
INSERT INTO `SongsGenres` VALUES (@songId, 3);

/*
-- Testing query
SELECT t1.songName, t3.genreName FROM Songs AS t1 JOIN Songs_Genress AS t2 ON t1.songId = t2.songId JOIN Genress AS t3 ON t2.genreId=t3.genreId
*/


--
--  Query to insert into arists_Genress
--
INSERT INTO `Artists` VALUES (NUll, "Notorious C.A.T."); 
SET @artistId = LAST_INSERT_ID();
INSERT INTO `ArtistsGenres` VALUES (@artistId, 3);

/*
-- Testing query
SELECT t1.artistName, t3.genreName FROM Artists AS t1 JOIN Artists_Genress AS t2 ON t1.artistId = t2.artistId JOIN Genress AS t3 ON t2.genreId=t3.genreId
*/


--
--  Query to add a users song list. 
--

INSERT INTO `Songs` VALUES (NUll, "One more chance", @albumId); 
SET @songId = LAST_INSERT_ID();

INSERT INTO `UsersSongs` VALUES (@songId, (SELECT userId FROM Users WHERE userName="Eddie the cat")); -- Obviously will have to edit how we get the user name.

/*
-- Testing query ALSO SELECTS A USERS ENTIRE LIBRARY OF SONGS
SELECT t1.userName, t3.songName FROM users AS t1 JOIN users_Songs AS t2 ON t1.userId = t2.userId JOIN Songs AS t3 ON t2.songId=t3.songId
*/


--
--  Query to insert a full entity 
--

-- We're gonna use The Notorious C.A.T., a notorious rapper to test this.
-- Ideally, we'd set the following values as we recieved information from the front end
SET @artistName = "Notorious C.A.T.";
SET @songName = "One more chance";
SET @albumName = "Notorious";
SET @genreId = 3; -- 3 is the value of a rapper. 


INSERT INTO `Artists` VALUES (NUll, @artistName); 
SET @artistId = LAST_INSERT_ID();
INSERT INTO `ArtistsGenres` VALUES (@artistId, @genreId); -- Artists_Genress completed

-- Insert into album next 
INSERT INTO `Albums` VALUES (NUll, @albumName); 
SET @albumId = LAST_INSERT_ID();
INSERT INTO `Songs` VALUES (NUll, @songName, @albumId); 
SET @songId = LAST_INSERT_ID();
INSERT INTO `SongsGenres` VALUES (@songId, @genreId); -- Songs_Genress completed

-- Insert into album Genress next
INSERT INTO `AlbumsGenres` VALUES (@albumId, @genreId); -- Albums_Genress completed
INSERT INTO `UsersSongs` VALUE (@songId, (SELECT userId FROM Users WHERE userName = "Scott")); -- CHECK TO MAKE SURE THIS IS CORRECT 


-- 
-- Query to view a complete song entity which has the song name, artist name, album name, and Genres
-- 
SELECT t3.songName, t1.artistName, t6.albumName, t5.genreName FROM Artists AS t1 
    JOIN SongsArtists AS t2 ON t1.artistId = t2.artistId 
    JOIN Songs AS t3 ON t2.songId=t3.songId 
    JOIN AlbumsGenres AS t4 ON t3.songAlbum = t4.albumId 
    JOIN Genres AS t5 ON t4.genreId = t5.genreId 
    JOIN Albums AS t6 ON t3.songAlbum = t6.albumId;
    -- Add a relationship to users_Songs.

-- Update query for the Users table 
UPDATE Users SET userEmail = ? WHERE userId = ?;

-- Delete from UsersSongs

DELETE FROM UsersSongs WHERE userId = ? and songId = ?;

/*
INSERT STATEMENTS FOR EACH INDIVIDUAL TABLE (Really illogical)
*/ 

-- Insert into Albums 
-- ? = albumName
INSERT INTO Albums VALUE (NULL, ?); 

-- Insert into Artists
-- ? = artistName
INSERT INTO Artists VALUE (NULL, ?);

-- Insert into Artists
-- ? = genreName
INSERT INTO Genres VALUE (NULL, ?);

-- Insert into songs
-- 1st ? = songName  2nd ? = genreName (user would enter the song name and select a genre by title.)
INSERT INTO Songs VALUE (NULL, ?, (SELECT genreId FROM Genres WHERE genreName = "Alt-Indy"));

-- Insert into User already exists.

-- Insert into UsersSongs
SET @songTitle = "Heat Wave";
SET @userId = 2; -- Would have to pull this from somewhere... Not sure where depends on how we're transfering data.
INSERT INTO UsersSongs VALUE ((SELECT songId FROM Songs WHERE songName = @songTitle), @userId);

-- Insert into AlbumsGenres
/* This table currently allow duplicates change that by using
ALTER TABLE AlbumsGenres 
  ADD CONSTRAINT UQ_Entry UNIQUE (albumId, genreId);
*/
SET @albumName = "Glass Animals";
SET @genreId = 12; -- Would have to pull this from somewhere... Not sure where depends on how we're transfering data.
INSERT INTO AlbumsGenres VALUE ((SELECT albumId FROM Albums WHERE albumName = @albumName), @genreId);

-- Insert into ArtistsGenres
/* This table currently allow duplicates change that by using
ALTER TABLE ArtistsGenres 
  ADD CONSTRAINT UQ_Entry UNIQUE (artistId, genreId);
*/
SET @ArtistName = "Glass Animals";
SET @genreId = 12; -- Would have to pull this from somewhere... Not sure where depends on how we're transfering data.
INSERT INTO ArtistsGenres VALUE ((SELECT artistId FROM Artists WHERE artistName = @artistName), @genreId);

-- Insert into SongsGenres
/* This table currently allow duplicates change that by using
ALTER TABLE SongsGenres 
  ADD CONSTRAINT UQ_Entry UNIQUE (songId, genreId);
*/
SET @songName = "Heat Wave";
SET @genreId = 12; -- Would have to pull this from somewhere... Not sure where depends on how we're transfering data.
INSERT INTO SongsGenres VALUE ((SELECT songId FROM Songs WHERE songName = @songName), @genreId);

-- Insert into SongsArtists
/* This table currently allow duplicates change that by using
ALTER TABLE SongsArtists 
  ADD CONSTRAINT UQ_Entry UNIQUE (songId, artistId);
*/
SET @songTitle = "Heat Wave";
SET @artistName = "Glass Animals";
INSERT INTO SongsArtists VALUE ((SELECT songId FROM Songs WHERE songName = @songTitle), (SELECT artistId FROM Artists WHERE artistName = @artistName));

-- Insert into Users
/* This table already doesn't allow duplicate emails so no alter statement needed.
*/
SET @userName = "Kona";
SET @userEmail = "kona@email.com";
SET @userPassword = "password";

INSERT INTO `Users` VALUE (NULL, @userName, @userEmail, @userPassword);

-- Final 
INSERT INTO `Users` VALUE (NULL, ?, ?, ?);