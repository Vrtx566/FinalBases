--tablas--

CREATE TABLE Comics
(
    ComicID     INT PRIMARY KEY,
    Title       VARCHAR(255),
    Description TEXT,
    Price       DECIMAL(10, 2),
    Category    VARCHAR(100)
);

CREATE TABLE Characters
(
    CharacterID INT PRIMARY KEY,
    Name        VARCHAR(255),
    Powers      TEXT,
    Weaknesses  TEXT
);

CREATE TABLE Villagers
(
    VillagerID   INT PRIMARY KEY,
    Name         VARCHAR(255),
    Description  TEXT,
    Availability BOOLEAN
);

CREATE TABLE Mortal_Arms
(
    ArmID        INT PRIMARY KEY,
    Name         VARCHAR(255),
    Description  TEXT,
    Availability BOOLEAN
);

CREATE TABLE Customers
(
    CustomerID INT PRIMARY KEY,
    Name       VARCHAR(255),
    Birthday   DATE,
    Email      VARCHAR(255)
);

CREATE TABLE Transactions
(
    TransactionID INT PRIMARY KEY,
    ComicID       INT,
    CustomerID    INT,
    PurchaseDate  DATE,
    TotalAmount   DECIMAL(10, 2),
    FOREIGN KEY (ComicID) REFERENCES Comics (ComicID),
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
);

CREATE TABLE Character_Affiliations
(
    CharacterID INT,
    GroupName   VARCHAR(255),
    PRIMARY KEY (CharacterID, GroupName),
    FOREIGN KEY (CharacterID) REFERENCES Characters (CharacterID)
);

CREATE TABLE Comic_Character_Relationship
(
    ComicID     INT,
    CharacterID INT,
    PRIMARY KEY (ComicID, CharacterID),
    FOREIGN KEY (ComicID) REFERENCES Comics (ComicID),
    FOREIGN KEY (CharacterID) REFERENCES Characters (CharacterID)
);

CREATE TABLE Comic_Mortal_Arms
(
    ComicID INT,
    ArmID   INT,
    PRIMARY KEY (ComicID, ArmID),
    FOREIGN KEY (ComicID) REFERENCES Comics (ComicID),
    FOREIGN KEY (ArmID) REFERENCES Mortal_Arms (ArmID)
);

CREATE TABLE Comic_Villagers
(
    ComicID    INT,
    VillagerID INT,
    PRIMARY KEY (ComicID, VillagerID),
    FOREIGN KEY (ComicID) REFERENCES Comics (ComicID),
    FOREIGN KEY (VillagerID) REFERENCES Villagers (VillagerID)
);

CREATE TABLE Villain_Defeats
(
    VillainID   INT,
    HeroID      INT,
    DefeatCount INT,
    PRIMARY KEY (VillainID, HeroID),
    FOREIGN KEY (VillainID) REFERENCES Characters (CharacterID),
    FOREIGN KEY (HeroID) REFERENCES Characters (CharacterID)
);

CREATE TABLE SpecialOffers (
                               CustomerID INT,
                               Name VARCHAR(100),
                               Birthday DATE,
                               PRIMARY KEY (CustomerID)
);



--triggers--

CREATE OR REPLACE FUNCTION check_superman_purchase()
    RETURNS TRIGGER AS $$
BEGIN
    -- Comprobar si el cómic comprado es "Superman en Calzoncillos con Batman Asustado" (suponiendo que su ComicID es 20)
    IF NEW.ComicID = 1 THEN
        -- Insertar el cliente en la tabla SpecialOffers
        INSERT INTO SpecialOffers (CustomerID, Name, Birthday)
        VALUES (NEW.CustomerID, (SELECT Name FROM Customers WHERE CustomerID = NEW.CustomerID),
                (SELECT Birthday FROM Customers WHERE CustomerID = NEW.CustomerID));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger para ejecutar la función después de cada inserción en la tabla Transactions
CREATE TRIGGER after_purchase_superman
    AFTER INSERT ON Transactions
    FOR EACH ROW
EXECUTE FUNCTION check_superman_purchase();


--datos--

-- Datos para Comics
INSERT INTO Comics (ComicID, Title, Description, Price, Category)
VALUES (1, 'Superman en Calzoncillos con Batman Asustado', 'hellyeah', 33.9, 'sexual content'),
       (2, 'Three every police individual.', 'Mrs tend remember soldier box go. City read physical account six.', 31.6,
        'fantasy'),
       (3, 'Make sometimes nice.', 'Tree reality within imagine win. Wife team your anyone action.', 11.39,
        'superhero');

-- Datos para Characters
INSERT INTO Characters (CharacterID, Name, Powers, Weaknesses)
VALUES (1, 'Joshua', 'Class tell across continue get may sell.', 'Office weight him perform indicate ask.'),
       (2, 'Victoria', 'Small performance office body.', 'Knowledge I news.'),
       (3, 'Teresa', 'Cold hard traditional play item across board.', 'Chair employee us head region group town.');

-- Datos para Villagers
INSERT INTO Villagers (VillagerID, Name, Description, Availability)
VALUES (1, 'Elizabeth', 'Mr game others measure modern occur.', TRUE),
       (2, 'Elizabeth', 'Public organization table.', FALSE),
       (3, 'Cynthia', 'Human be sing serve.', FALSE);

