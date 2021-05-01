const fs = require('fs');
//requiring all the exportable modules from the lib folder
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require('../lib/animals');
//requiring the exportable from json (I assume json is inherently exportable because there is no export declaration in the file)
const { animals } = require('../data/animals.json');

//this allows us to execute a function but mock the property of fs so that it runs for functionality's sake but doesnt push data to our json
jest.mock('fs');

test('creates a new animal object', () => {
  const animal = createNewAnimal( { name: 'Cynthia', id: 'aljga'}, animals);

  expect(animal.name).toBe('Cynthia');
  expect(animal.id).toBe('aljga')
});

test('filter by query', () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const updatedAnimals = filterByQuery({ species: "gorilla"}, startingAnimals)

  expect(updatedAnimals.length).toEqual(1);
});

test('finds by id', () => {
  const startingAnimals = [
    {
      "id": "3",
      "name": "Noel",
      "species": "bear",
      "diet": "carnivore",
      "personalityTraits": [
        "impish",
        "sassy",
        "brave"
      ]
    },
    {
      "id": "4",
      "name": "Coco",
      "species": "penguin",
      "diet": "herbivore",
      "personalityTraits": [
        "loving",
        "goofy"
      ]
    },
  ];

  const result = findById("3", startingAnimals);

  expect(result.name).toBe("Noel");
});

test('validates personality traits', () => {
  const animal = {
    "id": "3",
    "name": "Noel",
    "species": "bear",
    "diet": "carnivore",
    "personalityTraits": [
      "impish",
      "sassy",
      "brave"
    ]
  };
  
  const invalidAnimal = {
    "id": "3",
    "name": "Noel",
    "species": "bear",
    "diet": "carnivore",
  };

  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
})

