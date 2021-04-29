const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  //convert input values into an array
  const animalObject = { name, species, diet, personalityTraits };

//front end fetch request

fetch('/api/animals', {
  //declare the type of fetch by declaring the method
  method: 'POST',
  //let the fetch know were accepting JSON data
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  //we declare what the req.body will be
  //the req.body is going to be the object of converted input values or (animalObject)
  body: JSON.stringify(animalObject)
})
.then(response => {
  if (response.ok) {
    return response.json();
  }
  alert('Error: ' + response.statusText);
})
.then(postResponse => {
  console.log(postResponse);
  alert('Thank you for adding an animal!');
})
};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
