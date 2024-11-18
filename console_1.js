db.createCollection("comics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "price", "category"],
      properties: {
        title: {
          bsonType: "string",
          description: "El título del cómic"
        },
        description: {
          bsonType: "string",
          description: "Descripción del cómic"
        },
        price: {
          bsonType: "double",
          description: "Precio del cómic"
        },
        category: {
          bsonType: "string",
          description: "Categoría del cómic (ej. Superhéroe, Villano)"
        }
      }
    }
  }
});


db.createCollection("characters", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "powers", "weaknesses"],
      properties: {
        name: {
          bsonType: "string",
          description: "Nombre del personaje"
        },
        powers: {
          bsonType: "string",
          description: "Poderes del personaje"
        },
        weaknesses: {
          bsonType: "string",
          description: "Debilidades del personaje"
        }
      }
    }
  }
});


db.createCollection("villagers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "availability"],
      properties: {
        name: {
          bsonType: "string",
          description: "Nombre del villager"
        },
        description: {
          bsonType: "string",
          description: "Descripción del villager"
        },
        availability: {
          bsonType: "bool",
          description: "Disponibilidad del villager"
        }
      }
    }
  }
});

db.createCollection("mortal_arms", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "availability"],
      properties: {
        name: {
          bsonType: "string",
          description: "Nombre del mortal arm"
        },
        description: {
          bsonType: "string",
          description: "Descripción del mortal arm"
        },
        availability: {
          bsonType: "bool",
          description: "Disponibilidad del mortal arm"
        }
      }
    }
  }
});

db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "birthday", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "Nombre del cliente"
        },
        birthday: {
          bsonType: "date",
          description: "Fecha de nacimiento del cliente"
        },
        email: {
          bsonType: "string",
          description: "Correo electrónico del cliente"
        }
      }
    }
  }
});

db.createCollection("transactions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["comicId", "customerId", "purchaseDate", "totalAmount"],
      properties: {
        comicId: {
          bsonType: "int",
          description: "ID del cómic comprado"
        },
        customerId: {
          bsonType: "int",
          description: "ID del cliente que realizó la compra"
        },
        purchaseDate: {
          bsonType: "date",
          description: "Fecha de compra"
        },
        totalAmount: {
          bsonType: "double",
          description: "Monto total de la compra"
        }
      }
    }
  }
});

db.createCollection("character_affiliations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["characterId", "groupName"],
      properties: {
        characterId: {
          bsonType: "int",
          description: "ID del personaje"
        },
        groupName: {
          bsonType: "string",
          description: "Nombre del grupo al que pertenece el personaje"
        }
      }
    }
  }
});


db.createCollection("comic_character_relationship", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["comicId", "characterId"],
      properties: {
        comicId: {
          bsonType: "int",
          description: "ID del cómic"
        },
        characterId: {
          bsonType: "int",
          description: "ID del personaje"
        }
      }
    }
  }
});


db.createCollection("comic_mortal_arms", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["comicId", "armId"],
      properties: {
        comicId: {
          bsonType: "int",
          description: "ID del cómic"
        },
        armId: {
          bsonType: "int",
          description: "ID del mortal arm"
        }
      }
    }
  }
});


db.createCollection("comic_villagers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["comicId", "villagerId"],
      properties: {
        comicId: {
          bsonType: "int",
          description: "ID del cómic"
        },
        villagerId: {
          bsonType: "int",
          description: "ID del villager"
        }
      }
    }
  }
});


db.createCollection("villain_defeats", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["villainId", "heroId", "defeatCount"],
      properties: {
        villainId: {
          bsonType: "int",
          description: "ID del villano derrotado"
        },
        heroId: {
          bsonType: "int",
          description: "ID del héroe que derrotó al villano"
        },
        defeatCount: {
          bsonType: "int",
          description: "Número de veces que el héroe ha derrotado al villano"
        }
      }
    }
  }
});


db.createCollection("special_offers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customerId", "name", "birthday"],
      properties: {
        customerId: {
          bsonType: "int",
          description: "ID del cliente que compró el cómic especial"
        },
        name: {
          bsonType: "string",
          description: "Nombre del cliente"
        },
        birthday: {
          bsonType: "date",
          description: "Fecha de nacimiento del cliente"
        }
      }
    }
  }
});



//datos

db.comics.insertMany([
  {
    _id: 1,
    title: "Superman en Calzoncillos con Batman Asustado",
    description: "Una épica batalla entre Superman y Batman.",
    price: 20.00,
    category: "Superhéroe"
  },
  {
    _id: 2,
    title: "Batman contra Joker",
    description: "La eterna lucha del Caballero Oscuro contra el villano más peligroso.",
    price: 15.00,
    category: "Villano"
  },
  {
    _id: 3,
    title: "Mujer Maravilla: El Ascenso de Ares",
    description: "Ares desafía a la Mujer Maravilla en esta batalla épica.",
    price: 18.00,
    category: "Superhéroe"
  },
  {
    _id: 4,
    title: "Flash: La Carrera contra el Tiempo",
    description: "Flash tiene que detener una catástrofe en el tiempo.",
    price: 12.00,
    category: "Superhéroe"
  },
  {
    _id: 5,
    title: "Green Lantern: La Batalla Cósmica",
    description: "Los Green Lanterns luchan contra una amenaza intergaláctica.",
    price: 22.00,
    category: "Superhéroe"
  }
]);


