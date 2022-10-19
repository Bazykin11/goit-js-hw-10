const BASE_URL = "https://restcountries.com/v3.1/";

export function fetchCountry(countryName){
    return fetch(`${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`).then(response => {
       if (!response.ok){
           throw new Error()
       }
       return response.json();
    })
 }

