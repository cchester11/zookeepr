const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001
const app = express();

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraitsArray) {
    if (typeof query.personalityTraitsArray === 'string') {
      personalityTraitsArray = [query.personalityTraitsArray];
    } else {
      personalityTraitsArray = query.personalityTraitsArray;
    }
    personalityTraitsArray.forEach(trait => {
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraitsArray.indexOf(trait) !== 1
      )
    })
  }
  if(query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log(req.query)
  res.json(results);
});

app.listen(3001, () => {
  console.log(`API server now on port ${PORT}`)
})