const sqlite3 = require("sqlite3").verbose();

// Open a database connection
let db = new sqlite3.Database("./database.sqlite");

// Create a table user
db.run(
  "CREATE TABLE IF NOT EXISTS users ( id_user  INTEGER PRIMARY KEY AUTOINCREMENT,email VARCHAR(255) NOT NULL,pseudo VARCHAR(255) NOT NULL,mdp VARCHAR(255) NOT NULL)"
);

//create table voiture
db.run(
  "CREATE TABLE IF NOT EXISTS voitures (id_voiture  INTEGER PRIMARY KEY AUTOINCREMENT,marque VARCHAR(255) NOT NULL,couleur VARCHAR(255) NOT NULL,annee INT NOT NULL,modele VARCHAR(255) NOT NULL,kilometrage INT NOT NULL,id_user INT NOT NULL,FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE)"
);

//create table annonce
db.run(
  "CREATE TABLE IF NOT EXISTS annonces (id_annonce  INTEGER PRIMARY KEY AUTOINCREMENT,titre VARCHAR(100) NOT NULL,description TEXT NOT NULL,photos TEXT NOT NULL,prix DECIMAL(10,2) NOT NULL,id_voiture INT NOT NULL,id_user INT NOT NULL,FOREIGN KEY (id_voiture) REFERENCES voitures(id_voiture) ON DELETE CASCADE,FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE)"
);



module.exports = db