-- 
-- Query to insert an artist and song, also establishes the M:M connect in songs_artists
-- 

INSERT INTO `artists` VALUES (NUll, "Notorious C.A.T."); 
SET @artistId = LAST_INSERT_ID();
INSERT INTO `songs` VALUES (NULL, "One more life", 2);
SET @songId = LAST_INSERT_ID();
INSERT INTO `songs_artists` VALUES (@songId, @artistId);

/*
-- Testing query 
SELECT t1.artistName, t3.songName FROM artists AS t1 JOIN songs_artists AS t2 ON t1.artistId = t2.artistId JOIN songs AS t3 ON t2.songId=t3.songId
*/


-- 
-- Query to insert an album and a genre, also establishes the M:M connect in albums_genres
-- Assuming genre id would be provided back to us automatically. 
--

INSERT INTO `albums` VALUES (NUll, "Notorious"); 
SET @albumId = LAST_INSERT_ID();
INSERT INTO `albums_genres` VALUES (@albumId, 3); -- edit the three to change value

/*
-- Testing query
SELECT t1.albumName, t3.genreName FROM albums AS t1 JOIN albums_genres AS t2 ON t1.albumId = t2.albumId JOIN genres AS t3 ON t2.genreId=t3.genreId
*/


--
--  Query to insert a song and genre, also establishes the M:M connect in songs_genres and gets an albumsId since that's referenced in the schema
--
INSERT INTO `albums` VALUES (NUll, "Notorious"); 
SET @albumId = LAST_INSERT_ID();
INSERT INTO `songs` VALUES (NUll, "Notorious C.A.T.", @albumId); 
SET @songId = LAST_INSERT_ID();
INSERT INTO `songs_genres` VALUES (@songId, 3);

/*
-- Testing query
SELECT t1.songName, t3.genreName FROM songs AS t1 JOIN songs_genres AS t2 ON t1.songId = t2.songId JOIN genres AS t3 ON t2.genreId=t3.genreId
*/


--
--  Query to insert into arists_genres
--
INSERT INTO `artists` VALUES (NUll, "Notorious C.A.T."); 
SET @artistId = LAST_INSERT_ID();
INSERT INTO `artists_genres` VALUES (@artistId, 3);

/*
-- Testing query
SELECT t1.artistName, t3.genreName FROM artists AS t1 JOIN artists_genres AS t2 ON t1.artistId = t2.artistId JOIN genres AS t3 ON t2.genreId=t3.genreId
*/


--
--  Query to add a users song list. 
--

INSERT INTO `songs` VALUES (NUll, "One more chance", @albumId); 
SET @songId = LAST_INSERT_ID();

INSERT INTO `users_songs` VALUES (@songId, (SELECT userId FROM users WHERE userName="Eddie the cat")); -- Obviously will have to edit how we get the user name.

/*
-- Testing query ALSO SELECTS A USERS ENTIRE LIBRARY OF SONGS
SELECT t1.userName, t3.songName FROM users AS t1 JOIN users_songs AS t2 ON t1.userId = t2.userId JOIN songs AS t3 ON t2.songId=t3.songId
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


INSERT INTO `artists` VALUES (NUll, @artistName); 
SET @artistId = LAST_INSERT_ID();
INSERT INTO `artists_genres` VALUES (@artistId, @genreId); -- artists_genres completed

-- Insert into ablum next 
INSERT INTO `albums` VALUES (NUll, @albumName); 
SET @albumId = LAST_INSERT_ID();
INSERT INTO `songs` VALUES (NUll, @songName, @albumId); 
SET @songId = LAST_INSERT_ID();
INSERT INTO `songs_genres` VALUES (@songId, @genreId); -- songs_genres completed

-- Insert into album genres next
INSERT INTO `albums_genres` VALUES (@albumId, @genreId); -- albums_genres completed
INSERT INTO `songs_artists` VALUES (@songId, @artistId); -- songs_albums completed
INSERT INTO `users_song` VALUE ((SELECT userId FROM users WHERE Name = "Scott"), @songId) -- CHECK TO MAKE SURE THIS IS CORRECT 

-- 
-- Query to view a complete song entity which has the song name, artist name, album name, and genre
-- 
SELECT t3.songName, t1.artistName, t6.albumName, t5.genreName FROM artists AS t1 
    JOIN songs_artists AS t2 ON t1.artistId = t2.artistId 
    JOIN songs AS t3 ON t2.songId=t3.songId 
    JOIN albums_genres AS t4 ON t3.songAlbum = t4.albumId 
    JOIN genres AS t5 ON t4.genreId = t5.genreId 
    JOIN albums AS t6 ON t3.songAlbum = t6.albumId;
    -- Add a relationship to users_songs.
