/**
 * Created by Jieyi on 1/14/16.
 */

$(document).ready(function ()
{
	// Date Picker!!
	var monthsFullName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	// Change this to my own
	var input = $('.datepicker').pickadate(
		{
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year
			// The title label to use for the month nav buttons
			labelMonthNext: 'Next Month',
			labelMonthPrev: 'Previous Month',
			// The title label to use for the dropdown selectors
			labelMonthSelect: 'Select a month',
			labelYearSelect: 'Select a year',
			// Months and weekdays
			monthsFull: monthsFullName,
			onthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			weekdaysFull: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			weekdaysShort: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
			// Materialize modified
			weekdaysLetter: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
			// Today and clear
			today: '',
			clear: '',
			close: 'Check',
			// The format to show on the 'input' element
			format: 'mmmm, yyyy'
		}
	);
	// Use the picker object directly.
	var picker = input.pickadate('picker');
	picker.on('close', function ()
	{
		var month = $('.picker__select--month');
		var year = $('.picker__select--year');

		// TODO : Selected value will be written to which tag. In the TAG I : We will get the value secretly. In the TAG INPUT : We will put the selected value to input area.
		//$('.datepicker').val(monthsFullName[month.val()] + ", " + year.val());
	});

	// Hidden Card!!
	$(document).on('click.card', '.card', function (e)
	{
		// Hidden card for expense edit!!
		if ($(this).find('.card-reveal-expense-edit').length)
		{
			if ($(e.target).is($('.card-reveal-expense-edit .card-title')) || $(e.target).is($('.card-reveal-expense-edit .card-title i')))
			{
				// Make Reveal animate down and display none
				$(this).find('.card-reveal-expense-edit').velocity(
					{
						translateY: 0
					}, {
						duration: 225,
						queue: false,
						easing: 'easeInOutQuad',
						complete: function ()
						{
							$(this).css({
								display: 'none'
							})
						}
					});
			}
			else if ($(e.target).is($('.card .activator-expense-edit')) || $(e.target).is($('.card .activator-expense-edit i')))
			{
				$(this).find('.card-reveal-expense-edit').css({
					display: 'block'
				}).velocity("stop", false).velocity({
					translateY: '-100%'
				}, {
					duration: 300,
					queue: false,
					easing: 'easeInOutQuad'
				});
			}
		}

		// Hidden card for expense new!!
		if ($(this).find('.card-reveal-expense-new').length)
		{
			if ($(e.target).is($('.card-reveal-expense-new .card-title')) || $(e.target).is($('.card-reveal-expense-new .card-title i')))
			{
				// Make Reveal animate down and display none
				$(this).find('.card-reveal-expense-new').velocity(
					{
						translateY: 0
					}, {
						duration: 225,
						queue: false,
						easing: 'easeInOutQuad',
						complete: function ()
						{
							$(this).css({
								display: 'none'
							})
						}
					});
			}
			else if ($(e.target).is($('.card .activator-expense-new')) || $(e.target).is($('.card .activator-expense-new i')))
			{
				$(this).find('.card-reveal-expense-new').css({
					display: 'block'
				}).velocity("stop", false).velocity({
					translateY: '-100%'
				}, {
					duration: 300,
					queue: false,
					easing: 'easeInOutQuad'
				});
			}
		}
	});

	// Trigger full screen date picker!!
	$(document).on('click', '.activator-expense-date', function ()
	{
		if ($(this)[0].tagName == "I")
		{
			document.getElementsByClassName("picker__table")[0].style.display = "none";
		}
		else if ($(this)[0].tagName == "INPUT")
		{
			document.getElementsByClassName("picker__table")[0].style.display = "";
		}

		$('#hidden-date-picker')[0].click();
	});

	// Expense donut chart
	Morris.Donut({
		element: 'donut-chart-expense',
		data: [
			{label: "Transport", value: 12352},
			{label: "Stationery", value: 1200},
			{label: "Books", value: 7300},
			{label: "PC equipment", value: 7300},
			{label: "Conference", value: 3400},
			{label: "Social", value: 1320},
			{label: "Miscellaneous", value: 200},
			{label: "Other", value: 8000}
		],
		colors: [
			'#2B98F0',
			'#FEE94E',
			'#FD9727',
			'#FDC02F',
			'#E62565',
			'#50AE55',
			'#999999',
			'#9B2FAE'
		]
	});
});