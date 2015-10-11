$(function()
{
	$.fn.waypoint.defaults.offset = 300;

	$('#page-nav').waypoint('sticky');


	// Change selected link when user clicks one in page-nav
	function selectPageNavLink(selector)
	{
		$('#page-nav a.selected').removeClass('selected');
		$(selector).addClass('selected');
	}


	// Change selected link in the page-nav when user scrolls
	$('#verify-addresses').waypoint(function(direction)
	{
		selectPageNavLink('#verify-addresses-link');
	});
	$('#city-state-zip').waypoint(function(direction)
	{
		if (direction == "down")
			selectPageNavLink('#city-state-zip-link');
		else
			selectPageNavLink('#verify-addresses-link');
	});
	$('#autocomplete').waypoint(function(direction)
	{
		if (direction == "down")
			selectPageNavLink('#autocomplete-link');
		else
			selectPageNavLink('#city-state-zip-link');
	});
	$('#extract').waypoint(function(direction)
	{
		if (direction == "down")
			selectPageNavLink('#extract-link');
		else
			selectPageNavLink('#autocomplete-link');
	});


	// Wire up autocomplete demo
	$('#auto-street').autocomplete(API_KEYS.FEATURES, {
		suggestions: 10,
		lastline: [
			{
				city: "#auto-city",
				state: "#auto-state",
				zipcode: "#auto-zipcode"
			}
		]
	});


	// Smooth scrolling
	$('a[href*=#]:not([href=#])').click(function(event)
	{
		var $target = $(this.hash);
		if (!$target.length)
			return suppress(event);
		$('html, body').animate({
			scrollTop: $target.offset().top - ($(window).height() / 10)
		}, 500);
		return suppress(event);
	});



	// Wireup tabs for code samples in different languages
	$('.tabbed-code .tab').click(function()
	{
		var $container = $(this).closest('.tabbed-code');
		var exampleLang = $(this).data('example');
		$container.find('.example').hide();
		$container.find('.example.'+exampleLang).show();
		$container.find('.tab').removeClass('selected');
		$(this).addClass('selected');
	});
});