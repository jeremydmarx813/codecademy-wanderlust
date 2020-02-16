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

  const createVenueDetailHTML = (venueName, formatPhone, twitter, formattedAddress, firstImgSrc) => {
    return ` <div id="venueDetails">
             <div id="venue-pics">
             <img src="${firstImgSrc[0]}400x200${firstImgSrc[1]}">
            </div>
            <div id="details-div">
            <h2 id="details-div-header">${venueName}</h2>
            <h2>Phone: <span class="details-small-text">${formatPhone}</span></h2>
            <h2>Twitter: <span class="details-small-text">${twitter}<span></h2>
            <h2>Address: <span class="details-small-text">${formattedAddress[0]}</span></h2>
            <h2><span class="details-small-text">${formattedAddress[1]}</span></h2>
            <h2><span class="details-small-text">${formattedAddress[2]}</span></h2>
            </div>
            </div>`;
  }
  
  const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);