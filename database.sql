CREATE DATABASE yogadb;


DROP TABLE IF EXISTS yoga;

DROP TABLE IF EXISTS batch1;
DROP TABLE IF EXISTS batch2;
DROP TABLE IF EXISTS batch3;
DROP TABLE IF EXISTS batch4;

CREATE TABLE yoga(
    yoga_id SERIAL,
    batch VARCHAR(255),
    dob  DATE,
    email VARCHAR(255),
    gender VARCHAR(10),
    name VARCHAR(255),
    status VARCHAR(255),
    number BIGINT UNIQUE,
    date_of_joining DATE  DEFAULT NOW(),
    date_of_expiry DATE  DEFAULT (NOW() + INTERVAL '30 days'),
    PRIMARY KEY(email)
);


CREATE TABLE batch1(
    batch_id  SERIAL PRIMARY KEY,
    batch VARCHAR(255),
    email VARCHAR(255),  
    gender VARCHAR(10),
    name VARCHAR(255),
    status VARCHAR(255),
    number BIGINT UNIQUE,
    date_of_joining DATE  DEFAULT NOW(),
    date_of_expiry DATE  DEFAULT (NOW() + INTERVAL '30 days'),
    FOREIGN KEY (email) REFERENCES yoga(email)
);

CREATE TABLE batch2(
    batch_id  SERIAL PRIMARY KEY,
    batch VARCHAR(255),
    email VARCHAR(255),
    gender VARCHAR(10),
    name VARCHAR(255),
    status VARCHAR(255),
    number BIGINT UNIQUE,
    date_of_joining DATE  DEFAULT NOW(),
    date_of_expiry DATE  DEFAULT (NOW() + INTERVAL '30 days'),
    FOREIGN KEY (email) REFERENCES yoga(email)
);



CREATE TABLE batch3(
    batch_id  SERIAL PRIMARY KEY,
    batch VARCHAR(255),
    email VARCHAR(255),
    gender VARCHAR(10),
    name VARCHAR(255),
    status VARCHAR(255),
    number BIGINT UNIQUE,
    date_of_joining DATE  DEFAULT NOW(),
    date_of_expiry DATE  DEFAULT (NOW() + INTERVAL '30 days'),
    FOREIGN KEY (email) REFERENCES yoga(email)
);



CREATE TABLE batch4(
    batch_id  SERIAL PRIMARY KEY,
    batch VARCHAR(255),
    email VARCHAR(255),
    gender VARCHAR(10),
    name VARCHAR(255),
    status VARCHAR(255),
    number BIGINT UNIQUE,
    date_of_joining DATE  DEFAULT NOW(),
    date_of_expiry DATE  DEFAULT (NOW() + INTERVAL '30 days'),
    FOREIGN KEY (email) REFERENCES yoga(email)
);