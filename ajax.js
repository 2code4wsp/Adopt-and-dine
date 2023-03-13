

const petKey = 'vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW'
const petSecret = 'bx9RsyfRlesCpNa5SnRXTox2w2NvWSOSYy8MWGVf'



const dogURL = `https://api.petfinder.com/v2/animals?type=dog&location=97215&limit=3&fields=name,age,gender,breeds,photos`;

//let authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2TzN5YnBzZkpJNmdpM1VRNGJQbUxXOTFkRnNNOHpPaDVUc2duampSUVkwc1RrTWdnVyIsImp0aSI6ImQ5M2ExZGMyOWE2ZTQ2YjY2MmNjOWMwMDkwM2VlNWU1YjVkNTlhNDQ5ZjdiN2NlMjJhNzFhZjk1ZTRjMDk1N2RjZWIxMjE4NjAwYTc3ZmZmIiwiaWF0IjoxNjc4NTkyOTI5LCJuYmYiOjE2Nzg1OTI5MjksImV4cCI6MTY3ODU5NjUyOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.vZDwgBSHfNCBfiV8sj4bvK03yaQ6TmSSl78vhbcTDfKAY6xNQ6kgCjk_0eAUhNXTHeEozcTiKa2mXQoxOOISaegvu_oiNLryLfIPey1NdWhNI8ccn8MoVhFet4iirMe8Yh0Kive3ArhMbAkNh8P4-SuDMem3ox8LPXdvxpwA5n8Dr4iS1ji1VyCbmWw2JqKjxxYnzns1xgVlC7A9UerQ55Exizd0nw9_fJOFWm8ppe27wK5vodG1_yVase2WGzLazTQpushHDnoTsdTf7oQM7l0UXyQl-gyV_5ZwkyjyjX6Qc1akgOXBQNA-UBnot_aU1AF4VmgbQwLyG2chkQT_Rw'
let authTokenExpirationTime;

function getToken() {

  // Check if the token has expired
   //if (!authToken || new Date() >= authTokenExpirationTime) {
    // Make a request to the authentication endpoint to obtain a new token
    $.ajax({
       type: "POST",
       url: "https://api.petfinder.com/v2/oauth2/token",
       data: {
         grant_type: "client_credentials",
         client_id: "vO3ybpsfJI6gi3UQ4bPmLW91dFsM8zOh5TsgnjjRQY0sTkMggW",
         client_secret: "bx9RsyfRlesCpNa5SnRXTox2w2NvWSOSYy8MWGVf",
       }
     })
     .done(function(response) {
         console.log(response);
       authToken = response.access_token;
       console.log(authToken);
       localStorage.setItem('authToken',response.access_token), 
       // Set the expiration time for the new token to one hour from the current time
       authTokenExpirationTime = new Date().getTime() + response.expires_in * 1000;
     });
   }



 getToken();

 let authToken = localStorage.getItem('authToken')

 //let authToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2TzN5YnBzZkpJNmdpM1VRNGJQbUxXOTFkRnNNOHpPaDVUc2duampSUVkwc1RrTWdnVyIsImp0aSI6Ijc5NTVhMmNmMmEyZDRlNDdhYmUzYWVmYTQwMjg0OTljNTdkMzZhNTEwZTU5OGFkNjdjZWJlMzYzMDVkZjgyNTdjMTVlMjRjNjk5NWQ4NmIzIiwiaWF0IjoxNjc4NjU2ODIwLCJuYmYiOjE2Nzg2NTY4MjAsImV4cCI6MTY3ODY2MDQyMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.w6ABe2QezH5NtpQOE1JM-9Ejz2TBdhqvN2_uVPUpLItTUk9LFKElzxgR6PRBd12oCP8UKLUx5aDRcp8QynnOsnG7f57_rCwcgl240jS1wZOX5ai5rwYsKf9KAvIMZfdJSYkUt06dYxTkqIIpNC_sCwPTMmNT-hXT3HHOUbIAKpwxdrCe1NIE6nKTJPP9Spcm-zoB7iVvZq1hY9smhkyedJc9xUiatLekEdelpFtNTy3WeCvcyP-Vn_EgL6URx8tooM3siG-s7q7LW_iWI0QnPxxA7qAo1Euf1fdiVO7U8QP2EsoQxLNgZdgTSbJFXgtM1klQELiEk5s7fW7aoVM9fA"

 function getDogs(location, limit) {
        
         $.ajax({
         url: 'https://api.petfinder.com/v2/animals?type=dog&status=adoptable&has_photo=1',
         type: 'GET',
         headers: {
             'Authorization': `Bearer ${authToken}`
         },
         data: {
             'type': 'dog',
             'location': '97215',
             'limit': '5',
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
     getDogs('97215', '5');

    const dogOfficesURL = `https://api.petfinder.com/v2/organizations?type=vet,shelter&location=97215&limit=5`;

    function getVetShelters (location, limit) {
        $.ajax({
            url: dogOfficesURL,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                //handle vet shelter data
                const vetContainer = $('#vetEl');
                const shelterContainer = $('#shelterEl');
        
                $.each(data.organizations, function(index, org) {
                    //create a card forEach
                    const card = $('<div>').addClass('card');
        
                    //add org info to card
                    const name = $('<h2>').text(org.name);
        
                    const address = $('<p>').text(`Address: ${org.address.address1}, ${org.address.city}, ${org.address.state}, ${org.address.postcode}`);
        
                    const phone = $('<p>').text(`Phone: ${org.phone}`);
        
                    const website = $('<a>').attr('href', org.website).text(org.website);
        
                    //add elements to card
                    card.append(name);
                    card.append(address);
                    card.append(phone);
                    card.append(website);
        
                    //place card in correct container
                    if (org.type === 'vet') {
                        vetContainer.append(card);
                    } else if (org.type === 'shelter') {
                        shelterContainer.append(card);
                    }
                });
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
getVetShelters('97215', '5');