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
  'No Photos yet',
  ARRAY ['Pasta', 'Simple', 'Quick', 'Easy', 'Budget'],
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
  'No Photos yet',
  ARRAY ['Pasta', 'Simple', 'Quick', 'Easy', 'Budget', 'Meatballs', 'Tomato Sauce'],
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
  'No Photos yet',
  ARRAY ['water'],
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
  'No Photos yet',
  ARRAY ['water'],
  2,
  null
);