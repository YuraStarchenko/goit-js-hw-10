//		1) Використовуй публічний API Rest Countries v2, а саме ресурс name, 
//     		який повертає масив об'єктів країн, що задовольнили критерій пошуку.
const URL = `https://restcountries.com/v3.1/name/`;
const FIELDS = 'name,capital,population,flags,languages';
//		3) Напиши функцію fetchCountries(name), 
//				яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту.
export async function fetchCountries(name){
	const response = await fetch(`${URL}/${name}?fields=${FIELDS}`);
	if (!response.ok) {
		throw new Error('Sorry no country with that name!');
	}
	return await response.json();
}
