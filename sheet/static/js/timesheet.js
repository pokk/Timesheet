$(document).ready(function ()
	{
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

			$('.datepicker').val(monthsFullName[month.val()] + ", " + year.val());
		});

		// Charts.
		var days = [];
		var sheet = [];
		for (var i = 0; i < 31; i++)
		{
			days[i] = (i + 1).toString();
			sheet[i] = (Math.random() * 10) + 8;
		}
		var chart = new Chartist.Line('.ct-chart-day', {
			labels: days,
			series: [
				sheet
			]
		}, {
			low: 0
		});

		// Let's put a sequence number aside so we can use it in the event callbacks
		var seq = 0,
			delays = 15,
			durations = 500;

		// Once the chart is fully created we reset the sequence
		chart.on('created', function ()
		{
			seq = 0;
		});

		// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
		chart.on('draw', function (data)
		{
			seq++;

			if (data.type === 'line')
			{
				// If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
				data.element.animate({
					opacity: {
						// The delay when we like to start the animation
						begin: seq * delays + 1000,
						// Duration of the animation
						dur: durations,
						// The value where the animation should start
						from: 0,
						// The value where it should end
						to: 1
					}
				});
			}
			else if (data.type === 'label' && data.axis === 'x')
			{
				data.element.animate({
					y: {
						begin: seq * delays,
						dur: durations,
						from: data.y + 100,
						to: data.y,
						// We can specify an easing function from Chartist.Svg.Easing
						easing: 'easeOutQuart'
					}
				});
			}
			else if (data.type === 'label' && data.axis === 'y')
			{
				data.element.animate({
					x: {
						begin: seq * delays,
						dur: durations,
						from: data.x - 100,
						to: data.x,
						easing: 'easeOutQuart'
					}
				});
			}
			else if (data.type === 'point')
			{
				data.element.animate({
					x1: {
						begin: seq * delays,
						dur: durations,
						from: data.x - 10,
						to: data.x,
						easing: 'easeOutQuart'
					},
					x2: {
						begin: seq * delays,
						dur: durations,
						from: data.x - 10,
						to: data.x,
						easing: 'easeOutQuart'
					},
					opacity: {
						begin: seq * delays,
						dur: durations,
						from: 0,
						to: 1,
						easing: 'easeOutQuart'
					}
				});
			}
			else if (data.type === 'grid')
			{
				// Using data.axis we get x or y which we can use to construct our animation definition objects
				var pos1Animation = {
					begin: seq * delays,
					dur: durations,
					from: data[data.axis.units.pos + '1'] - 30,
					to: data[data.axis.units.pos + '1'],
					easing: 'easeOutQuart'
				};

				var pos2Animation = {
					begin: seq * delays,
					dur: durations,
					from: data[data.axis.units.pos + '2'] - 100,
					to: data[data.axis.units.pos + '2'],
					easing: 'easeOutQuart'
				};

				var animations = {};
				animations[data.axis.units.pos + '1'] = pos1Animation;
				animations[data.axis.units.pos + '2'] = pos2Animation;
				animations['opacity'] = {
					begin: seq * delays,
					dur: durations,
					from: 0,
					to: 1,
					easing: 'easeOutQuart'
				};

				data.element.animate(animations);
			}
		});

		// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
		chart.on('created', function ()
		{
			if (window.__exampleAnimateTimeout)
			{
				clearTimeout(window.__exampleAnimateTimeout);
				window.__exampleAnimateTimeout = null;
			}
			window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 50000000);
		});

	}
);

jQuery(document).ready(function ($)
{
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function ()
	{
		(!window.requestAnimationFrame)
			? setTimeout(function ()
		{
			showBlocks(timelineBlocks, offset);
		}, 100)
			: window.requestAnimationFrame(function ()
		{
			showBlocks(timelineBlocks, offset);
		});
	});

	function hideBlocks(blocks, offset)
	{
		blocks.each(function ()
		{
			( $(this).offset().top > $(window).scrollTop() + $(window).height() * offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content')
																									 .addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset)
	{
		blocks.each(function ()
		{
			( $(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img')
																									.hasClass('is-hidden') ) && $(this)
				.find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
});