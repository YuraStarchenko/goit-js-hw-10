// const URL = 'https://restcountries.com/v3.1/name/';

fetch('https://restcountries.com/v3.1/name');
then(res => res.json());

// export function fetchCountries(name){
// 	fetch(`${URL}/${name}?fields=name,capital,population,flags,languages`).then(response => {
// 		if(!response.ok){
// 			throw new Error('Sorry no country with that name!');
// 		}
// 		return response.json();
// 	});
// }
