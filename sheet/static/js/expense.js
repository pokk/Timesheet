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

	var expense_color = ['#2B98F0', '#FEE94E', '#FD9727', '#FDC02F', '#E62565', '#50AE55', '#999999', '#9B2FAE'];
	var tag_clicked = [false, false, false, false, false, false, false, false];
	// Expense donut chart!!
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
		colors: expense_color,
		formatter: function (y, data)
		{
			return '¥' + y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		resize: true
	});

	// Chip tag!!
	$('.chip').on({
		mouseenter: function ()
		{
			var index = findIndex($(this)[0]);

			if (!tag_clicked[index])
			{
				setChipTag($(this)[0], 1, 1.15, expense_color[index]);
			}
		},
		mouseleave: function ()
		{
			var index = findIndex($(this)[0]);

			if (!tag_clicked[index])
			{
				setChipTag($(this)[0], 0.6, 1, '#e4e4e4');
			}
		},
		click: function (obj)
		{
			var index = findIndex($(this)[0]);

			for (var i = 0; i < document.getElementsByClassName("chip").length; i++)
			{
				setChipTag(document.getElementsByClassName("chip")[i], 0.6, 1, '#e4e4e4');
				tag_clicked[i] = false;
			}

			setChipTag($(this)[0], 1, 1.15, expense_color[index]);
			tag_clicked[index] = true;
		}
	});

	function findIndex(obj)
	{
		for (var index = 0; index < document.getElementsByClassName("chip").length; index++)
			if (document.getElementsByClassName("chip")[index] == obj)
			{
				return index;
			}
	}

	// Set the chip tag css function.
	function setChipTag(obj, opacity, scale, color)
	{
		var s = "scale(" + scale + ")";

		obj.style.opacity = opacity;
		obj.style.transform = s.toString();
		obj.style.webkitTransform = s.toString;
		obj.style.mozTransform = s.toString();
		obj.style.oTransform = s.toString();
		obj.style.msTransform = s.toString;
		obj.style.backgroundColor = color;
	}

	// Pagination!!
	var pagination = $('.pagination.page-out li');
	var index_cur, index_icon_left = 0, index_icon_right = pagination.length - 1;
	$(pagination).click(function (obj)
	{
		// Check where is the number of pagination now.
		for (index_cur = 0; index_cur < pagination.length; index_cur++)
			if (pagination[index_cur].className == 'active')
			{
				break;
			}

		//function 

		// For pagination's '>'.
		if ($(this).find('a').find('i').length > 0 && $(this).find('a').find('i')[0].innerText == 'chevron_right')
		{
			if (index_cur == index_icon_right - 1)
			{
				return;
			}

			// When the index at the first.
			if (index_cur == 1)
			{
				disable_pagination(index_icon_left);
			}
			// When the index at the last one.
			if (index_cur == index_icon_right - 2)
			{
				disable_pagination(index_icon_right);
			}
			active_pagination(index_cur);
			active_pagination(index_cur + 1);

			return;
		}
		// For pagination's '<'.
		else if ($(this).find('a').find('i').length > 0 && $(this).find('a').find('i')[0].innerText == 'chevron_left')
		{
			if (index_cur == 1)
			{
				return;
			}

			// When the index at the first.
			if (index_cur == 2)
			{
				disable_pagination(index_icon_left);
			}
			// When the index at the last one.
			if (index_cur == index_icon_right - 1)
			{
				disable_pagination(index_icon_right);
			}
			active_pagination(index_cur);
			active_pagination(index_cur - 1);

			return;
		}

		// For pagination's number.
		if (index_cur == 1 && $(this).index() != 1)
		{
			// This case is the current index is in the first index. 
			if ($(this).index() == pagination.length - 2)
			{
				disable_pagination(index_icon_right);
			}
			disable_pagination(index_icon_left);
		}
		else if (index_cur == pagination.length - 2 && $(this).index() != pagination.length - 2)
		{
			// This case is the current index is in the last index.
			if ($(this).index() == 1)
			{
				disable_pagination(index_icon_left);
			}
			disable_pagination(index_icon_right);
		}
		else if (1 < index_cur && index_cur < pagination.length - 2)
		{
			// This case is the current index is between the first and the last.
			if ($(this).index() == 1)
			{
				disable_pagination(index_icon_left);
			}
			else if ($(this).index() == pagination.length - 2)
			{
				disable_pagination(index_icon_right);
			}
		}
		// Change the color.
		$(this)[0].classList.toggle('active');
		$(this)[0].classList.toggle('waves-effect');
		active_pagination(index_cur);
	});

	// Disable or Able the pagination('<' and  '>').
	function disable_pagination(index)
	{
		pagination[index].classList.toggle('disabled');
		pagination[index].classList.toggle('waves-effect');
	}

	// Inactive or Active the pagination('1', '2', '3', '4', ......).
	function active_pagination(index)
	{
		pagination[index].classList.toggle('active');
		pagination[index].classList.toggle('waves-effect');
	}
});