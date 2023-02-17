import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
	textInput: document.getElementById('search-box'),
};

function fetchCountries(name){
	fetch('https://restcountries.com/v3.1/name')
	.then(response => {
		return response.json();
	})
	.then(response => {
		console.log(name);
	})
	.catch(error => {
		console.log(error);
	})
}