INSERT INTO users (first_name, last_name, email, username, password_hash, bio, contact_email, social_URLS, badges, qualifications, login_method ) 
VALUES 
('Alice', 
'Kingsleigh',
'alice@wonderland.ca',
'HeartChef',
'$2a$10$wkx0GNQ9p3yBz0psMlV/vuIRT6UFUL2bWbqyQ1caUZNicqXu24Mae',
'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversation?"',
'alice@chefland.com',
ARRAY ['Facebook','Insta','Tokker'],
ARRAY ['First user', 'Megachef', 'Potato Lover'],
ARRAY ['Master Chef', 'Royal Acedemy Graduate'],
'GitCooking Login'
);