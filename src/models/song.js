var mysql = require("../config/mysql");
var Song = {};

Song.getSongs = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("songs"), [])
            .then(resolve)
            .catch(reject);
    });
}

Song.getAllSongs = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allSongs"), [])
            .then(resolve)
            .catch(reject);
    });
}

Song.getAllSongsByArtist = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("AllSongsByArtist"), [])
            .then(resolve)
            .catch(reject);
    });
}

Song.getSongsByArtist = (artistId) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("SongsByArtist"), [artistId])
            .then(resolve)
            .catch(reject);
    });
}

Song.getSongsByAlbum = (albumId) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allSongsByAlbum"), [albumId])
            .then(resolve)
            .catch(reject);
    });
}

Song.getSongsByGenre = (genreId) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("SongsByGenre"), [genreId])
            .then(resolve)
            .catch(reject);
    });
}

Song.getAllSongsByGenre = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allSongsByGenre"), [])
            .then(resolve)
            .catch(reject);
    });
}

Song.addSong = (song, album, artist) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("addSong"), [song, album, artist])
            .then(resolve)
            .catch(reject);
    });
}

Song.addSong1 = (song, artist) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("addSong1"), [song, artist])
            .then(resolve)
            .catch(reject);
    });
}

Song.addSongArtist = (song, artist) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("addSongArtist"), [song, artist])
            .then(resolve)
            .catch(reject);
    });
}

Song.addSongGenre = (song, genre) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("addSongGenre"), [song, genre])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "songs":
            query = "SELECT s.songId, s.songName, \
            IFNULL(a.albumName, 'NULL') AS albumName \
            FROM Songs s LEFT JOIN Albums a ON \
            a.albumId = s.songAlbum;"
            break;
        case "allSongs":
            query = "SELECT s.songId, s.songName, an.artistName, \
                IFNULL(a.albumName, 'NULL') AS albumName, gn.genreName \
                FROM Songs s \
                LEFT JOIN Albums a ON a.albumId = s.songAlbum \
                LEFT JOIN( \
                    SELECT sg.songId, g.genreName \
                    FROM SongsGenres sg \
                    INNER JOIN Genres g ON g.genreId = sg.genreId) gn \
                ON s.songId = gn.songId \
                LEFT JOIN( \
                    SELECT sar.songId, ar.artistName \
                    FROM SongsArtists sar \
                    INNER JOIN Artists ar ON ar.artistId = sar.artistId) an \
                ON s.songId = an.songId GROUP BY songId;"
            break;
        case "AllSongsByArtist":
            query = "SELECT s.songId, s.songName, arn.artistName, arn.artistId \
                FROM Songs s LEFT JOIN \
                (SELECT sar.songId, ar.artistName, ar.artistId FROM Artists ar \
                INNER JOIN SongsArtists sar ON sar.artistId = ar.artistId) \
                arn ON s.songId = arn.songId;"
            break;
        case "SongsByArtist":
            query = "SELECT s.songId, s.songName, arn.artistName, arn.artistId \
                FROM Songs s LEFT JOIN \
                (SELECT sar.songId, ar.artistName, ar.artistId FROM Artists ar \
                INNER JOIN SongsArtists sar ON sar.artistId = ar.artistId) \
                arn ON s.songId = arn.songId WHERE arn.artistId = ? ;"
            break;
        case "allSongsByAlbum":
            query = "SELECT s.songId, s.songName, a.albumName \
                FROM Songs s INNER JOIN Albums a ON \
                a.albumId = s.songAlbum \
                WHERE a.albumId = ? ;"
            break;
        case "allSongsByGenre":
            query = "SELECT s.songId, s.songName, gn.genreName \
                FROM Songs s \
                LEFT JOIN(SELECT sg.songId, g.genreName, g.genreId \
                FROM SongsGenres sg \
                INNER JOIN Genres g ON g.genreId = sg.genreId) gn \
                ON s.songId = gn.songId;"
            break;
        case "SongsByGenre":
            query = "SELECT s.songId, s.songName, an.artistName, \
                IFNULL(a.albumName, 'NULL') AS albumName, gn.genreName \
                FROM Songs s \
                LEFT JOIN Albums a ON a.albumId = s.songAlbum \
                LEFT JOIN(SELECT sg.songId, g.genreName, g.genreId \
                FROM SongsGenres sg \
                INNER JOIN Genres g ON g.genreId = sg.genreId) gn \
                ON s.songId = gn.songId \
                LEFT JOIN(SELECT sar.songId, ar.artistName \
                FROM SongsArtists sar INNER JOIN Artists ar ON \
                ar.artistId = sar.artistId) an ON s.songId = an.songId \
                WHERE gn.genreId = ? ;"
            break;
        case "addSong":
            query = "INSERT INTO Songs VALUE (NULL, ?, ?); \
                SET @songId = LAST_INSERT_ID(); \
                INSERT INTO SongsArtists VALUES (@songId, ?);"
            break;
        case "addSong1":
            query = "INSERT INTO Songs VALUE (NULL, ?, NULL); \
                SET @songId = LAST_INSERT_ID(); \
                INSERT INTO SongsArtists VALUES (@songId, ?);"
            break;
        case "addSongArtist":
            query = "INSERT INTO SongsArtists VALUES (?, ?);"
            break;
        case "addSongGenre":
            query = "INSERT INTO SongsGenres VALUES (?, ?);"
            break;
        }

    return query;
};

module.exports = Song;

