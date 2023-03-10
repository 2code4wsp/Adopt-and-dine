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

//fetch vet and shelter data
const dogOfficesURL = `https://api.petfinder.com/v2/organizations?type=vet,shelter&location=${location}&limit=${limit}`;

fetch(dogOfficesURL, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {
    //handle vet shelter data
    const vetContainer = document.getElementById('vetEl');
    const shelterContainer = document.getElementById('shelterEl');

    data.organizations.forEach(org => {
        //create a card forEach
        const card = document.createElement('div');
        card.classList.add('card');

        //add org info to card
        const name = document.createElement('h2');
        name.textContent = org.name;

        const address = document.createElement('p');
        address.textContent = `Address: ${org.address.address1}, ${org.address.city}, ${org.address.state}, ${org.address.postcode}`;

        const phone = document.createElement('p');
        phone.textContent = `Phone: ${org.phone}`;

        const website = document.createElement('a');
        website.href = org.website;
        website.textContent = org.website;

        //add elements to card
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        //place card in correct container
        if (org.type === 'vet') {
            vetContainer.appendChild(card);
        } else if (org.type === 'shelter') {
            shelterContainer.appendChild(card);

        }

    });
})
.catch(error => console.error(error));