DROP TABLE IF EXISTS image_files CASCADE;

CREATE TABLE image_files(
    id SERIAL NOT NULL PRIMARY KEY,
    filename TEXT UNIQUE NOT NULL,
    filepath TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    size BIGINT NOT NULL,
);