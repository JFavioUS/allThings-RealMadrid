CREATE TABLE user (
    id INT PRIMARY KEY,
    username TEXT,
    admin BOOLEAN,
    email TEXT,
    password TEXT
);

CREATE TABLE prediction (
    id INT PRIMARY KEY,
    away_goals INT,
    home_goals INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE review (
    id INT PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE competition (
    id INT PRIMARY KEY,
    name TEXT,
    scope TEXT
)

CREATE TABLE match (
    id INT PRIMARY KEY,
    stadium_id INT,
    away_team_id INT,
    home_team_id INT,
    competition_id INT,
    FOREIGN KEY (competition_id) REFERENCES competition(id)
    FOREIGN KEY (stadium_id) REFERENCES stadium(id),
    FOREIGN KEY (away_team_id) REFERENCES team(id),
    FOREIGN KEY (home_team_id) REFERENCES team(id)
);

CREATE TABLE team (
    id INT PRIMARY KEY,
    short_name TEXT,
    localCity TEXT,
    stadium_id INT,
    FOREIGN KEY (stadium_id) REFERENCES stadium(id)
);

CREATE TABLE stadium (
    id INT PRIMARY KEY,
    name TEXT,
    city TEXT,
    country TEXT
);

CREATE TABLE match_reviews (
    id INT PRIMARY KEY,
    match_id INT,
    review_id INT,
    FOREIGN KEY (match_id) REFERENCES  match(id),
    FOREIGN KEY (review_id) REFERENCES review(id)
);

CREATE TABLE match_predictions (
    id INT PRIMARY KEY,
    match_id INT,
    prediction_id INT,
    FOREIGN KEY (match_id) REFERENCES match(id),
    FOREIGN KEY (prediction_id) REFERENCES prediction(id)
);
