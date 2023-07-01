/* Календар */

// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { flsModules } from "../modules.js";

// Підключення модуля
import datepicker from 'js-datepicker';

if (document.querySelector('[data-datepicker]')) {


	const start = datepicker('.data-start',
		{
			dateSelected: new Date,
			id: 1,
			startDay: 1,
			formatter: (input, date, instance) => {
				const value = date.toLocaleDateString()
				input.value = value
			},
			onSelect: function (input, instance, date) {

			}
		});
	const end = datepicker('.data-end',
		{
			id: 1,
			startDay: 1,
			formatter: (input, date, instance) => {
				const value = date.toLocaleDateString()
				input.value = value
			},
			onSelect: function (input, instance, date) {

			}
		})

	flsModules.datepicker = start;
	flsModules.datepicker = end;

}
