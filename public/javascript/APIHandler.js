const axios = require('axios');

class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {

    return axios.get (this.BASE_URL)
    .then (response => response.data)
    .catch (error => {
      console.error("Error getting full list:", error); 
      
    }); 

  }

  getOneRegister (id) {
    return axios.get( `${this.BASE_URL}/${id}`)
    .then (response => response.data)
    .catch(error => console.log(error)
      
    ); 

  }

  createOneRegister (characterData) {
    return axios.post(this.BASE_URL, characterData)
    .then (response =>response.data)
    .catch(error => console.log(error)); 

  }

  updateOneRegister (id, updatedCharacter) {
return axios.put(`${this.BASE_URL}/${id}`, updatedCharacter)
.then(response => response.data)
.catch(error => console.log (error)); 
  }

  deleteOneRegister (id) {
    return axios.delete (`${this.baseURL}/${id}`)
    .then (response => response.data)
    .catch(error => console.log (error)); 

  }
}

