import './css/styles.css';
import { fetchCountries } from './service/fetchCountries';
import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;

// const refs = {
//   searchBox: document.getElementById('search-box'),
//   countryList: document.querySelector('.country-list'),
// 	countryInfo: document.querySelector('.country-info'),
// };

// refs.searchBox.addEventListener(
// 	'input', 
// 	debounce(() => {
// 	const country = refs.searchBox.value;
// 	fetchCountries(country).then(onShowCountry);
// 	}, DEBOUNCE_DELAY)
// );

// function onShowCountry({
// 	name,
// 	capital,
// 	population,
// 	flags,
// 	languages
// }) {
// 	const countryInfo = `<div class="country">
// 	<img src="${flags}" class="flags-country" alt="flags" width="30">
// 		<div class="information">
// 			<h1 class="name">${name}</h1>
// 		</div>
// 		<ul class="population">
// 			<li>capital: <span>${capital}</span></li>
// 			<li>population: <span>${population}</span></li>
// 			<li>languages: <span>${languages}</span></li>
// 		</ul>
// 	</div>`

// 	console.log(countryInfo);
// }