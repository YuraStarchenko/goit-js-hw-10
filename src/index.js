import './css/styles.css';
import { fetchCountries } from './service/fetchCountries';
// import {} from './service/countrySearch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
	icon: document.querySelector('.icon'),
	search: document.querySelector('.search'),
	clear: document.querySelector('.clear'),
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
};

refs.icon.onclick = function() {
	refs.search.classList.toggle('active');
};

refs.clear.onclick = function() {
	document.getElementById('search-box').value = '';
};

refs.searchBox.addEventListener('input', debounce(onShowCountry, DEBOUNCE_DELAY));

function onShowCountry(e) {
	let searchBoxValue = '';
	searchBoxValue = e.target.value.trim();

	refs.countryList.innerHTML = '';
	refs.countryInfo.innerHTML = '';

	if(searchBoxValue.length === 0) return;

	fetchCountries(searchBoxValue)
	.then(country => onMarkupCountries(country))
	.catch(onErrorFetch);
}

function onMarkupCountries(data){
	console.log(data);

	if(data.length === 1) {
		createMarkupCountriInfo(data);
	} else if (data.length > 1 && data.length <= 10) {
		createMarkupCountries(data);
	} else {
		onInfoFetch();
	}
}



function onInfoFetch(){
	Notify.info('Too many matches found. Please enter a more specific name.');
}

function onErrorFetch(){
	Notify.failure('Oops, there is no country with that name');
}

function createMarkupCountries(arr){
  const markup = arr
    .map(({ name, flags }) => {
      // console.log(el);
      return `<li class="country-name">
			<img src="${flags.svg}" alt="${flags.alt}" width="70" heigth="30">
      <h2 class="official">${name.official}</h2>
    </li>`;
    })
    .join('');

  refs.countryList.innerHTML = markup;
}

function createMarkupCountriInfo(arr){
	const markup = arr
	.map(({ name, flags, capital, population, languages }) => {
		// console.log(el);
		return `<li>
		<h2>Country: ${name.official}</h2>
	<img src="${flags.svg}" alt="${flags.alt}" width="70" heigth="50">
	<p><span class="style">Capital:</span> ${capital}</p>
	<p><span class="style">Population:</span> ${population}</p>
	<p><span class="style">Languages:</span> ${Object.values(languages).join(
		'',
		''
	)}</p>
	</li>`;
	})
	.join('');

	refs.countryInfo.innerHTML = markup;
}