db.characters.insertMany([
  {
    _id: 1,
    name: "Superman",
    powers: "Vuelo, Fuerza Sobrehumana, Visión Calorífica",
    weaknesses: "Kryptonite"
  },
  {
    _id: 2,
    name: "Batman",
    powers: "Habilidades de combate, Inteligencia avanzada, Gran riqueza",
    weaknesses: "Sin poderes sobrehumanos"
  },
  {
    _id: 3,
    name: "Wonder Woman",
    powers: "Fuerza sobrehumana, Lazo de la verdad, Vuelo",
    weaknesses: "Poco control sobre su poder en situaciones extremas"
  },
  {
    _id: 4,
    name: "The Joker",
    powers: "Genio criminal, Inmunidad al dolor",
    weaknesses: "Excesiva confianza en su propia inteligencia"
  },
  {
    _id: 5,
    name: "Lex Luthor",
    powers: "Genio criminal, Gran riqueza, Tecnología avanzada",
    weaknesses: "Su ego"
  }
]);


db.villagers.insertMany([
  {
    _id: 1,
    name: "Robin",
    description: "El compañero leal de Batman, experto en acrobacias.",
    availability: true
  },
  {
    _id: 2,
    name: "Alfred",
    description: "El mayordomo y confidente de Batman.",
    availability: true
  },
  {
    _id: 3,
    name: "Lois Lane",
    description: "Periodista y el amor de la vida de Superman.",
    availability: true
  }
]);

db.mortal_arms.insertMany([
  {
    _id: 1,
    name: "Batarang",
    description: "Un dispositivo lanzable con forma de murciélago, utilizado por Batman.",
    availability: true
  },
  {
    _id: 2,
    name: "Lazo de la Verdad",
    description: "Un lazo que obliga a decir la verdad, utilizado por Wonder Woman.",
    availability: true
  },
  {
    _id: 3,
    name: "Anillo de Poder",
    description: "Un anillo que otorga poder ilimitado, utilizado por los Green Lanterns.",
    availability: true
  }
]);

db.customers.insertMany([
  {
    _id: 1,
    name: "Juan Pérez",
    birthday: new Date("1985-05-15"),
    email: "juan@email.com"
  },
  {
    _id: 2,
    name: "Ana García",
    birthday: new Date("1992-09-20"),
    email: "ana@email.com"
  },
  {
    _id: 3,
    name: "Carlos Rodríguez",
    birthday: new Date("1980-03-12"),
    email: "carlos@email.com"
  }
]);


db.transactions.insertMany([
  {
    _id: 1,
    comicId: 1,
    customerId: 1,
    purchaseDate: new Date("2024-11-18"),
    totalAmount: 20.00
  },
  {
    _id: 2,
    comicId: 2,
    customerId: 2,
    purchaseDate: new Date("2024-11-18"),
    totalAmount: 15.00
  },
  {
    _id: 3,
    comicId: 3,
    customerId: 3,
    purchaseDate: new Date("2024-11-18"),
    totalAmount: 18.00
  }
]);


db.character_affiliations.insertMany([
  {
    characterId: 1,
    groupName: "Justice League"
  },
  {
    characterId: 2,
    groupName: "Justice League"
  },
  {
    characterId: 3,
    groupName: "Justice League"
  }
]);


db.comic_character_relationship.insertMany([
  {
    comicId: 1,
    characterId: 1
  },
  {
    comicId: 2,
    characterId: 2
  },
  {
    comicId: 3,
    characterId: 3
  }
]);


db.comic_mortal_arms.insertMany([
  {
    comicId: 1,
    armId: 1
  },
  {
    comicId: 2,
    armId: 2
  },
  {
    comicId: 3,
    armId: 3
  }
]);


db.comic_villagers.insertMany([
  {
    comicId: 1,
    villagerId: 1
  },
  {
    comicId: 2,
    villagerId: 2
  },
  {
    comicId: 3,
    villagerId: 3
  }
]);


db.villain_defeats.insertMany([
  { villainId: 1, heroId: 2, defeatCount: 5 },
  { villainId: 1, heroId: 3, defeatCount: 3 },
  { villainId: 2, heroId: 4, defeatCount: 7 },
  { villainId: 3, heroId: 2, defeatCount: 6 },
  { villainId: 3, heroId: 1, defeatCount: 8 },
  { villainId: 4, heroId: 3, defeatCount: 4 },
  { villainId: 4, heroId: 5, defeatCount: 2 },
  { villainId: 5, heroId: 4, defeatCount: 5 },
  { villainId: 5, heroId: 2, defeatCount: 3 },
  { villainId: 6, heroId: 5, defeatCount: 9 }
]);


