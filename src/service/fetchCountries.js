//	17) Додай повідомлення "Oops, there is no country with that name" у разі помилки, 
//				використовуючи бібліотеку notiflix.
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//		1) Використовуй публічний API Rest Countries v2, а саме ресурс name, 
//     		який повертає масив об'єктів країн, що задовольнили критерій пошуку.
const URL = `https://restcountries.com/v3.1/name/`;
//		6) Ознайомся з документацією синтаксису фільтрів :
//				Тобі потрібні тільки наступні властивості:
//				name.official - повна назва країни
//				capital - столиця
//				population - населення
//				flags.svg - посилання на зображення прапора
//				languages - масив мов
const FIELDS = 'name,capital,population,flags,languages';
//		3) Напиши функцію fetchCountries(name), 
//				яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту.
export async function fetchCountries(name){
//	5) У відповіді від бекенду повертаються об'єкти,
//			додай рядок параметрів запиту - таким чином щоб цей бекенд реалізує фільтрацію полів.
	const response = await fetch(`${URL}/${name}?fields=${FIELDS}`);
	if (!response.ok) {
//	15) Якщо користувач ввів назву країни, 
//				якої не існує, бекенд поверне не порожній масив,
//				а помилку зі статус кодом 404 - не знайдено.
		throw new Error(
				Notify.failure('Oops, there is no country with that name')
			);
	}
	return await response.json();
}
