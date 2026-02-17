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
  generate_series (1, 1000);

INSERT INTO
  "group"
SELECT
  gen_random_uuid (),
  'Group ' || n,
  'The description of group 1'
FROM
  generate_series (1, 10) n;

-- Create 10-100 recipes per user with varied data
WITH recipe_data as (
  SELECT
    gen_random_uuid() as recipe_id,
    -- Varied recipe titles
    CASE (random() * 20)::int
      WHEN 0 THEN 'Grilled Salmon with Herbs'
      WHEN 1 THEN 'Classic Chicken Curry'
      WHEN 2 THEN 'Vegetarian Pasta Primavera'
      WHEN 3 THEN 'Beef Stir Fry with Vegetables'
      WHEN 4 THEN 'Mediterranean Quinoa Salad'
      WHEN 5 THEN 'Chocolate Chip Cookies'
      WHEN 6 THEN 'Thai Green Curry'
      WHEN 7 THEN 'Italian Margherita Pizza'
      WHEN 8 THEN 'French Onion Soup'
      WHEN 9 THEN 'Greek Moussaka'
      WHEN 10 THEN 'Japanese Teriyaki Chicken'
      WHEN 11 THEN 'Mexican Tacos al Pastor'
      WHEN 12 THEN 'Indian Butter Chicken'
      WHEN 13 THEN 'Chinese Sweet and Sour Pork'
      WHEN 14 THEN 'Spanish Paella Valenciana'
      WHEN 15 THEN 'American BBQ Ribs'
      WHEN 16 THEN 'Korean Kimchi Fried Rice'
      WHEN 17 THEN 'Brazilian Feijoada'
      WHEN 18 THEN 'Moroccan Tagine'
      ELSE 'Homemade Comfort Food'
    END as title,
    -- Varied descriptions
    CASE (random() * 10)::int
      WHEN 0 THEN 'A delicious and healthy recipe perfect for any occasion'
      WHEN 1 THEN 'Traditional family recipe passed down through generations'
      WHEN 2 THEN 'Quick and easy weeknight dinner solution'
      WHEN 3 THEN 'Gourmet restaurant-quality dish made at home'
      WHEN 4 THEN 'Comfort food that warms the heart and soul'
      WHEN 5 THEN 'Fresh ingredients combined in perfect harmony'
      WHEN 6 THEN 'Exotic flavors that transport you to distant lands'
      WHEN 7 THEN 'Simple yet elegant dish for special occasions'
      WHEN 8 THEN 'Nutritious and satisfying meal for the whole family'
      ELSE 'A wonderful culinary experience you will love'
    END as description,
    u.id as user_id,
    -- Varied ingredients
    CASE (random() * 15)::int
      WHEN 0 THEN '{"Salmon", "Olive Oil", "Herbs", "Lemon", "Garlic"}'
      WHEN 1 THEN '{"Chicken", "Onions", "Curry Powder", "Coconut Milk", "Rice"}'
      WHEN 2 THEN '{"Pasta", "Tomatoes", "Bell Peppers", "Zucchini", "Basil"}'
      WHEN 3 THEN '{"Beef", "Soy Sauce", "Broccoli", "Carrots", "Ginger"}'
      WHEN 4 THEN '{"Quinoa", "Cucumber", "Feta Cheese", "Olives", "Lemon"}'
      WHEN 5 THEN '{"Flour", "Butter", "Chocolate Chips", "Eggs", "Sugar"}'
      WHEN 6 THEN '{"Chicken", "Green Curry Paste", "Coconut Milk", "Basil"}'
      WHEN 7 THEN '{"Pizza Dough", "Mozzarella", "Tomato Sauce", "Basil"}'
      WHEN 8 THEN '{"Onions", "Beef Broth", "Gruyere Cheese", "Thyme"}'
      WHEN 9 THEN '{"Eggplant", "Ground Lamb", "Bechamel Sauce", "Cheese"}'
      WHEN 10 THEN '{"Chicken", "Teriyaki Sauce", "Rice", "Vegetables"}'
      WHEN 11 THEN '{"Pork", "Pineapple", "Tortillas", "Cilantro", "Lime"}'
      WHEN 12 THEN '{"Chicken", "Butter", "Tomatoes", "Cream", "Spices"}'
      WHEN 13 THEN '{"Pork", "Pineapple", "Sweet and Sour Sauce", "Rice"}'
      ELSE '{"Mixed Vegetables", "Olive Oil", "Herbs", "Garlic", "Salt"}'
    END::text[] as ingredients
  FROM
    "user" u
  CROSS JOIN
    -- Generate random number of recipes between 10 and 100 per user
    generate_series(1, (10 + random() * 90)::int) recipe_num
)
INSERT INTO "recipe" (id, title, description, user_id, ingredients)
SELECT recipe_id, title, description, user_id, ingredients FROM recipe_data;

-- Query to verify recipe distribution per user
-- This will show you how many recipes each user has (should be between 10-100)
-- Uncomment the following lines to check the distribution after running the script:
/*
SELECT
  COUNT(*) as recipe_count,
  COUNT(DISTINCT user_id) as users_with_this_count
FROM "recipe"
GROUP BY user_id
ORDER BY recipe_count;

-- Summary statistics
SELECT
  MIN(recipe_count) as min_recipes,
  MAX(recipe_count) as max_recipes,
  AVG(recipe_count)::int as avg_recipes,
  COUNT(*) as total_users
FROM (
  SELECT user_id, COUNT(*) as recipe_count
  FROM "recipe"
  GROUP BY user_id
) user_recipe_counts;
*/
