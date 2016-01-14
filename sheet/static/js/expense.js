/**
 * Created by Jieyi on 1/14/16.
 */

$(document).ready(function ()
{
	$(document).on('click.card', '.card', function (e)
	{
		// Hidden card for expense edit
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

		// Hidden card for expense new
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
});