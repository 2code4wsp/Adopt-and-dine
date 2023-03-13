const petKey = 'vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW'
const petSecret = 'bx9RsyfRlesCpNa5SnRXTox2w2NvWSOSYy8MWGVf'
//const dogURL = `https://api.petfinder.com/v2/animals?type=dog&location=97215&limit=3&fields=name,age,gender,breeds,photos`

//On click of the button
$('.btn').click(function () {
  //get location from zipcode input
  var location = $('#input').val().trim()
  //get access Token to access information from api
  getToken()
  //get dogs from input zipcode
  getDogs(location)
  //get VetShelters from input zipcode
  getShelters(location)
  //get restaurants from input zipcode
  //getRestaurant(location);
})

function getToken () {
  // Make a request to the authentication endpoint to obtain a new token
  $.ajax({
    type: 'POST',
    url: 'https://api.petfinder.com/v2/oauth2/token',
    data: {
      grant_type: 'client_credentials',
      client_id: 'vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW',
      client_secret: 'bx9RsyfRlesCpNa5SnRXTox2w2NvWSOSYy8MWGVf'
    }
  })
  .done(function (response) {
    console.log(response)
    authToken = response.access_token
    console.log(authToken)
    localStorage.setItem('authToken', response.access_token),
      // Set the expiration time for the new token to one hour from the current time
      (authTokenExpirationTime =
        new Date().getTime() + response.expires_in * 1000)
  })
}

//get auth token from storage
let authToken = localStorage.getItem('authToken')

function getDogs (location) {
  $.ajax({
    url: 'https://api.petfinder.com/v2/animals?type=dog&status=adoptable&has_photo=1',
    type: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    data: {
      type: 'dog',
      location: location,
      limit: '5',
      fields: 'name,age,gender,breeds,photos'
    }
  })
    .done(function (data) {
      console.log(data)
      const dogContainer = $('#additionalDogEl')
      data.animals.forEach(dog => {
        const card = $('<div>').addClass('card')
        const name = $('<h2>').text(dog.name)
        const age = $('<p>').text(`Age: ${dog.age}`)
        const gender = $('<p>').text(`Gender: ${dog.gender}`)
        const breed = $('<p>').text(`Breed: ${dog.breeds.primary}`)
        const photo = $('<img>').attr('src', dog.photos[0].medium)
        card.append(name, age, gender, breed, photo)
        dogContainer.append(card)
      })
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(`AJAX request failed: ${textStatus}, ${errorThrown}`)
    })
}

const dogOfficesURL = `https://api.petfinder.com/v2/organizations?type=shelter&limit=5`

function getShelters (location) {
  $.ajax({
    url: dogOfficesURL,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    method: 'GET',
    dataType: 'json',
    data: {
        type: 'dogshelter',
        location: location,
        limit: '5',
        fields: 'name, address, phone, url'
      }
    })
    .done(function (data) {
        console.log(data)
        const shelterContainer = $('#shelterEl')
  
        data.organizations.forEach(organizations =>{
         //create a card forEach
          const card = $('<div>').addClass('card')
          //add org info to card
          const name = $('<h2>').text(organizations.name)
          const address = $('<p>').text(`Address: ${organizations.address}`)
          const phone = $('<p>').text(`Phone: ${organizations.phone}`)
          const website = $('<a>').attr('href', organizations.website).text(organizations.website)
          card.append(name, address, phone, website)
          shelterContainer.append(card)            
        })  
})
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(`AJAX request failed: ${textStatus}, ${errorThrown}`)
  
    })
}