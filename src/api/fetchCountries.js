const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name){
	fetch(`${URL}/${name}?fields=name,capital,population,flags,languages`).then(response => {
		if(!response.ok){
			throw new Error('Data fail!');
		}
		return response.json();
	});
}