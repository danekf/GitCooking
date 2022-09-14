INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  1,
  0,
  'Pasta',
  '[
    { 
      "ingredientName":"pasta", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"TBsp pesto", 
      "ingredientQty":"3" 
    },
    {
      "ingredientName":"tbsp salt", 
      "ingredientQty":"1"
    }
  ]',
  '[{"equipmentName": "Pot", "equipmentQty": "1"}]',
  '[
    {
      "estimatedTime": 1, 
      "instruction": "Add salt to water so that water tastes distinctly salted, This is to flavour the pasta, NOT to make the water boil faster. It is essential to tasty pasta."
    },
    {
      "estimatedTime": 5,
       "instruction": "Boil water"
    },
    {
      "estimatedTime": 7,
      "instruction": "Cook the pasta in the water"
    },
    {
      "estimatedTime": 2,
      "instruction": "Drain Pasta and add pesto."
    },
    {
      "estimatedTime": 1,
      "instruction": "Serve."
    }
  ]',
  16,
  '/recipePhotos/Default.jpg',
  ARRAY ['Pasta', 'Simple', 'Quick', 'Easy', 'Budget', 'top', 'vegetarian'],
  4,
  ARRAY [2]
);


--fork of recipe 1, which changed pesto for tomato sauce and added meatballs.
INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  1,
  1, --forked from 1, so id of 1 referencing the original fork id. Client will provide number when needed and handle logic to reference it.
  'Pasta with meatballs',
  '[
    {
      "ingredientName":"handful pasta",
     "ingredientQty":"1 "
    },
    {
      "ingredientName":"TBsppesto",
      "ingredientQty":"3"
    },
    {
      "ingredientName":"TBsp salt", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"Meatballs",
      "ingredientQty":"5"
    }
  ]',
  '[{"equipmentName": "Pot", "equipmentQty": "1"}]',
  '[
    {
      "estimatedTime": 1,
      "instruction": "Add salt to water so that water tastes distinctly salted, This is to flavour the pasta, NOT to make the water boil faster. It is essential to tasty pasta."
    },
    {
      "estimatedTime": 5,
      "instruction": "Boil water"
    },
    {
      "estimatedTime": 7,
      "instruction": "Cook the pasta in the water"
      },
    {
      "estimatedTime": 7,
      "instruction": "While pasta is cooking, heat up pasta sauce and add in meatballs to heat through."
    },
    {
      "estimatedTime": 2,
      "instruction": "Drain Pasta and add sauce + meatballs."
    },
    {
      "estimatedTime": 1,
      "instruction": "Serve."
    }
  ]',
  23,
  '/recipePhotos/Default.jpg',
  ARRAY ['Pasta', 'Simple', 'Quick', 'Easy', 'Budget', 'Meatballs', 'Tomato Sauce', 'top', 'meat'],
  4,
  null
);

INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  2,
  0,
  'Water',
  '[
    {
      "ingredientName":"water", 
      "ingredientQty":"1"
    }    
  ]',
  '[{"equipmentName": "Cup", "equipmentQty": "1"}]',
  '[
    {
      "estimatedTime": 1, 
      "instruction": "Add water to cup"
    }
  ]',
  1,
  '/recipePhotos/Default.jpg',
  ARRAY ['water', 'top'],
  1,
  null
);

INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  2,
  0,
  'Water++',
  '[
    {
      "ingredientName":"water", 
      "ingredientQty":"2"
    }    
  ]',
  '[{"equipmentName": "Cup", "equipmentQty": "2"}]',
  '[
    {
      "estimatedTime": 1, 
      "instruction": "Add water to cup"
    }
  ]',
  1,
  '/recipePhotos/Default.jpg',
  ARRAY ['water'],
  2,
  null
);

-- INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
-- VALUES(
--   3,
--   0,
--   'Green Onion Pancake',
--   '[
--     { 
--       "ingredientName":"cups all-purpose flour", 
--       "ingredientQty":"2"
--     },
--     {
--       "ingredientName":"cup hot water", 
--       "ingredientQty":"1" 
--     },
--     {
--       "ingredientName":"tsp salt", 
--       "ingredientQty":"1"
--     },
--     { 
--       "ingredientName":"green onion stalks", 
--       "ingredientQty":"5"
--     },
--     {
--       "ingredientName":"tbsp vegetable oil", 
--       "ingredientQty":"3" 
--     },
--     {
--       "ingredientName":"pinch flakey salt", 
--       "ingredientQty":"1"
--     }
--   ]',
--   '[
--     {
--       "equipmentName": "rolling pin", 
--       "equipmentQty": "1"
--     },
--     { 
--       "equipmentName": "pan", 
--       "equipmentQty": "1"
--     },
--   ]',
--   '[
--     {
--       "estimatedTime": 1, 
--       "instruction": "Chop onions."
--     },
--     {
--       "estimatedTime": 5,
--        "instruction": "Mix water, flour and salt together and knead dough until smooth."
--     },
--     {
--       "estimatedTime": 30,
--       "instruction": "Let the dough rest."
--     },
--     {
--       "estimatedTime": 10,
--       "instruction": "Cut the dough into 3 equal pieces and thinly roll out. Spread green onions on dough and roll up. Roll flat to create flakey layers."
--     },
--     {
--       "estimatedTime": 5,
--       "instruction": "Pan fry in vegetable oil until golden brown."
--     }
--   ]',
--   51,
--   '/recipePhotos/GreenOnionPancake.jpg',
--   ARRAY ['Chinese', 'Simple', 'Quick', 'Easy', 'Budget', 'top', 'vegetarian'],
--   3,
--   null
-- );

INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  3,
  0,
  'Ginger Garlic Shrimp',
  '[
    { 
      "ingredientName":"pound of shrimp", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"cloves garlic", 
      "ingredientQty":"3" 
    },
    {
      "ingredientName":"thumb ginger", 
      "ingredientQty":"1"
    },
    { 
      "ingredientName":"cups of water", 
      "ingredientQty":"4"
    },
    {
      "ingredientName":"green onions", 
      "ingredientQty":"3" 
    },
    {
      "ingredientName":"chiles", 
      "ingredientQty":"2"
    },
    {
      "ingredientName":"Tbsp soy sauce", 
      "ingredientQty":"2"
    },
    { 
      "ingredientName":"Tbsp black vinegar", 
      "ingredientQty":"2"
    },
    {
      "ingredientName":"Tbsp sesame oil", 
      "ingredientQty":"3" 
    },
    {
      "ingredientName":"bunch of cilantro", 
      "ingredientQty":"1"
    }
  ]',
  '[{"equipmentName": "Pot", "equipmentQty": "1"}]',
  '[
    {
      "estimatedTime": 10, 
      "instruction": "Add salt to water in pot and bring to a boil. Once boiling add the shrimp."
    },
    {
      "estimatedTime": 5,
       "instruction": "Chop all herbs and aromatics."
    },
    {
      "estimatedTime": 3,
      "instruction": "Heat sesame oil in small pan until glistening then pour over armomatics"
    },
    {
      "estimatedTime": 2,
      "instruction": "Remove cooked shrimp from pot and add to sesame oil and aromatics."
    },
    {
      "estimatedTime": 1,
      "instruction": "Serve with rice."
    }
  ]',
  21,
  '/recipePhotos/GingerGarlicShrimp.jpg',
  ARRAY ['Shrimp', 'Simple', 'Quick', 'Easy', 'top', 'meat'],
  4,
  null
);

INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  3,
  0,
  'Mango Sticky Rice',
  '[
    { 
      "ingredientName":"bag of sticky rice", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"cans of coconut cream", 
      "ingredientQty":"2" 
    },
    {
      "ingredientName":"cup of sugar", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"tsp of salt", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"mangos", 
      "ingredientQty":"2"
    }
  ]',
  '[{"equipmentName": "Pot", "equipmentQty": "1"},
    {"equipmentName": "Steamer", "equipmentQty": "1"}]',
  '[
    {
      "estimatedTime": 15, 
      "instruction": "Steam sticky rice until tender."
    },
    {
      "estimatedTime": 5,
       "instruction": "Heat coconut cream and sugar in a pot until boiling."
    },
    {
      "estimatedTime": 3,
      "instruction": "Mix steamed rice with coconut cream. Keep leftover cream."
    },
    {
      "estimatedTime": 2,
      "instruction": "Chop mango."
    },
    {
      "estimatedTime": 1,
      "instruction": "Serve sticky rice with mango and top with leftover cream."
    }
  ]',
  26,
  '/recipePhotos/MangoStickyRice.jpg',
  ARRAY ['Dessert', 'Simple', 'Quick', 'Easy', 'Thai', 'top', 'vegetarian'],
  4,
  null
);

INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  5,
  0,
  'Tang Hulu',
  '[
    { 
      "ingredientName":"cups of sugar", 
      "ingredientQty":"2"
    },
    {
      "ingredientName":"cup of water", 
      "ingredientQty":"1" 
    },
    {
      "ingredientName":"pound of fruit, strawberries or your favourite", 
      "ingredientQty":"1"
    }
  ]',
  '[{"equipmentName": "Pot", "equipmentQty": "1"},
    {"equipmentName": "Skewers", "equipmentQty": "10"}]',
  '[
    {
      "estimatedTime": 10, 
      "instruction": "Add water and sugar to pot and bring to a boil until it reaches 300 Fahrenheit"
    },
    {
      "estimatedTime": 5,
       "instruction": "Wash fruit and carefully add to skewers."
    },
    {
      "estimatedTime": 4,
      "instruction": "Dip fruit in sugar to coat. Set to the side to cool. Be careful, it is hot!!!"
    },
    {
      "estimatedTime": 1,
      "instruction": "Enjoy this sweet treat!"
    }
  ]',
  20,
  '/recipePhotos/TangHulu.jpg',
  ARRAY ['Dessert', 'Simple', 'Quick', 'Easy', 'Fruit', 'top', 'vegetarian'],
  4,
  null
);

INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  5,
  0,
  'Chinese Donuts',
  '[
    { 
      "ingredientName":"Tbsp baking powder", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"tsp salt", 
      "ingredientQty":"1" 
    },
    {
      "ingredientName":"Tbsp oil", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"egg", 
      "ingredientQty":"1" 
    },
    {
      "ingredientName":"cup of water", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"cups of flour", 
      "ingredientQty":"3"
    }
  ]',
  '[{"equipmentName": "Bowl", "equipmentQty": "1"},
    {"equipmentName": "Pan", "equipmentQty": "1"}]',
  '[
    {
      "estimatedTime": 3, 
      "instruction": "Carefully whisk together all dry ingredients"
    },
    {
      "estimatedTime": 2,
       "instruction": "Mix egg and water."
    },
    {
      "estimatedTime": 3,
      "instruction": "Mix together wet and dry ingredients. Knead thoroughly."
    },
    {
      "estimatedTime": 30,
      "instruction": "Allow dough to rise."
    },
    {
      "estimatedTime": 5,
       "instruction": "Cut dough into strips and pull length wise."
    },
    {
      "estimatedTime": 5,
      "instruction": "Shallow fry in pan until golden brown."
    },
    {
      "estimatedTime": 1,
      "instruction": "Enjoy this sweet treat!"
    }
  ]',
  49,
  '/recipePhotos/ChineseDonut.jpg',
  ARRAY ['Dessert', 'Chinese', 'Donut', 'top', 'vegetarian'],
  4,
  null
);

INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment, instructions, estimatedTime, recipe_photos, tags, servings, forks)
VALUES(
  4,
  0,
  'Mapo Tofu',
  '[
    { 
      "ingredientName":"half cupt of oil", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"chiles", 
      "ingredientQty":"2" 
    },
    {
      "ingredientName":"dried chiles", 
      "ingredientQty":"6"
    },
    {
      "ingredientName":"Tbsp of grated ginger", 
      "ingredientQty":"3" 
    },
    {
      "ingredientName":"Tbsp of minced garlic", 
      "ingredientQty":"3"
    },
    {
      "ingredientName":"ounces of minced pork", 
      "ingredientQty":"8"
    },
        {
      "ingredientName":"Tbsp spicy bean sauce", 
      "ingredientQty":"2"
    },
    {
      "ingredientName":"tsp sesame oil", 
      "ingredientQty":"1" 
    },
    {
      "ingredientName":"cup of chicken stock", 
      "ingredientQty":"1"
    },
    {
      "ingredientName":"scallion", 
      "ingredientQty":"1"
    }
  ]',
  '[{"equipmentName": "Wok", "equipmentQty": "1"}]',
  '[
    {
      "estimatedTime": 5, 
      "instruction": "Heat 1/2 cup of oil and chiles in wok (add sichuan peppercorns for a kick). Remove when fragrant."
    },
    {
      "estimatedTime": 8,
       "instruction": "In remaining oil heat up garlic and ginger until frgrant. Add pork and cook thoroughly."
    },
    {
      "estimatedTime": 5,
      "instruction": "Add chili oil to wok. Along with spicy bean sauce and chicken stock. Simmer for 3 minutes"
    },
    {
      "estimatedTime": 2,
      "instruction": "Combine conrstarch and water to thicken the sauce."
    },
    {
      "estimatedTime": 5,
       "instruction": "Carefully add in cubed tofu, sesame oil and sugar to taste."
    },
    {
      "estimatedTime": 1,
      "instruction": "Serve with chopped scallions on top."
    }
  ]',
  26,
  '/recipePhotos/Mapotofu.jpg',
  ARRAY ['Quick', 'Chinese', 'Easy', 'top', 'meat', 'Spicy'],
  4,
  null
);