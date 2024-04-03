const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    APIHandler.getFullList ()
    .then(characters => {
        if (characters) {
            displayCharacters(characters);
        } else {
           
            console.log('No characters found.');
        }
    })
    .catch(error => console.error('Error fetching characters:', error));

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('input[name="character-id"]').value;
    if (characterId) {
        APIHandler.getOneRegister(characterId)
            .then(character => {
                if (character) {
                    // Display the character
                    console.log('Character:', character);
                } else {
                    // Handle case where character with given ID is not found
                    console.log(`Character with ID ${characterId} not found.`);
                }
            })
            .catch(error => console.error('Error fetching character:', error));
    } else {
        // Handle case where character ID is not provided
        console.log('Please enter a character ID.');
    }
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('input[name="character-id-delete"]').value;
    if (characterId) {
        APIHandler.deleteOneRegister(characterId)
            .then(deletedCharacter => {
                if (deletedCharacter) {
                    // Handle case where character is successfully deleted
                    console.log('Character deleted:', deletedCharacter);
                } else {
                    // Handle case where character with given ID is not found
                    console.log(`Character with ID ${characterId} not found.`);
                }
            })
            .catch(error => console.error('Error deleting character:', error));
    } else {
        // Handle case where character ID is not provided
        console.log('Please enter a character ID.');
    }

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const characterId = formData.get('chr-id');
    const updatedCharacterData = {
        name: formData.get('name'),
        occupation: formData.get('occupation'),
        weapon: formData.get('weapon'),
        cartoon: formData.get('cartoon') === 'on' ? true : false
    };
    APIHandler.updateOneRegister(characterId, updatedCharacterData)
        .then(updatedCharacter => {
            if (updatedCharacter) {
                // Handle case where character is successfully updated
                console.log('Character updated:', updatedCharacter);
            } else {
                // Handle case where character with given ID is not found
                console.log(`Character with ID ${characterId} not found.`);
            }
        })
        .catch(error => console.error('Error editing character:', error));

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
        const formData = new FormData(event.target);
        const newCharacterData = {
            name: formData.get('name'),
            occupation: formData.get('occupation'),
            weapon: formData.get('weapon'),
            cartoon: formData.get('cartoon') === 'on' ? true : false
        };
        APIHandler.createOneRegister(newCharacterData)
            .then(newCharacter => {
                if (newCharacter) {
                    // Handle case where character is successfully created
                    console.log('New character created:', newCharacter);
                } else {
                    // Handle case where character creation failed
                    console.log('Error creating character.');
                }
            })
            .catch(error => console.error('Error creating character:', error));
    });

  });


function displayCharacters(characters) {
  const charactersContainer = document.querySelector('.characters-container');
  charactersContainer.innerHTML = '';

  characters.forEach(character => {
      const characterInfo = document.createElement('div');
      characterInfo.classList.add('character-info');

      const nameElement = document.createElement('div');
      nameElement.classList.add('name');
      nameElement.textContent = `Name: ${character.name}`;

      const occupationElement = document.createElement('div');
      occupationElement.classList.add('occupation');
      occupationElement.textContent = `Occupation: ${character.occupation}`;

      const cartoonElement = document.createElement('div');
      cartoonElement.classList.add('cartoon');
      cartoonElement.textContent = `Is a Cartoon? ${character.cartoon ? 'Yes' : 'No'}`;

      const weaponElement = document.createElement('div');
      weaponElement.classList.add('weapon');
      weaponElement.textContent = `Weapon: ${character.weapon}`;

      characterInfo.appendChild(nameElement);
      characterInfo.appendChild(occupationElement);
      characterInfo.appendChild(cartoonElement);
      characterInfo.appendChild(weaponElement);

      charactersContainer.appendChild(characterInfo);
  });
}