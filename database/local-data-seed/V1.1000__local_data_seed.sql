INSERT INTO public.users (username, email, password, admin) VALUES ('faviosauto', 'faviosauto@gmail.com', 'password', true);

INSERT INTO public.stadiums (name, city, country) VALUES
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

INSERT INTO public.teams (name, city, stadium_id) VALUES
( 'Athletic Club', 'Vizcaya', 1 ),
( 'Atlético de Madrid', 'Madrid', 2 ),
( 'Barcelona', 'Barcelona', 3 ),
( 'Girona', 'Gerona', 4 ),
( 'Granada', 'Granada', 5 ),
( 'Las Palmas', 'Las Palmas de Gran Canaria', 6 ),
( 'Mallorca', 'Islas baleares', 7 ),
( 'Osasuna', 'Navarra', 8 ),
( 'Rayo Vallecano', 'Madrid', 9 ),
( 'Real Betis', 'Sevilla', 10 ),
( 'Real Madrid', 'Madrid', 11 ),
( 'Real Sociedad', 'Guipúzcua', 12 ),
( 'Sevilla', 'Sevilla', 13 ),
( 'Villareal', 'Castellón', 14);

INSERT INTO public.competitions (name, scope) VALUES
( 'LaLiga Santander', 'Spain' ),
( 'UEFA Champions League', 'Europe' );

INSERT INTO public.predictions (user_id, away_goals, home_goals) VALUES
( 1, 2, 1 );

INSERT INTO public.matches (competition_id, stadium_id, away_team_id, home_team_id) VALUES
( 1, 11, 1, 11 );

INSERT INTO public.match_predictions (match_id, prediction_id) VALUES
( 1, 1 );
