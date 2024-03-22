CREATE TABLE IF NOT EXISTS users
(
    username varchar(20) NOT NULL,
    password varchar(20) NOT NULL,
    CONSTRAINT users_pk
        PRIMARY KEY (username)
);

INSERT INTO users (username, password) VALUES (lain, lain);