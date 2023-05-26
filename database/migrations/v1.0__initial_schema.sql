CREATE TABLE USER (
    id INT PRIMARY KEY,
    first_name TEXT,
    second_name TEXT,
    password TEXT
);

CREATE TABLE PREDICTION (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES USER(id)
);

CREATE TABLE REVIEW (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES USER(id)
);

CREATE TABLE MATCH (
    id INT PRIMARY KEY,
    competition_id INT,
    FOREIGN KEY (competition_id) REFERENCES COMPETITION(id)
);

CREATE TABLE MATCH_TEAM (
    id INT PRIMARY KEY,
    match_id INT,
    team_id INT,
    FOREIGN KEY (match_id) REFERENCES MATCH(id),
    FOREIGN KEY (team_id) REFERENCES TEAM(id)
);

CREATE TABLE TEAM (
    id INT PRIMARY KEY,
    stadium_id INT,
    FOREIGN KEY (stadium_id) REFERENCES STADIUM(id)
);

CREATE TABLE STADIUM (
    id INT PRIMARY KEY
);

CREATE TABLE MATCH_REVIEWS (
    id INT PRIMARY KEY,
    match_id INT,
    review_id INT,
    FOREIGN KEY (match_id) REFERENCES  MATCH(id),
    FOREIGN KEY (review_id) REFERENCES REVIEW(id)
);

CREATE TABLE MATCH_PREDICTIONS (
    id INT PRIMARY KEY,
    match_id INT,
    prediction_id INT,
    FOREIGN KEY (match_id) REFERENCES MATCH(id),
    FOREIGN KEY (prediction_id) REFERENCES PREDICTION(id)
);
