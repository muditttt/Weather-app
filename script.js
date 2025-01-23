document.getElementById('getWeather').addEventListener('click', async () => {
    const location = document.getElementById('location').value.trim();
    const resultDiv = document.getElementById('result');

    if (!location) {
        resultDiv.innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    const apiKey = '10b557bed5ab437ca5983112252301';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Location not found. Please try again.');
        }
        const data = await response.json();

        const { temp_c, condition } = data.current;
        const { name, region, country } = data.location;

        resultDiv.innerHTML = `
            <h2>Weather in ${name}, ${region}, ${country}</h2>
            <p>Temperature: ${temp_c}°C</p>
            <p>Condition: ${condition.text}</p>
            <img src="${condition.icon}" alt="${condition.text}" />
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
