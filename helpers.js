const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.state}</p>`;
  }
  
  const createWeatherHTML = currentDay => {
    // console.log(currentDay)
    return `<h2><span>${weekDays[(new Date()).getDay()]}</span></h2>
          <h2><span>Temperature:</span> ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
          <h2><span>Feels like:</span> ${kelvinToFahrenheit(currentDay.main.feels_like)}&deg;F</h2>
          <h2><span>Humidity:</span> ${currentDay.main.humidity}%</h2>
          <h2><span>Condition:</span> ${currentDay.weather[0].description}</h2>
        <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
  }

  const createVenueDetailHTML = (venueName, formatPhone, twitter, formattedAddress) => {
    return `<h2>${venueName}</h2>
            <h2>Phone: ${formatPhone}</h2>
            <h2>Twitter: ${twitter}</h2>
            <h2>Address: ${formattedAddress[0]}</h2>
            <h2>${formattedAddress[1]}</h2>
            <h2>${formattedAddress[2]}</h2>`;
  }
  
  const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);