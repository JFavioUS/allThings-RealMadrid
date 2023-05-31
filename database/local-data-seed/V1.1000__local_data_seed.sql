INSERT INTO user ( username, email, password, admin) VALUES
( 'faviosauto', 'faviosauto@gmail.com', 'password', TRUE );

INSERT INTO team (short_name, localCity, country, stadium_id) VALUES
( 'Athletic Club', 'Vizcaya', 'Spain', 1 ),
( 'Atlético de Madrid', 'Madrid', 'Spain', 2 ),
( 'Barcelona', 'Barcelona', 'Spain', 3 ),
( 'Girona', 'Gerona', 'Spain', 4 ),
( 'Granada', 'Granada', 'Spain', 5 ),
( 'Las Palmas', 'Las Palmas de Gran Canaria', 'Spain', 6 ),
( 'Mallorca', 'Islas baleares', 'Spain', 7 ),
( 'Osasuna', 'Navarra', 'Spain', 8 ),
( 'Rayo Vallecano', 'Madrid', 'Spain', 9 ),
( 'Real Betis', 'Sevilla', 'Spain', 10 ),
( 'Real Madrid', 'Madrid', 'Spain', 11 ),
( 'Real Sociedad', 'Guipúzcua', 'Spain', 12 ),
( 'Sevilla', 'Sevilla', 'Spain', 13 ),
( 'Villareal', 'Castellón', 'Spain', 14 );

INSERT INTO stadium (name, city, country) VALUES
( 'San Mamés', 'Vizcaya', 'Spain' ),
( 'Cívitas Metropolitano', 'Madrid', 'Spain' ),
( 'Spotify Camp Nou', 'Barcelona', 'Spain' ),
( 'Municipal de Montilivi', 'Gerona', 'Spain' ),
( 'Nuevo Estado de Los Cármenes', 'Granada', 'Spain' ),
( 'Estadio de Gran Canaria', 'Las Palmas de Gran Canaria', 'Spain' ),
( 'Estadio Mallorca Son Moix', 'Islas Baleares', 'Spain' ),
( 'El Sadar', 'Navarra', 'Spain' ),
( 'Estadio de Vallecas', 'Madrid', 'Spain' ),
( 'Benito Villamarín', 'Sevilla', 'Spain' ),
( 'Santiago Bernabéu', 'Madrid', 'Spain' ),
( 'Reale Arena', 'Guipúzcua', 'Spain' ),
( 'Ramón Sánchez-Pizjuán', 'Sevilla', 'Spain' ),
( 'Estadio de la Cerámica', 'Castellón', 'Spain' );

INSERT INTO competition (name, scope) VALUES
( 'LaLiga Santander', 'Spain' ),
( 'UEFA Champions League', 'Europe' );

INSERT INTO prediction (user_id, away_goals, home_goals) VALUES
( 1, 2, 1 );

INSERT INTO match (competition_id, stadium_id, away_team_id, home_team_id) VALUES
( 1, 11, 1, 11 );

INSERT INTO match_predictions (match_id, prediction_id) VALUES
( 1, 1 );

