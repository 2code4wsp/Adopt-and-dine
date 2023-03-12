const token = '{YOUR_ACCESS_TOKEN}';
const location = '{city, state, zip}';
const limit = 3;

//Fetch doggy data
const dogURL = `https://api.petfinder.com/v2/animals?type=dog&location=${location}&limit=${limit}&fields=name,age,gender,breeds,photos`;

fetch(dogURL, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {
    //handle doggy data
    const dogContainer = document.getElementById('additionalDogEl');
    data.animals.forEach(dog => {
        //create card forEach dog
        const card = document.createElement('div');
        card.classList.add('card');

        //add doggy data to card
        const name = document.createElement('h2');
        name.textContent = dog.name;

        const age = document.createElement('p');
        age.textContent = `Age: ${dog.age}`;

        const gender = document.createElement('p');
        gender.textContent = `Gender: ${dog.gender}`;

        const breed = document.createElement('p');
        breed.textContent = `Breed: ${dog.breeds.primary}`;

        const photo =document.createElement('img');
        photo.src = dog.photos[0].medium;

        //add card to dog container
        dogContainer.appendChild(card);
    });
})
.catch(error => console.error(error));

//client ID: zvRMwD-SajCgvo7-IcT0OA
//apiK: V6Oo4GKHu2XFdHcHwlkim9pyL6uVs2rQIMVF5x6oqS-Ng_yetXyLZyRS2eGcwIncN0SQbKbl6rvKMxtwy8Hfm5AVSR6ftj7MAO4PNEANLhHmNN5RoZHWdf87tccGZHYx

//Sending a POST request with fetch
const dineLocation = '{city, state, zip}';
const limit = 20; //does this need to be in brackets?
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer V6Oo4GKHu2XFdHcHwlkim9pyL6uVs2rQIMVF5x6oqS-Ng_yetXyLZyRS2eGcwIncN0SQbKbl6rvKMxtwy8Hfm5AVSR6ftj7MAO4PNEANLhHmNN5RoZHWdf87tccGZHYx'
    }
  };
  
  fetch('https://api.yelp.com/v3/businesses/search?location=${location}&term=restaurants&categories=&attributes=dog_friendly&sort_by=best_match&limit=20', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

//add event listener for search

//