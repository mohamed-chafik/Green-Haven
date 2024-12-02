function changeImage(index) {
    const middleElement = document.querySelector(".middle");

    // Trigger fade-out effect
    middleElement.classList.add('fade-out');

    // Wait for the fade-out transition to complete before changing the image
    setTimeout(() => {
      middleElement.style.backgroundImage = `url(assets/images/plant.png)`;
      middleElement.classList.remove('fade-out');
      middleElement.classList.add('fade-in');

      // Remove the fade-in class after the animation completes
      setTimeout(() => {
        middleElement.classList.remove('fade-in');
      }, 500); // Match the duration of the fade-in animation
    }, 500);}



    let num = 0;
    let currentPlant = null;  // Holds the current plant data
    
    // Function to fetch plant details by ID
    function fetchPlantById(id) {
      fetch('/plants.json')
        .then(response => response.json())
        .then(plantsData => {
          // Find the plant with the matching ID
          const plant = plantsData.find(plant => plant.id === id);
    
          if (plant) {
            currentPlant = plant; // Store the plant object
            displayPlantDetails(plant);
            loadSliderImages(plant);
          } else {
            console.error(`Plant with ID ${id} not found.`);
          }
        })
        .catch(error => console.error('Error fetching plant data:', error));
    }
    
  
function displayPlantDetails(plant) {
     document.getElementById("Plant_description").innerText = plant.description;
     document.getElementById("plant_sun").innerText = plant.specifics.sun_exposure
     document.getElementById("plant_water").innerText = plant.specifics.watering
     document.getElementById("plant_poison").innerText = plant.specifics.poisonous_to_pets
     document.getElementById("plant_suit").innerText = plant.specifics.suitable_for
     document.getElementById("plant_growth").innerText = plant.specifics.growth_habit
     document.getElementById("plant_height").innerText = plant.specifics.max_height
     document.getElementById("plant_cones").innerText = plant.specifics.has_cones
     document.getElementById("plant_fruit").innerText = plant.specifics.fruit
     document.getElementById("plant_care").innerText = plant.specifics.care_level
     document.getElementById("Plant_name").innerText = plant.name
     document.getElementById("tip1").innerText = plant.tips[0]
     document.getElementById("tip2").innerText = plant.tips[1]
    document.getElementById('plant_photo').src = plant.images[0]


}

// Function to load the images for the slider
function loadSliderImages(plant) {
    if (plant.images && plant.images.length > 0) {
      num = 0; // Start with the first image
      document.getElementById('sl').src = plant.images[num]; // Set the first image
    }
  }
  
  // Function to change the image in the slider
  function change(direction) {
    if (!currentPlant || !currentPlant.images) return;
  
    // Update the num value based on the direction
    if (direction === 'left') {
      num = (num === 0) ? currentPlant.images.length - 1 : num - 1;
    } else if (direction === 'right') {
      num = (num + 1) % currentPlant.images.length;
    }
  
    // Update the image source
    document.getElementById('sl').src = currentPlant.images[num];
  }




const plantId = localStorage.getItem("id");
if (plantId){
fetchPlantById(plantId)
fetchUsers(plantId)
}

function fetchUsers(id) {
    fetch('/Users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(usersData => {
            // Find users who own the plant with the matching ID
            const users = usersData.filter(user => 
                user.plants_owned.some(plant => plant.plant_id === id)
            );

            users.forEach(user => {
                let card = document.querySelector('.horizontal-friends-list');
                let figure = document.createElement('figure')
                figure.id = user.name
                card.appendChild(figure)

                let picture = document.createElement('picture')
                figure.appendChild(picture)
                let image = document.createElement('img')
                image.src = user.profile_picture
                picture.appendChild(image)
                let caption = document.createElement('figcaption')
                caption.innerText = user.name
                figure.appendChild(caption)


                figure.addEventListener('click', () => {
                    const id = figure.id
                    localStorage.setItem('user_id', id);
                    window.location.href = 'Account.html'

                });
                
               
            })
        })
        .catch(error => console.error('Error fetching user data:', error));
}


UserId = localStorage.getItem("user_id")
if (UserId){
    fetchPlantOwned(UserId)
}
function fetchPlantOwned(id) {

    fetch('/Users.json')
        .then(response => response.json())
        .then(plantsData => {
            const user = plantsData.find(user => user.name === id);

            if (user) {
                console.log('Plant Data:', user);
                FillData(user)
            }
        })
        .catch(error => console.error('Error fetching plant data:', error));
}


function FillData(user){
document.getElementById('UserName').innerText = user.name;
document.getElementById('profile').src = user.profile_picture;
document.getElementById('Plants_number').innerText = (user.plants_owned).length
const plants = user.plants_owned
plants.forEach(plant=>{
    const container= document.querySelector('.contain')
    const card1 = document.createElement('div')
    card1.className = 'card1'
    container.appendChild(card1)
    const plant_photo = document.createElement('img')
    card1.appendChild(plant_photo)
    plant_photo.src = plant.images[0];
    const content = document.createElement('div')
    card1.appendChild(content)
    content.className = 'card__content';
    const plant_name = document.createElement('p')
    plant_name.className = 'card__title';
    content.appendChild(plant_name)
    plant_name.innerText = plant.name
    const description = document.createElement('p')
    description.className = 'card__description';
    content.appendChild(description);
    description.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a.'

})
}