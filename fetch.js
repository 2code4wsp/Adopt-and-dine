

//const location = '{city, state, zip}';
//const limit = 3;

//const petKey = 'vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW'
//const petSecret = 'bx9RsyfRlesCpNa5SnRXTox2w2NvWSOSYy8MWGVf'

//Fetch doggy data
//const dogURL = `https://api.petfinder.com/v2/animals?type=dog&location=${location}&limit=${limit}&fields=name,age,gender,breeds,photos&key=${petKey}`;


//zipcode inpput value
var zip = document.getElementById('s').value

function getauth (){
$.ajax({
  url: 'https://api.petfinder.com/v2/oauth2/token',
  type: 'POST',
  data: {
    'grant_type': 'client_credentials',
    'client_id': 'vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW',
    'client_secret': 'bx9RsyfRlesCpNa5SnRXTox2w2NvWSOSYy8MWGVf',
  },
  success: function(response) {
    console.log(response.access_token);
  },
  error: function(xhr, status, error) {
    console.error(error);
  }
})
};

function getDogs(location, limit) {
        
  $.ajax({
  url: 'https://api.petfinder.com/v2/animals?type=dog&status=adoptable&limit=3',
  type: 'GET',
  headers: {
      'Authorization': `Bearer ${access_token}`
  },
  data: {
      'type': 'dog',
      //changed from 'zipcode' to zip variable called above
      'location': zip,
      'limit': '3',
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
}
getDogs(zip, 3);

//code to filter repeated dogs
// const processedDogs = {}; 
//   const dogs = data.animals.filter(dog => {
//     if (processedDogs[dog.id]) {
//       // dog has already been processed, filter it out
//       return false;
//     } else {
//       // dog hasn't been processed, mark it as processed and include it
//       processedDogs[dog.id] = true;
//       return true;
//     }
//   });

/*
fetch(dogURL, {
    headers: {
        Authorization: `Bearer $petKey`

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

        card.appendChild(name);
        card.appendChild(age);
        card.appendChild(gender);
        card.appendChild(breed);
        card.appendChild(photo);
        dogContainer.appendChild(card);
    });
})
.catch(error => console.error(error));


//fetch vet and shelter data
const dogOfficesURL = `https://api.petfinder.com/v2/organizations?type=vet,shelter&location=${location}&limit=${limit}%key=${petKey}`;

fetch(dogOfficesURL, {
    headers: {
        Authorization: `Bearer ${authToken}`
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
*/

//Authenticate request/handle exceptions
//Parse response - name, age, breed, gender, location
//Dynamic html element creation to house data

//Event Listener for tab scrolling to respective section when clicked
function scrollToSection(id) {
  const section = document.querySelector(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const aboutTab = document.querySelector('a[href="#aboutEl"]');
aboutTab.addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('#aboutEl');
});

const localRestaurantTab = document.querySelector('a[href="#localRestaurantEl"]');
localRestaurantTab.addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('#localRestaurantEl');
});

const additionalDogTab = document.querySelector('a[href="#additionalDogEl"]');
additionalDogTab.addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('#additionalDogEl');
});

const vetTab = document.querySelector('a[href="#shelAndVetEl"]');
vetTab.addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('#shelAndVetEl');
});

const shelterTab = document.querySelector('a[href="#shelterEl"]');
shelterTab.addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('#shelterEl');
});


//Event listeners for each button:

// Reference input field (location input) with id "s"
var input = document.getElementById('s');
//request-pet-data = id for submit button "find dinner date"
var button = document.getElementById('request-pet-data');

// Clickable button
button.addEventListener('click', function() {
  //location value (remove spaces at beginning or end of string)
  var location = input.value.trim();

  // URL for API request
  let url = 'https://api.rescuegroups.org/http/v2.json/?object=pets';
  
  // Conditionals to determine which filter to apply to URL based on input
        // Regular Expression Syntax:
        // ^ = match start (beginning) of string ("only match strings that starts w/ a 5-9 digit zipcode and nothing else before it") 
        // \d = match any digit between 0-9 
        // \d{5} =  match exactly 5 digits (zipcode is 5 digits ie: 97070)
        // ? = match 0 or 1 times (matched 1 or not at all)
        // () = anything within parenthesis indicates its optional
        // (-\d{4})? = match a optional string that contains a hyphen (-) followed by 4 digits
        // /^\d{5}$/ = match a string that contains a 5 digits with no other characters before or after the 5 digit zip code"
        // $ = matches the end of the string ("only match strings that end w/ a 5-9 digit zipcode and nothing else after it") 
        
  // .match(/^\d{5}(-\d{4})?$/) = .match(regular expression) = "match a string that contains 5 digits followed by an optional hyphen and 4 digits, with no other characters before(^) or after($) the full (5 or 9 digits) zip code."
  // location.match () = returns array of info about match between regular expression (a 5-9 digit string) and location (the user input). 
                        // If no match between user input and a 5-9 digit string then returns "null"

  if (location.match(/^\d{5}(-\d{4})?$/)) {
    // if input matches zipcode, add zipcode to URL as a filter
    url += `&filter[location]=${location}`;
  } else {
    // If input != zipcode, then input = city, state or just state
    // toUpperCase() = converts string to upper case letters
    let state = location.toUpperCase();
    // set city = to null in case user does not enter a city name in the input
    let city = null;

    // look for comma or state
    // indexOf(',') = to find something (a comma), if greater than -1 than a comma is in the string
    var commaIndex = location.indexOf(',');
    // If find comma, extract city and state from input string (and remove extra spaces)
    // commaIndex > 1 indicates comma therfore a city and state present
    if (commaIndex !== -1) {
        //location.substring() = ""
        // commaIndex + 1 = starting index after the comma in the location string
        // commaIndex = index of comma in the location string 
      // state = This substring starts right after the comma in the location string (remove white spaces before and after and make upper case)
      state = location.substring(commaIndex + 1).trim().toUpperCase();
      // city = This substring starts from the beginning of the string and ending immediately before the first comma in the string (remove white spaces before and after)
      city = location.substring(0, commaIndex).trim();
    }
    // If dont find comma, assume input = state (2 letters)
    if (state.length === 2) {
      url += `&filter[location]=${state}`;

    // If city is greater than 0 (handles scenario where the location string does not contain a comma to separate the city and state.) 
      url += `&filter[location]=${city}|${state}`;
    }
  }

  // Make network request to URL (an API endpoint) and fetch resources
  fetch(url)
    // .then () handles response from server, convert response to JSON format, then handle JSON data
    // .then() = handles fetch asynchronously (takes a function as an argument which executes once response is received )
    // response.json() = Converts response body(string in JSON format) into a js objcet that can be used. Extract the data from a JSON response returned by a network request
    
    // 1st Promise (obtain json data )
    // .then(response => response.json())
    // response = built in object in js that represents response to a network
    .then(function(response){
        // .json() = parse JSON data
        // "parse the response from the request made"
        return response.json();
     })
    
    // 2nd Promise (handles parsed JSON pet data (results from 1st Promise))
    // data = (available) parsed JSON data 
        //parse = convert string of characters from server into js object)
    .then(function(data){
      // show pet data
      console.log(data);
    })

    .catch(function(error){
      // Takes errors into consideration to not break code
      console.error(error);
    });
});

