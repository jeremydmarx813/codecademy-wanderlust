// Foursquare API Info
const clientId = 'O35M2HBAJBOR0ZJGLXU2JP2PUGOMV2US121O1HP1OSIJTCLZ';
const clientSecret = '10KACUNYFCURQSONZ2W4U15ZIARC5PSZLVDLQYSJZ2OZ1L10';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'a536dd5726f675a95a1fad2f0605c9c3';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $catInput = $('#category-menu');
const $submit = $('#button');
const $destination = $('#destination');
const $venueDetails = $('#venueDetails');
const $container = $('.container');
const $venueContainer = $('#venues');
const $venueDivs = [ $('#venue1'), $('#venue2'), $('#venue3'), $('#venue4'), $('#venue5') ];
const $weatherDiv = $('#weather1');
const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const $bottomHalf = $('#bottom-half');
const $topAttractions = $('#top-attractions');
const $venueSpecifics = $('#venue-specifics');
// let venueDetailsShown = false;

// Add AJAX functions here:
const getVenues = async () => {
	const city = $input.val();
	const section = $catInput.val();
	const urlToFetch = `${url}${city}&limit=49&client_id=${clientId}&client_secret=${clientSecret}&v=20200808`;
	const urlWithCategory = `${url}${city}&section=${section}&limit=49&client_id=${clientId}&client_secret=${clientSecret}&v=20200808`;

	try {
		if (!section) {
			const response = await fetch(urlToFetch);
			if (response.ok) {
				const jsonResponse = await response.json();
				const venues = jsonResponse.response.groups[0].items.map((v) => v.venue);
				return venues;
			}
		} else {
			const response = await fetch(urlWithCategory);
			if (response.ok) {
				const jsonResponse = await response.json();
				const venues = jsonResponse.response.groups[0].items.map((v) => v.venue);
				return venues;
			}
		}
	} catch (error) {
		console.log('error in getVenues func in main.js:', error);
	}
};

const getForecast = async () => {
	const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};

const getVenueDetails = async (venueId) => {
	const urlToFetch = `https://api.foursquare.com/v2/venues/${venueId.data}?client_id=${clientId}&client_secret=${clientSecret}&v=20200808`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};

const venueDetailsSearch = (venueId) => {
	// $venueSpecifics.empty();
	getVenueDetails(venueId).then((details) => renderVenueDetails(details));

	return false;
};

// Render functions
const renderVenues = (venues) => {
	let indexes = [];
	venues.forEach((v, i) => indexes.push(i));
	$venueDivs.forEach(($venue) => {
		let tempIndex = indexes[Math.floor(Math.random() * indexes.length)];
		const venue = venues[tempIndex];
		const venueIdNum = venue.id;
		const venueIcon = venue.categories[0].icon;
		const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
		let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
		$venue.append(venueContent);
		$venue.click(venueIdNum, venueDetailsSearch);
		// $venue.click($venue,  $venueSpecifics.empty());
		indexes.splice(indexes.indexOf(tempIndex), 1);
	});
	$destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderVenueDetails = (venueDetails) => {
	$topAttractions.hide();
	$venueSpecifics.empty();

	const imgInfo = [ venueDetails.response.venue.bestPhoto.prefix, venueDetails.response.venue.bestPhoto.suffix ];
	const venueName = venueDetails.response.venue.name;
	const formatPhone = venueDetails.response.venue.contact.formattedPhone;
	const twitter = venueDetails.response.venue.contact.twitter;
	const formattedAddress = venueDetails.response.venue.location.formattedAddress;
	const appendHTML = createVenueDetailHTML(venueName, formatPhone, twitter, formattedAddress, imgInfo);
	$venueSpecifics.append(appendHTML);
	$venueSpecifics.show();
};

const renderForecast = (day) => {
	let weatherContent = createWeatherHTML(day);
	$weatherDiv.append(weatherContent);
};
//!!after initial search, each individual venue details are being shown if just one is clicked
const executeSearch = (e) => {
	if (!$input.val()) {
		e.preventDefault();
		console.log('no city input');
	} else {
		// $venueSpecifics.empty();
		$venueSpecifics.hide();
		$topAttractions.show();
		$venueDivs.forEach((venue) => venue.empty());
		$weatherDiv.empty();
		$destination.empty();
		$container.css('visibility', 'visible');
		getVenues().then((venues) => renderVenues(venues));
		getForecast().then((forecast) => renderForecast(forecast));
		return false;
	}
};

$submit.click(executeSearch);
