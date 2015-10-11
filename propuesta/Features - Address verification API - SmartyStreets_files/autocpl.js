// Requires jQuery 1.6+

(function(window, $)
{
	if (!$)
		return;

	var AUTOCPL_API_ENDPOINT = "https://autocomplete-api.smartystreets.com/suggest";

	var autocplCounter = 1;
	var requestCounter = 0;
	var key = null;
	var options = {};
	var lastInput = "";
	var lastResults;
	var lastRequestNumber = 0;
	var mappedFields = {};
	var autocplHasFocus = false;

	$(setup);

	$.fn.autocomplete = function(websiteKey, config)
	{
		key = websiteKey || null;
		options = config || {};

		this.each(function(i)
		{
			// Assign an ID to this input element
			var id = autocplCounter++;
			$(this).addClass('smarty-autocpl-input smarty-autocpl-street-'+id).data('autocpl-id', id);

			// Add an autocomplete container into the DOM
			var $autocplContainer = $('<div class="smarty-autocomplete" id="smarty-autocpl-'+id+'"></div>');
			$autocplContainer.on('mouseenter focus', function()
			{
				autocplHasFocus = true;
			}).on('mouseleave blur', function()
			{
				autocplHasFocus = false;
			}).on('click', '.smarty-suggestion', function(event)
			{
				useSuggestion($(this), $autocplContainer, event, id);
				hideAutocomplete($autocplContainer);
			});
			$('body').append($autocplContainer);

			// Associate with the lastline fields so they can be populated or focused to
			if ((options.lastline instanceof Array) && (typeof options.lastline[i] === 'object')
				&& options.lastline[i].city && options.lastline[i].state)
			{
				mappedFields[id] = {
					city: $(options.lastline[i].city),
					state: $(options.lastline[i].state),
					zipcode: $(options.lastline[i].zipcode),
					components: true
				};

				mappedFields[id].city.addClass("smarty-autocpl-city-"+id);
				mappedFields[id].state.addClass("smarty-autocpl-state-"+id);
				mappedFields[id].zipcode.addClass("smarty-autocpl-zipcode-"+id);
			}
			else
				mappedFields[id] = { components: false };
		});

		// Align autocomplete containers with their input elements
		repositionAutocomplete();

		this.keydown(handleAutocompleteNavigation).keyup(invokeAutocomplete).blur(lostFocus);
	};

	$.fn.alignAutocomplete = function()
	{
		repositionAutocomplete();
	};

	$.fn.unautocomplete = function()
	{
		var id = getId(this);
		if (autocplElems[id])
			delete autocplElems[id];
		this.off('keyup keydown blur');
	};



	function setup()
	{
		var css = "<style>"
			+ ".smarty-autocomplete { position: absolute; display: none; box-sizing: border-box; border: 1px solid #777; border-top: 0; background: #FFF; box-shadow: 0 2px 5px rgba(0, 0, 0, .4); z-index: 99; }\n"
			+ ".smarty-suggestion, .smarty-no-suggestion { font: 14px/2.25em 'Open Sans', sans-serif; padding: 0 10px; white-space: nowrap; overflow: hidden; }\n"
			+ ".smarty-suggestion { color: #444; cursor: pointer; }\n"
			+ ".smarty-no-suggestion { color: #999; font-style: italic; cursor: default; }\n"
			+ ".smarty-suggestion.selected { background: #2C8DF4; color: #FFF; }\n"
			+ "</style>";

		$('head').prepend(css);

		$('body').on('mouseenter', '.smarty-suggestion', function()
		{
			$('.smarty-suggestion.selected').removeClass('selected');
			$(this).addClass('selected');
		}).on('mouseleave', '.smarty-suggestion', function()
		{
			$(this).removeClass('selected');
		});

		$(window).resize(repositionAutocomplete);
	}

	function invokeAutocomplete(event)
	{
		var id = getId($(this));
		var $container = $('#smarty-autocpl-'+id);
		var prefix = sanitizeInput($(this).val());
		
		if (!prefix)
		{
			$container.hide();
			return;
		}
		else if (prefix == lastInput)
			return;

		if (event.keyCode == 13)	// Enter key
		{
			hideAutocomplete($container);
			return;
		}

		lastInput = prefix;

		var qs = buildQueryString(prefix);
		var id = getId($(this));
		var requestNumber = requestCounter++;

		$.getJSON(AUTOCPL_API_ENDPOINT + qs, function(json)
		{
			// Make sure a more recent request didn't come back before this one
			if (lastRequestNumber > requestNumber)
				return;

			// Make sure the container isn't disabled already (like after submitting the form)
			if ($container.prop('disabled'))
				return;

			lastRequestNumber = requestNumber;
			lastResults = json;
			$container.empty();

			// Make sure field still has focus; don't show suggestions if user left the field by now
			if (!$(event.target).is(':focus'))
				return;

			if (!json.suggestions || json.suggestions.length == 0)
			{
				$container.append('<div class="smarty-no-suggestion">No suggestions</div>');
			}
			else
			{
				for (var i = 0; i < json.suggestions.length; i++)
				{
					var text = json.suggestions[i].text.replace(/<|>/g, "");
					var $sugg = $('<div class="smarty-suggestion">'+text+'</div>');
					$sugg.data("suggestion-index", i);
					$container.append($sugg);
				}
			}

			showAutocomplete($container);
		});
	}


	function handleAutocompleteNavigation(event)
	{
		var id = getId($(this));
		var $container = $('#smarty-autocpl-'+id);
		var $currentChoice = $('.smarty-suggestion.selected:visible', $container).first();
		var choiceSelectionIsNew = false;

		if (event.keyCode == 27)		// Esc key
		{
			hideAutocomplete($container);
			return;
		}
		else if (event.keyCode == 9 || event.keyCode == 39 || event.keyCode == 13)	// Tab key or Right arrow key or Enter key
		{
			hideAutocomplete($container, event.keyCode == 13);
			return useSuggestion($currentChoice, $container, event, id);
		}
		else if (event.keyCode == 40)	// Down arrow key
		{
			if ($currentChoice.length == 0)
				$('.smarty-suggestion', $container).first().addClass('selected');
			else
				$currentChoice.removeClass('selected').next('.smarty-suggestion').addClass('selected');

			moveCursorToEnd(this);
			return;
		}
		else if (event.keyCode == 38)	// Up arrow key
		{
			if ($currentChoice.length == 0)
				$('.smarty-suggestion', $container).last().addClass('selected');
			else
				$currentChoice.removeClass('selected').prev('.smarty-suggestion').addClass('selected');

			var self = this;	// Gross hack, only needed on keyup...
			setTimeout(function() { moveCursorToEnd(self); }, 1);
			return;
		}
	}

	function lostFocus()
	{
		if (!autocplHasFocus)
			hideAutocomplete($('#smarty-autocpl-'+getId(this)));
	}


	function useSuggestion($currentChoice, $container, event, id)
	{
		hideAutocomplete($container);
		if ($currentChoice.length > 0)
		{
			var selection = lastResults.suggestions[$currentChoice.data("suggestion-index")];
			var fields = mappedFields[id];

			if (!fields || !fields.components)
			{
				$('.smarty-autocpl-street-'+id).val(selection.text);
				lastInput = selection.text;
				return;
			}
			else
			{
				$('.smarty-autocpl-street-'+id).val(selection.street_line);
				$('.smarty-autocpl-city-'+id).val(selection.city);
				$('.smarty-autocpl-state-'+id).val(selection.state);
				$('.smarty-autocpl-zipcode-'+id).focus();
				lastInput = selection.street_line;
				return suppress(event);
			}
		}
	}


	function repositionAutocomplete()
	{
		$('.smarty-autocpl-input').each(function()
		{
			var id = getId($(this));
			var offset = $(this).offset();
			var top = offset.top + $(this).outerHeight() - 2;
			var left = offset.left;
			var width = Math.max($(this).outerWidth(), 270);
			$('#smarty-autocpl-'+id).css({
				'top': top + 'px',
				'left': left + 'px',
				'width': width + 'px'
			});
		});
	}

	function showAutocomplete($container)
	{
		$('.smarty-autocomplete').not($container).hide();
		repositionAutocomplete();
		$container.show();
	}

	function hideAutocomplete($container, disableForAFewSeconds)
	{
		// Disabling suggestions is useful when submitting the form, for instance, so results don't
		// appear after you have already hit enter or are done typing
		if (disableForAFewSeconds)
		{
			$container.prop('disabled', true);
			setTimeout(function() {
				$container.prop('disabled', false);
			}, 3000);
		}
		$('.smarty-suggestion.selected').removeClass('selected');
		$container.hide();
	}

	function buildQueryString(prefix)
	{
		var qs = "?auth-id="+encodeURIComponent(key)+"&prefix="+encodeURIComponent(sanitizeInput(prefix));
		
		if (options.suggestions && options.suggestions <= 10 && options.suggestions > 0)
			qs += "&suggestions="+encodeURIComponent(options.suggestions);
		if (options.city_filter)
			qs += "&city_filter="+encodeURIComponent(options.city_filter);
		if (options.state_filter)
			qs += "&state_filter="+encodeURIComponent(options.state_filter);
		if (options.prefer)
			qs += "&prefer="+encodeURIComponent(options.prefer);
		if (options.geolocate === false || options.geolocate === true)
			qs += "&geolocate="+encodeURIComponent(options.geolocate);

		return qs;
	}

	function sanitizeInput(prefix)
	{
		if (prefix.length > 1000)
			prefix = prefix.substr(0, 1000);
		prefix = $.trim(prefix.replace(/\s+/g, " "));
		return prefix;
	}

	function getId(inputElem)
	{
		return $(inputElem).data('autocpl-id');
	}

	// Courtesy of http://css-tricks.com/snippets/javascript/move-cursor-to-end-of-input/
	function moveCursorToEnd(el)
	{
		if (typeof el.selectionStart == "number")
			el.selectionStart = el.selectionEnd = el.value.length;
		else if (typeof el.createTextRange != "undefined")
		{
			el.focus();
			var range = el.createTextRange();
			range.collapse(false);
			range.select();
		}
	}

})(window, jQuery);