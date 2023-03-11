// The following code is used to make an AJAX request to the Petfinder API to get additional dog information
// This code follows the structure of the tutorial that Alicia provided in the slack channel




const petKey = 'vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW';
const location = 

$.ajax({
    url: 'https://api.petfinder.com/v2/animals',
    type: 'GET',
    headers: {
        'Authorization': `Bearer ${petKey}`
    },
    data: {
        'type': 'dog',
        'location': location,
        'limit': 3,
        'fields': 'name,age,gender,breeds,photos'
    }
})
.done(function(data) {
    console.log(data);
    const dogContainer = $('#additionalDogEl');
    data.animals.forEach(dog => {
        const card = $('<div></div>').addClass('card');
        const name = $('<h2></h2>').text(dog.name);
        const age = $('<p></p>').text(`Age: ${dog.age}`);
        const gender = $('<p></p>').text(`Gender: ${dog.gender}`);
        const breed = $('<p></p>').text(`Breed: ${dog.breeds.primary}`);
        const photo = $('<img>').attr('src', dog.photos[0].medium);
        card.append(name, age, gender, breed, photo);
        dogContainer.append(card);
    });
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log(`AJAX request failed: ${textStatus}, ${errorThrown}`);
});