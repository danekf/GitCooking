INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment_dependencies, instructions, recipe_photos, tags, forks)
VALUES(
  1,
  null,
  'Pasta',
  '[{
    "pasta": "1 handful",
    "pesto": "3TBsp",
    "salt": "Enough, not too little"
  }]',
  '[{"pot": 1}]',
  '[
    {
      "estimated time": 1, 
      "instruction": "Add salt to water so that water tastes distinctly salted, This is to flavour the pasta, NOT to make the water boil faster. It is essential to tasty pasta."
    },
    {
      "estimated time": 5,
       "instruction": "Boil water"
    },
    {
      "estimated time": 7,
      "instruction": "Cook the pasta in the water"
    },
    {
      "estimated time": 2,
      "instruction": "Drain Pasta and add pesto."
    },
    {
      "estimated time": 1,
      "instruction": "Serve."
    }
  ]',
  'No Photos yet',
  ARRAY ['Pasta', 'Simple', 'Quick', 'Easy', 'Budget'],
  ARRAY [2]
);


--fork of recipe 1, which changed pesto for tomato sauce and added meatballs.
INSERT INTO recipes (user_id, original_fork_id, title, ingredients, equipment_dependencies, instructions,recipe_photos, tags, forks)
VALUES(
  1,
  1, --forked from 1, so id of 1 referencing the original fork id. Client will provide number when needed and handle logic to reference it.
  'Pasta with meatballs',
  '[{
    "pasta": "1 handful",
    "Tomato Sauce": "3TBsp",
    "salt": "Enough, not too little",
    "Meatballs": 5
  }]',
  '[{"pot": 1}]',
  '[
    {
      "estimated time": 1,
      "instruction": "Add salt to water so that water tastes distinctly salted, This is to flavour the pasta, NOT to make the water boil faster. It is essential to tasty pasta."
    },
    {
      "estimated time": 5,
      "instruction": "Boil water"
    },
    {
      "estimated time": 7,
      "instruction": "Cook the pasta in the water"
      },
    {
      "estimated time": 7,
      "instruction": "While pasta is cooking, heat up pasta sauce and add in meatballs to heat through."
    },
    {
      "estimated time": 2,
      "instruction": "Drain Pasta and add sauce + meatballs."
    },
    {
      "estimated time": 1,
      "instruction": "Serve."
    }
  ]',
  'No Photos yet',
  ARRAY ['Pasta', 'Simple', 'Quick', 'Easy', 'Budget', 'Meatballs', 'Tomato Sauce'],
  ARRAY [2]
);