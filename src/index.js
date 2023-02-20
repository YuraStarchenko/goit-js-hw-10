//	!HTTP-запит :
//		1) Використовуй публічний API Rest Countries v2, а саме ресурс name, 
//     		який повертає масив об'єктів країн, що задовольнили критерій пошуку.
//		2) Додай мінімальне оформлення елементів інтерфейсу.
//		3) Напиши функцію fetchCountries(name), 
//				яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту.
//		4) Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.
//	!Фільтрація полів:
//		5) У відповіді від бекенду повертаються об'єкти,
//				додай рядок параметрів запиту - таким чином цей бекенд реалізує фільтрацію полів.
//		6) Ознайомся з документацією синтаксису фільтрів :
//				Тобі потрібні тільки наступні властивості:
//				name.official - повна назва країни
//				capital - столиця
//				population - населення
//				flags.svg - посилання на зображення прапора
//				languages - масив мов
//	!Поле пошуку:
//		7) Необхідно застосувати прийом Debounce на обробнику події і робити HTTP-запит через 300мс після того
//	 			як користувач перестав вводити текст. Використовуй пакет lodash.debounce.
//		8) Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, 
//				а розмітка списку країн або інформації про країну зникає.
//		9) Виконай санітизацію введеного рядка методом trim(), це вирішить проблему,
//				коли в полі введення тільки пробіли, або вони є на початку і в кінці рядка.
//	!Інтерфейс:
//		10) Якщо у відповіді бекенд повернув більше ніж 10 країн,
//					в інтерфейсі з'являється повідомлення про те, 
//					що назва повинна бути специфічнішою.
//		11)  Для повідомлень використовуй бібліотеку notiflix 
//					і виводь такий рядок 
//					"Too many matches found. Please enter a more specific name.".
//		12) Якщо бекенд повернув від 2-х до 10-и країн, 
//					під тестовим полем відображається список знайдених країн.
//		13) Кожен елемент списку складається з прапора та назви країни.
//		14) Якщо результат запиту - це масив з однією країною,
//					в інтерфейсі відображається розмітка картки з даними про 
//					країну: прапор, назва, столиця, населення і мови.
//	!Обробка помилки:
//		15) Якщо користувач ввів назву країни, 
//					якої не існує, бекенд поверне не порожній масив,
//					а помилку зі статус кодом 404 - не знайдено.
//		16) Якщо це не обробити, то користувач ніколи не дізнається про те,
//					що пошук не дав результатів.
//		17) Додай повідомлення "Oops, there is no country with that name" у разі помилки, 
//					використовуючи бібліотеку notiflix.
//
//	!УВАГА : 
//		!Не забувай про те, що fetch не вважає 404 помилкою, тому необхідно явно відхилити проміс, 
//			!щоб можна було зловити і обробити помилку.
//

import './css/styles.css';
//	4) Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.
import { fetchCountries } from './service/fetchCountries';
//	11) Для повідомлень використовуй бібліотеку notiflix 
//				і виводь такий рядок 
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// 7) Використовуй пакет lodash.debounce.
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
};

//	7) Необхідно застосувати прийом Debounce на обробнику події і робити HTTP-запит через 300мс після того
//	 		як користувач перестав вводити текст.
refs.searchBox.addEventListener('input', debounce(onShowCountry, DEBOUNCE_DELAY));
//	8) Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, 
//			а розмітка списку країн або інформації про країну зникає.
function onShowCountry(e) {
	let searchBoxValue = '';
//	9) Виконай санітизацію введеного рядка методом trim(), це вирішить проблему,
//			коли в полі введення тільки пробіли, або вони є на початку і в кінці рядка.
	searchBoxValue = e.target.value.trim();

	refs.countryList.innerHTML = '';
	refs.countryInfo.innerHTML = '';

	if(searchBoxValue.length === 0) return;

	fetchCountries(searchBoxValue)
	.then(country => onMarkupCountries(country))
	.catch(error => {
		console.log(error);
	});
}


function onMarkupCountries(data){
	// console.log(data);
	//	10) Якщо у відповіді бекенд повернув більше ніж 10 країн,
//				в інтерфейсі з'являється повідомлення про те, 
//				що назва повинна бути специфічнішою.
	if(data.length === 1) {
		createMarkupCountriInfo(data);
//	12) Якщо бекенд повернув від 2-х до 10-и країн, 
//			під тестовим полем відображається список знайдених країн.
	} else if (data.length > 2 && data.length <= 10) {
		createMarkupCountries(data);
	} else {
		Notify.info('Too many matches found. Please enter a more specific name.');
	}
}
//	13) Кожен елемент списку складається з прапора та назви країни.
function createMarkupCountries(arr){
  const markup = arr
    .map(({ name, flags }) => {
      return `<li class="country-name">
				<img class="country-img" src="${flags.svg}" alt="${flags.alt}" width="70" heigth="30">
      	<h2 class="official">${name.official}</h2>
    	</li>`;
		}).join('');
		refs.countryList.innerHTML = markup;
}
//	14) Якщо результат запиту - це масив з однією країною,
//				в інтерфейсі відображається розмітка картки з даними про 
//				країну: прапор, назва, столиця, населення і мови.
function createMarkupCountriInfo(arr){
	const markup = arr
	.map(({ name, flags, capital, population, languages }) => {
		return `<li class="country-item">
		<h2>Country: ${name.official}</h2>
		<img class="country-img" src="${flags.svg}" alt="${flags.alt}" width="70" heigth="50">
			<p><span class="style">Capital:</span> ${capital}</p>
			<p><span class="style">Population:</span> ${population}</p>
			<p><span class="style">Languages:</span> ${Object.values(languages).join(',')}</p>
		</li>`;
	}).join('');
	refs.countryInfo.innerHTML = markup;
}