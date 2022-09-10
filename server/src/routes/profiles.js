const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = (db) => {
  router.post('/update', (req, res) => {
    const {
      first_name,
      last_name,
      profile_picture,
      bio,
      contact_email,
      facebook,
      instagram,
      tiktok,
      youtube,
      twitter,
      linkedin,
    } = req.body;
    const userId = req.session.userId;

    // Black magic to make it work with pg, more greyish white magic actually.
    const qualifications = JSON.stringify(req.body.qualifications);

    // Search string
    const queryString = `
    UPDATE users
    SET 
    first_name = $1,
    last_name = $2,
    profile_picture = $3,
    bio = $4,
    contact_email = $5,
    facebook = $6,
    instagram = $7,
    tiktok = $8,
    youtube = $9,
    twitter = $10,
    linkedin = $11,
    qualifications = $12

    WHERE id = $13
    `;

    const queryValues = [
      `${first_name}`,
      `${last_name}`,
      `${profile_picture}`,
      `${bio}`,
      `${contact_email}`,
      `${facebook}`,
      `${instagram}`,
      `${tiktok}`,
      `${youtube}`,
      `${twitter}`,
      `${linkedin}`,
      `${qualifications}`,
      `${userId}`,
    ];

    db.query(queryString, queryValues)
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((error) => console.log(error));
  });

  return router;
};
