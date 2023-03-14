let token = localStorage.getItem('token');
let expiryDate = new Date(new Date().getTime() + 1000 * 60 * 60);

$('#searchBtn').click(function() {
    const zipCode = $('#s').val();
    const org = 'vet, shelter';
    getDogs(zipCode, '5');
    getVetShelters(zipCode);
    getDogKnowledge('#dogFactEl');
});


if (localStorage.getItem('token') && new Date(localStorage.getItem('expiryDate')) > new Date()) {
    token = localStorage.getItem('token');
  } else {
    $.ajax({
      url: 'https://api.petfinder.com/v2/oauth2/token',
      method: 'POST',
      data: {
        grant_type: 'client_credentials',
        client_id: 'vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW',
        client_secret: 'bx9RsyfRlesCpNa5SnRXTox2w2NvWSOSYy8MWGVf',
      },
      success: function(response) {
        console.log(response);
        token = response.access_token;
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('expiryDate', expiryDate);
      },
      error: function(error) {
        console.log(error);
      }
    });
  };

function getDogs(zipCode, limit) {
        $.ajax({
        url: 'https://api.petfinder.com/v2/animals?type=dog&status=adoptable&has_photo=1',
        type: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            'type': 'dog',
            'location': zipCode,
            'limit': '15',
            'fields': 'name,age,gender,breeds,photos',
        }
    })
    .done(function(data) {
        console.log(data);
        const dogContainer = $('#additionalDogEl');
        const repeatDogs = {};

            const uniqueDogs = data.animals.filter(dog => {
                if (repeatDogs[dog.name]) {
                    return false;
                } else {
                    repeatDogs[dog.name] = true;
                    return true;
                }
            }).slice(0, 5);
            uniqueDogs.forEach(dog => {
            const card = $('<div></div>').addClass('card');
            const name = $('<h2></h2>').text(dog.name);
            const age = $('<p></p>').text(`Age: ${dog.age}`).addClass('title');
            const gender = $('<p></p>').text(`Gender: ${dog.gender}`);
            const breed = $('<p></p>').text(`Breed: ${dog.breeds.primary}`);
            const link = $('<a></a>').attr('href', dog.url).text('Adopt Me!');
            const photo = $('<img>').attr('src', dog.photos[0].medium).addClass('responsive-img');
          
            const cardContent = $('<div></div>').addClass('card-content').append(name, age, gender, breed, link, photo);
            const cardImage = $('<div></div>').addClass('card-image').append(photo);
          
            const row = $('<div></div>').addClass('row').append(
              $('<div></div>').addClass('col s8').append(cardContent),
              $('<div></div>').addClass('col s4').append(cardImage)
            );
          
            card.append(row);
            dogContainer.append(card);
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(`AJAX request failed: ${textStatus}, ${errorThrown}`);
    });
    
    };

    function getVetShelters (zipCode) {
        const dogOfficesURL = `https://api.petfinder.com/v2/organizations?type=vet,shelter&location=${zipCode}&has_phone=true&has_website=true&limit=5`;

        $.ajax({
            url: dogOfficesURL,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                const orgContainer = $('#vetEl');
        
                $.each(data.organizations, function(location, org) {
                    const card = $('<div>').addClass('card');
                    const name = $('<h2>').text(org.name);
                    const address = $('<p>').text(`Address: ${org.address.address1}, ${org.address.city}, ${org.address.state}, ${org.address.postcode}`);
                    const phone = $('<p>').text(`Phone: ${org.phone}`);
                    const website = $('<a>').attr('href', org.website).text(org.website);
        
                    card.append(name, address, phone, website);
                    // card.append(address);
                    // card.append(phone);
                    // card.append(website);
        
                    orgContainer.append(card);
                });
            },
            error: function(error) {
                console.error(error);
            }
        });
    };

   
    function getDogKnowledge() {
        $.ajax({
            url: 'https://dogapi.dog/api/v2/facts',
            type: 'GET',
            dataType: 'json',
            headers: {
              'accept': 'application/json'
            },
            data: {
              'limit': '5'
            },
            success: function(response) {
            console.log(response);
              var dogFactEl = $('#dogFactEl');
              $.each(response.data, function(index, fact) {
                var card = $('<div>').addClass('card');
                var content = $('<div>').addClass('card-content');
                var body = $('<p>').text(fact.attributes.body).addClass('text');
                content.append(body);
                card.append(content);
                dogFactEl.append(card);
              });
            },
            error: function(xhr, status, error) {
              console.log(error);
            }
          });
        };
    
    

