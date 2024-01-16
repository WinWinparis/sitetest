const express = require('express');
const knex = require('knex');

const app = express();

const conn = knex({
  client: 'mysql',
  host: 'localhost',
  database: 'my_database',
  user: 'my_user',
  password: 'my_password',
});

app.post('/ajouter-pro', async (req, res) => {
  const { companyName, email, zipcode, passwordDigest, country, shopAddress, shopLocation } = req.body;

  // Vérifiez que les données du formulaire sont valides

  if (!companyName) {
    return res.status(400).json({ message: 'Le nom de l\'entreprise est requis.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'L\'adresse e-mail est requise.' });
  }

  if (!zipcode) {
    return res.status(400).json({ message: 'Le code postal est requis.' });
  }

  if (!passwordDigest) {
    return res.status(400).json({ message: 'La concentration de mot de passe est requise.' });
  }

  if (!country) {
    return res.status(400).json({ message: 'Le pays est requis.' });
  }

  if (!shopAddress) {
    return res.status(400).json({ message: 'L\'adresse de la boutique est requise.' });
  }

  if (!shopLocation) {
    return res.status(400).json({ message: 'L\'emplacement de la boutique est requis.' });
  }

  // Insérez le nouveau pro dans la table "pros"

  const pro = await conn.transaction(async (trx) => {
    return trx.insert('pros', {
      id: knex.raw('uuid_generate_v4()'),
      companyName,
      email,
      zipcode,
      passwordDigest,
      country,
      shopAddress,
      shopLocation,
    });
  });

  // Retournez un message de succès

  res.status(200).json({ message: 'Le pro a été ajouté avec succès.' });
});

app.listen(3000);