db.special_offers.insertMany([
  { customerId: 1, name: "Carlos Garcia", birthday: new Date("1990-05-15") },
  { customerId: 2, name: "Ana Martinez", birthday: new Date("1985-07-22") },
  { customerId: 3, name: "Pedro Ruiz", birthday: new Date("1992-09-10") },
  { customerId: 4, name: "Laura Sanchez", birthday: new Date("1988-12-30") },
  { customerId: 5, name: "Julian Gomez", birthday: new Date("1995-03-18") },
  { customerId: 6, name: "Maria Fernandez", birthday: new Date("1983-11-05") },
  { customerId: 7, name: "Javier Lopez", birthday: new Date("1987-02-20") },
  { customerId: 8, name: "Sofia Perez", birthday: new Date("1994-04-02") },
  { customerId: 9, name: "Luis Torres", birthday: new Date("1991-06-14") },
  { customerId: 10, name: "Elena Ramirez", birthday: new Date("1986-08-25") }
]);


//consultas

//1) Listar todos los cómics con precio inferior a $20, ordenados alfabéticamente por título.
db.comics.find({ price: { $lt: 20 } }).sort({ title: 1 });


//2) Listar todos los personajes con poderes que incluyan la palabra "vuelo".
db.characters.find({ powers: /flight/i }).sort({ name: 1 });

//3) Encontrar todos los villanos que han sido derrotados por un superhéroe más de 3 veces.

db.villain_defeats.aggregate([
  { $match: { defeatCount: { $gt: 3 } } },
  { $lookup: {
      from: "characters",
      localField: "villainId",
      foreignField: "characterId",
      as: "villain"
    }
  },
  { $lookup: {
      from: "characters",
      localField: "heroId",
      foreignField: "characterId",
      as: "hero"
    }
  },
  { $project: {
      "villain.name": 1,
      "hero.name": 1,
      defeatCount: 1
    }
  }
]);


//4) Obtener una lista de clientes que han comprado más de 5 cómics, junto con el total gastado.

db.transactions.aggregate([
  { $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$totalAmount" },
      comicCount: { $sum: 1 }
    }
  },
  { $match: { comicCount: { $gt: 5 } } },
  { $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customerId",
      as: "customer"
    }
  },
  { $project: {
      "customer.name": 1,
      totalSpent: 1,
      comicCount: 1
    }
  }
]);


//Encontrar la categoría de cómic más popular, basada en el número de compras.

db.transactions.aggregate([
  { $group: {
      _id: "$comicId",
      purchaseCount: { $sum: 1 }
    }
  },
  { $lookup: {
      from: "comics",
      localField: "_id",
      foreignField: "comicId",
      as: "comicDetails"
    }
  },
  { $unwind: "$comicDetails" },
  { $group: {
      _id: "$comicDetails.category",
      totalPurchases: { $sum: "$purchaseCount" }
    }
  },
  { $sort: { totalPurchases: -1 } },
  { $limit: 1 }
]);


//Obtener todos los personajes afiliados a la "Justice League" y a los "Avengers" al mismo tiempo.

db.character_affiliations.aggregate([
  { $match: { groupName: { $in: ["Justice League", "Avengers"] } } },
  { $group: {
      _id: "$characterId",
      groups: { $addToSet: "$groupName" }
    }
  },
  { $match: { groups: { $size: 2 } } },
  { $lookup: {
      from: "characters",
      localField: "_id",
      foreignField: "characterId",
      as: "characterDetails"
    }
  },
  { $unwind: "$characterDetails" },
  { $project: {
      "characterDetails.name": 1,
      "characterDetails.powers": 1
    }
  }
]);


//Encontrar los cómics que presentan batallas épicas entre héroes y villanos, e incluyen al menos un "mortal arm".

db.comic_mortal_arms.aggregate([
  { $lookup: {
      from: "comics",
      localField: "comicId",
      foreignField: "comicId",
      as: "comicDetails"
    }
  },
  { $unwind: "$comicDetails" },
  { $lookup: {
      from: "comic_character_relationship",
      localField: "comicId",
      foreignField: "comicId",
      as: "characters"
    }
  },
  { $lookup: {
      from: "mortal_arms",
      localField: "armId",
      foreignField: "armId",
      as: "mortalArms"
    }
  },
  { $match: {
      "comicDetails.category": { $in: ["hero-villain", "action"] },
      "mortalArms.availability": true
    }
  },
  { $project: {
      "comicDetails.title": 1,
      "comicDetails.category": 1,
      "mortalArms.name": 1
    }
  }
]);