-- Datos para Mortal_Arms
INSERT INTO Mortal_Arms (ArmID, Name, Description, Availability)
VALUES (1, 'away', 'Dinner than inside few avoid study play.', FALSE),
       (2, 'significant', 'Foot step edge likely water music.', FALSE),
       (3, 'blood', 'Down without alone source above indicate.', FALSE);

-- Datos para Customers
INSERT INTO Customers (CustomerID, Name, Birthday, Email)
VALUES (1, 'Dr. Raymond Caldwell Jr.', '1964-09-09', 'rebeccanicholson@davis-hoffman.com'),
       (2, 'John Kramer', '2000-10-12', 'ballardteresa@williams.com'),
       (3, 'Teresa Anderson', '1961-07-28', 'lisa28@rodriguez-gill.com');

-- Datos para Transactions
INSERT INTO Transactions (TransactionID, ComicID, CustomerID, PurchaseDate, TotalAmount)
VALUES (1, 1, 1, '2024-09-05', 77.51),
       (2, 2, 2, '2024-04-07', 10.3),
       (3, 3, 3, '2024-02-23', 42.86);

-- Datos para Character_Affiliations
INSERT INTO Character_Affiliations (CharacterID, GroupName)
VALUES (1, 'X-Men'),
       (2, 'Avengers'),
       (3, 'Fantastic Four');

-- Datos para Comic_Character_Relationship
INSERT INTO Comic_Character_Relationship (ComicID, CharacterID)
VALUES (1, 2),
       (2, 1),
       (3, 3);

-- Datos para Comic_Mortal_Arms
INSERT INTO Comic_Mortal_Arms (ComicID, ArmID)
VALUES (1, 1),
       (2, 2),
       (3, 3);


-- Datos para Comic_Villagers
INSERT INTO Comic_Villagers (ComicID, VillagerID)
VALUES (1, 1),
       (2, 2),
       (3, 3);

-- Datos para Villain_Defeats
INSERT INTO Villain_Defeats (VillainID, HeroID, DefeatCount)
VALUES (1, 1, 2),
       (1, 2, 4),
       (2, 3, 2);


--consultas--
-- 1. Muestra todos los comics con un precio menor a 20 ordenados alfabéticamente por título.
SELECT ComicID, Title, Price
FROM Comics
WHERE Price < 20
ORDER BY Title ASC;

-- 2. Muestra los nombres de los personajes que tienen la palabra "flight" en sus poderes.
SELECT CharacterID, Name, Powers
FROM Characters
WHERE Powers LIKE '%flight%'
ORDER BY Name ASC;


--3. encontrar los villanos que han sido derrotados más de 3 veces.
SELECT v.VillainID AS VillainID, c.Name AS VillainName, v.HeroID, h.Name AS HeroName, v.DefeatCount
FROM Villain_Defeats v
         JOIN Characters c ON v.VillainID = c.CharacterID
         JOIN Characters h ON v.HeroID = h.CharacterID
WHERE v.DefeatCount > 3;

--4. obtener la lista de clientes que han realizado más de 5 transacciones junto con la cantidad total de cómics comprados y el monto total gastado.
SELECT c.CustomerID, c.Name AS CustomerName, COUNT(t.TransactionID) AS ComicsPurchased, SUM(t.TotalAmount) AS TotalSpent
FROM Customers c
         JOIN Transactions t ON c.CustomerID = t.CustomerID
GROUP BY c.CustomerID, c.Name
HAVING COUNT(t.TransactionID) > 5;

--5. encontrar la categoría de cómics con más compras.

SELECT c.Category, COUNT(t.TransactionID) AS PurchaseCount
FROM Comics c
         JOIN Transactions t ON c.ComicID = t.ComicID
GROUP BY c.Category
ORDER BY PurchaseCount DESC
LIMIT 1;

--6. encontrar los personajes que pertenecen tanto a la Liga de la Justicia como a los Vengadores.

SELECT ca1.CharacterID, ch.Name
FROM Character_Affiliations ca1
         JOIN Character_Affiliations ca2 ON ca1.CharacterID = ca2.CharacterID
         JOIN Characters ch ON ca1.CharacterID = ch.CharacterID
WHERE ca1.GroupName = 'Justice League' AND ca2.GroupName = 'Avengers';

--7.encontrar los comics que tengan batallas entre heroes y villanos y que tengan almenos un mortal arm disponible.

SELECT DISTINCT c.ComicID, c.Title
FROM Comics c
         JOIN Comic_Character_Relationship cc1 ON c.ComicID = cc1.ComicID
         JOIN Characters ch1 ON cc1.CharacterID = ch1.CharacterID
         JOIN Comic_Character_Relationship cc2 ON c.ComicID = cc2.ComicID
         JOIN Characters ch2 ON cc2.CharacterID = ch2.CharacterID
         JOIN Comic_Mortal_Arms cma ON c.ComicID = cma.ComicID
WHERE ch1.CharacterID != ch2.CharacterID
  AND ch1.CharacterID IN (SELECT CharacterID FROM Characters WHERE Weaknesses IS NOT NULL)
  AND ch2.CharacterID IN (SELECT CharacterID FROM Characters WHERE Powers IS NOT NULL);
