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