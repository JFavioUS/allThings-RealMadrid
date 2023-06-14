CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL CONSTRAINT users_pk PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    admin BOOLEAN,
    email TEXT UNIQUE NOT NULL,
    password TEXT
);

CREATE TABLE IF NOT EXISTS public.predictions (
    id SERIAL CONSTRAINT prediction_pk PRIMARY KEY,
    away_goals INT,
    home_goals INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id SERIAL CONSTRAINT reviews_pk PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS public.competitions (
    id SERIAL CONSTRAINT competitions_pk PRIMARY KEY,
    name TEXT,
    scope TEXT
);

CREATE TABLE IF NOT EXISTS public.stadiums (
    id SERIAL CONSTRAINT stadiums_pk PRIMARY KEY,
    name TEXT,
    city TEXT,
    country TEXT
);

CREATE TABLE IF NOT EXISTS public.teams (
    id SERIAL CONSTRAINT teams_pk PRIMARY KEY,
    name TEXT,
    city TEXT,
    stadium_id INT,
    FOREIGN KEY (stadium_id) REFERENCES stadiums(id)
);


CREATE TABLE IF NOT EXISTS public.matches (
    id SERIAL CONSTRAINT matches_pk PRIMARY KEY,
    stadium_id INT,
    away_team_id INT,
    home_team_id INT,
    competition_id INT,
    FOREIGN KEY (competition_id) REFERENCES competitions(id),
    FOREIGN KEY (stadium_id) REFERENCES stadiums(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id),
    FOREIGN KEY (home_team_id) REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS public.match_reviews (
    id SERIAL CONSTRAINT match_reviews_pk PRIMARY KEY,
    match_id INT,
    review_id INT,
    FOREIGN KEY (match_id) REFERENCES  matches(id),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE IF NOT EXISTS public.match_predictions (
    id SERIAL CONSTRAINT match_predictions_pk PRIMARY KEY,
    match_id INT,
    prediction_id INT,
    created_date TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_date TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (prediction_id) REFERENCES predictions(id)
);
