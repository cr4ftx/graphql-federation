CREATE TABLE "user" (id UUID, first_name TEXT, last_name TEXT);

CREATE TABLE "group" (id UUID, name TEXT, description TEXT);

CREATE TABLE "recipe" (
  id UUID,
  title TEXT,
  description TEXT,
  user_id TEXT,
  ingredients TEXT[]
);

INSERT INTO
  "user"
SELECT
  gen_random_uuid (),
  'John',
  'Doe'
FROM
  generate_series (1, 10);

INSERT INTO
  "recipe"
SELECT
  gen_random_uuid (),
  'My recipe',
  'A description of my recipe',
  "user".id,
  '{"Salmon", "Bread"}'
FROM
  "user";
