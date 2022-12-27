// Créez une base de données pour stocker les informations des utilisateurs, comme leurs noms d'utilisateur, leurs mots de passe et leurs todo lists. 
// Assurez-vous de crypter les mots de passe pour protéger la sécurité de vos utilisateurs.

const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

// Connect to the database
MongoClient.connect('mongodb://localhost:27017/todolist', (error, client) => {
  if (error) throw error;

  const db = client.db('todolist');

  // Create a salt for the password hash
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash the password using the salt
  const password = 'password';
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');

  // Insert the username and password hash into the database
  db.collection('users').insertOne({
    username: 'username',
    password: hash,
    salt: salt,
  }, (error, result) => {
    if (error) throw error;
    console.log(`Successfully inserted user into the database`);
  });

  client.close();
});

// Créez une page de connexion qui permet aux utilisateurs de saisir leur nom d'utilisateur et leur mot de passe pour se connecter. 
// Vérifiez que le nom d'utilisateur et le mot de passe saisis correspondent à ceux stockés dans la base de données. 
// Si c'est le cas, connectez l'utilisateur et redirigez le vers sa page de Todo List personnelle. 

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const session = require('express-session');

const app = express();

// Use express-session to store the user's session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Connect to the database
MongoClient.connect('mongodb://localhost:27017/todolist', (error, client) => {
  if (error) throw error;

  const db = client.db('todolist');

  // Handle the login form submission
  app.post('/login', (req, res) => {
    // Get the username and password from the request body
    const username = req.body.username;
    const password = req.body.password;

    // Find the user in the database
    db.collection('users').findOne({username: username}, (error, user) => {
      if (error) throw error;

      // If the user was found, check the password
      if (user) {
        // Hash the password using the salt stored with the user
        const hash = crypto.createHash('sha256').update(password + user.salt).digest('hex');

        // Check if the

// Créez une page d'inscription qui permet aux utilisateurs de créer un nouveau compte. 
// Assurez-vous de vérifier si le nom d'utilisateur choisi est déjà utilisé avant de créer le compte. 
// Stockez les informations de l'utilisateur dans la base de données une fois le compte créé.

/* 

1 - On crée un formulaire HTML pour notre page d'inscription qui demande au nom d'utilisateur, au mdp et l'adresse de l'utilisateur
2 - Ensuite on crée une route HTTP POST dans le server Node.js que l'on aura, qui prendra en charge la soumission du formulaire d'inscription
3 - On récupère  le nom d'utilisateur, le mdp et l'adresse que saisis l'utilisateur
4 - On se connecte à la bdd et on vérifie si un utilisateur avec le nom d'utilisateur donné existe déjà. Si c'est le cas on renverras une erreur à l'utilisateur 
    pour lui signaler que le nom est déjà utilisé.
5 - Si il n'est pas déjà utilisé alors on crée un sel pour le hachage du mdp, et on utilise la fonction de hachage de mdp (<<crypto.createHash()>>) pour crypter le mdp
6 - On enregistre l'utilisateur dans la base de données en stockant son nom d'utilisateur, son mdp crypté et son sel.
7 - Enfin on connecte l'utilisateur en créant une variable de session et en y stockant l'identifiant

*/


// Protégez votre page de Todo List pour qu'elle ne soit accessible que par l'utilisateur connecté. 
// Vous pouvez le faire en stockant l'identifiant de l'utilisateur connecté dans une variable de session
// et en vérifiant cette variable chaque fois que l'utilisateur accède à la page de Todo List.
       
req.session.userId = user.id;

if (!req.session.userId) {
  // The user is not logged in, redirect them to the login page
  res.redirect('/login');
  return;
}

app.get('/todolist', (req, res) => {
  if (!req.session.userId) {
    // The user is not logged in, redirect them to the login page
    res.redirect('/login');
    return;
  }

// Créez une option de déconnexion qui permet à l'utilisateur de se déconnecter de son compte et de retourner à la page de connexion.

<a href="/logout">Log out</a>

req.session.userId = null;

  
res.redirect('/login');

  
app.get('/logout', (req, res) => {
  // Clear the user's session
  req.session.userId = null;

  // Redirect the user to the login page
  res.redirect('/login');
});
