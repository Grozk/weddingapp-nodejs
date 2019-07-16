DROP TABLE IF EXISTS WEDDING;
DROP TABLE IF EXISTS MESSAGE;

    CREATE TABLE IF NOT EXISTS WEDDING (
    wedding_id SERIAL PRIMARY KEY,
    partner1 VARCHAR(50) NOT NULL,
    partner2 VARCHAR(50) NOT NULL,
    number1 VARCHAR(20) NULL,
    number2 VARCHAR(20) NULL,
    wedding_date DATE NOT NULL,
    id_public VARCHAR(10) NOT NULL,
    mail_creator VARCHAR(30)
    );

CREATE INDEX id_public_index ON WEDDING(id_public);

CREATE TABLE IF NOT EXISTS MESSAGE (
message_id SERIAL PRIMARY KEY,
wedding_id INT NOT NULL REFERENCES WEDDING(wedding_id),
message VARCHAR(300) NOT NULL,
image VARCHAR(300) NULL,
number_sender VARCHAR(20) NOT NULL,
name_sender VARCHAR(30) NOT NULL,
message_sent boolean DEFAULT false
);