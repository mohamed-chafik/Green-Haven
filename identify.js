 // Get references to the button and file input
 const uploadBtn = document.getElementById('Upload');
 const fileInput = document.getElementById('fileInput');

 // Trigger the file input when the button is clicked
 uploadBtn.addEventListener('click', () => {
   fileInput.click();
 });

 fileInput.addEventListener('change', (event) => {
   var file = event.target.files[0]; 
   if (!file) {
    alert('Please select an image file.');
    return;
  }

  // Create FormData and append the image
  const formData = new FormData();
  const popup = document.querySelector('.popup-window');
  const close = document.querySelector('.close-menu');
                 
  formData.append('images', file); // 'images' is the key expected by the API

  // Make the API call
  fetch('https://api.plant.id/v2/identify', {
    method: 'POST',
    headers: {
      'Api-Key': 'I1zmBgZCgCnXf33KnCK4V60i2RgbwPQC8IuoQmE5LgyWcLrM9o' // Replace with your actual API key
    },
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      // Display the result
      console.log(data)
      popup.style.display = 'block';
      const imageUrl = URL.createObjectURL(file);
      document.getElementById("images").src = imageUrl;
      document.getElementById("plant_id").innerText = data.suggestions[0].plant_name;

      function fetchPlantById(id) {

        fetch('/plants.json')
            .then(response => response.json())
            .then(plantsData => {
                const plant = plantsData.find(plant => plant.id === id);
    
                if (plant) {
                    console.log('Plant Data:', plant);
                    displayPlantDetails(plant);
                } else {
                    console.error(`Plant with ID ${id} not found.`);
                }
            })
            .catch(error => console.error('Error fetching plant data:', error));
    }
      function displayPlantDetails(plant) {
        document.getElementById("plant_sun").innerText = plant.specifics.sun_exposure
        document.getElementById("plant_water").innerText = plant.specifics.watering
        document.getElementById("plant_poison").innerText = plant.specifics.poisonous_to_pets
        document.getElementById("plant_suit").innerText = plant.specifics.suitable_for
        document.getElementById("plant_growth").innerText = plant.specifics.growth_habit
        document.getElementById("plant_height").innerText = plant.specifics.max_height
        document.getElementById("plant_cones").innerText = plant.specifics.has_cones
        document.getElementById("plant_fruit").innerText = plant.specifics.fruit
        document.getElementById("plant_care").innerText = plant.specifics.care_level
   
         }

const num = Math.floor(Math.random()*45);
const plantId = num.toString(); 
if (plantId){
fetchPlantById(plantId)
}


      close.addEventListener('click', () => {
           popup.style.display = 'none';
      });
       popup.addEventListener('click', () => {
       popup.style.display = 'none';
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
 });



