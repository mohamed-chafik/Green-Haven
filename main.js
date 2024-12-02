fetch('/plants.json')
.then(response => response.json())
.then (PlantsData => {

    function createCarCards(Plants) {
        
        const container = document.querySelector('.plants_page');
        container.innerHTML = ''; // Clear existing cards
        const title = document.querySelector(".Arrivals")
        title.style.marginTop = '50px'
        Plants.forEach(plant => {
            let card = document.createElement('div');
            card.className = 'card-list';
            card.id = plant.id;
            card.style.marginTop = '34px';

            const article = document.createElement('article');
            article.className = 'card';
            card.appendChild(article);
            

            const figure = document.createElement('figure');
            figure.className = 'card-image';
            article.appendChild(figure);

            const thumbnail = document.createElement('img');
            thumbnail.src = plant.images[0];
            figure.appendChild(thumbnail);

            const header = document.createElement('div');
            header.className = 'card-header';
            article.appendChild(header);

            const title = document.createElement('a');
            title.innerHTML = plant.name;
            header.appendChild(title);

            const heart = document.createElement('button');
            heart.className = 'icon-button';
            heart.innerHTML = ('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" display="block" id="Heart"><path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" /></svg>');
            header.appendChild(heart);

            const card_footer = document.createElement('div');
            card_footer.className = 'card-footer';
            article.appendChild(card_footer);

            if(plant.specifics.sun_exposure){
                const sun = document.createElement('div')
                sun.className = 'water_icon';
                const ico = document.createElement('img')
                ico.src = '/assets/images/sun.svg'
                const hover = document.createElement('span');
                hover.className = 'hover-text';
                hover.innerHTML = plant.specifics.sun_exposure;
                sun.appendChild(hover)
                sun.appendChild(ico);

                card_footer.appendChild(sun)
            }

            if(plant.specifics.watering){
                const water = document.createElement('div')
                water.className = 'water_icon';
                const ico = document.createElement('img')
                ico.src = '/assets/images/water.svg'
                const hover = document.createElement('span');
                hover.className = 'hover-text';
                hover.innerHTML = plant.specifics.watering;
                water.appendChild(hover)
                water.appendChild(ico);

                card_footer.appendChild(water)
            }

            if(plant.specifics.fruit){
                const fruit = document.createElement('div')
                fruit.className = 'water_icon';
                const ico = document.createElement('img')
                ico.src = '/assets/images/fruit.svg'
                const hover = document.createElement('span');
                hover.className = 'hover-text';
                hover.innerHTML = 'Has Fruit';
                fruit.appendChild(hover)
                fruit.appendChild(ico);

                card_footer.appendChild(fruit)
            }
            if(plant.specifics.poisonous_to_pets){
                const poisonous_to_pets = document.createElement('div')
                poisonous_to_pets.className = 'water_icon';
                const ico = document.createElement('img')
                ico.src = '/assets/images/poison.png'
                const hover = document.createElement('span');
                hover.className = 'hover-text';
                hover.innerHTML = 'Poisonous to pets';
                poisonous_to_pets.appendChild(hover)
                poisonous_to_pets.appendChild(ico);

                card_footer.appendChild(poisonous_to_pets)
            }
            if(plant.specifics.suitable_for){
                const suitable_for = document.createElement('div')
                suitable_for.className = 'water_icon';
                const ico = document.createElement('img')
                ico.src = '/assets/images/outdour.svg'
                const hover = document.createElement('span');
                hover.className = 'hover-text';
                hover.innerHTML = plant.specifics.suitable_for;
                suitable_for.appendChild(hover)
                suitable_for.appendChild(ico);

                card_footer.appendChild(suitable_for)
            }
            if(plant.specifics.has_cones){
                const has_cones = document.createElement('div')
                has_cones.className = 'water_icon';
                const ico = document.createElement('img')
                ico.src = '/assets/images/pine-cone.png'
                const hover = document.createElement('span');
                hover.className = 'hover-text';
                hover.innerHTML = "Has Cones";
                has_cones.appendChild(hover)
                has_cones.appendChild(ico);

                card_footer.appendChild(has_cones)
            }

            
            container.appendChild(card);
              // Add click event listener to the card
            card.addEventListener('click', () => {
                const id = card.id
                localStorage.setItem('id', id);
                window.location.href = 'PlantData.html'
            });
        });
    }

    document.querySelector('body').style.backgroundColor = 'rgb(221 221 221)';
    document.querySelector('.plants_page').style.backgroundColor = 'rgb(221 221 221)';
    document.querySelector('ul').style.color = '#3c403d';
    document.querySelector('.header a').style.color = '#3c403d';
    document.querySelector('.account_icon span').style.color = '#3c403d';
    createCarCards(PlantsData)

});


