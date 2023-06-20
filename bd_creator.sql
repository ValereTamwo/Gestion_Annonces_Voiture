CREATE TABLE voiture (
    id_voiture INT PRIMARY KEY AUTO_INCREMENT,
    marque VARCHAR(255) NOT NULL,
    couleur VARCHAR(255) NOT NULL,
    annee INT NOT NULL,
    modele VARCHAR(255) NOT NULL,
    kilometrage INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE,
);

CREATE TABLE annonce (
    id_annonce INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    photos TEXT NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    id_voiture INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_voiture) REFERENCES voiture(id_voiture) ON DELETE CASCADE;
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE;
);

CREATE TABLE user (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    pseudo VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
);