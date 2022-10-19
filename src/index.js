import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountry } from './fetchCountries';
import { Notify } from 'notiflix';


const inputValue = document.querySelector('#search-box');
const container = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


inputValue.addEventListener('input',debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry (e){
   const form = e.target.value.trim();
   clearMarkup();

   fetchCountry(form)
.then(validationCountryCard)
.catch(error);
}


function validationCountryCard(countries) {
   clearMarkup();

   if (countries.length > 10) {
       Notify.info('Too many matches found. Please enter a more specific name.');
   } else if (countries.length > 1){
      renderCityCard(countries)
   } else {
      renderCityCardinfo(countries)
   }
}


function renderCityCard(data){
   const markup = creatMarkupCountry(data);
   container.insertAdjacentHTML('beforeend', markup)
}

function renderCityCardinfo(data){
   const markup = creatMarkupCountryInfo(data);
   countryInfo.insertAdjacentHTML('beforeend', markup)
}


 function creatMarkupCountry (countries){
return countries.map(item =>`<li class="item-list">
    <h2><img src="${item.flags.svg}" alt="${item.capital}"  width=40px/> ${item.name.official}</h2>
  </li>`).join('');
 }

 function creatMarkupCountryInfo (countries){
   return countries.map(item =>`<li class="item-list">
       <h2><img src="${item.flags.svg}" alt="${item.capital}"  width=60px/> ${item.name.official}</h2>
       <p><b>Capital:</b> ${item.capital}</p>
       <p><b>Population:</b> ${item.population}</p>
       <p><b>Languages:</b> ${Object.values(item.languages)}</p>
     </li>`).join('');
    }
 

 function clearMarkup(){
   container.innerHTML= '';
   countryInfo.innerHTML='';
 }

function error(){
   Notify.failure('Oops, there is no country with that name')
}
