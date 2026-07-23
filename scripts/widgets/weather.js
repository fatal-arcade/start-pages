function cleanURL(url) {
    return (url.replace(/\s+/g, ''));
}

async function getGeolocation(name="New York") {

    const url = cleanURL(`
        https://geocoding-api.open-meteo.com/v1/search
            ?countryCode=US
            &name=${encodeURIComponent(name)}
            &count=1
            &language=en
            &format=json    
    `);
    
    const resp = await fetch(url);
    
    const data = await resp.json();

    if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
    }

    const geo = {
        name:       data.results[0].name,
        country:    data.results[0].country,
        latitude:   data.results[0].latitude,
        longitude:  data.results[0].longitude
    };
    
    return {geo};
}

async function getWeatherForecast(city="New York") {

    const geo = await getGeolocation(city);
    
    const url = cleanURL(`
        https://api.open-meteo.com/v1/forecast
            ?latitude=${geo.latitude}
            &longitude=${geo.longitude}
            &current=temperature_2m,relative_humidity_2m,weather_code
            &temperature_unit=celsius
    `);

    try {

        const resp = await fetch(url);
        
        const data = await resp.json();
        
        const temp = {
            celsius: `${data.current.temperature_2m}${data.current_units.temperature_2m}`,
            fahrenheit:  `${(data.current.temperature_2m * 9/5 + 32).toFixed(1)}°F` 
        };
        
        return (`${temp.fahrenheit} / ${temp.celsius}`);
    
    } catch(error) {
        
        console.error('Weather fetch failed:', error)

        return ('N/A');
    
    }
}

export async function Text(element) {

    const loc = element.dataset.location || 'Unknown';

    const val = await getWeatherForecast(loc);

    element.innerHTML = `
        <div class="weather-box">
            <strong>${loc}</strong>: ${val}
        </div>
    `;

}

