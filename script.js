async function getData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    throw Error(`Error: ${response.statusText}`);
}

(async function dataCovid(continent = "Europe", status = "deaths") {
    const dataUrl = `https://covid-api.mmediagroup.fr/v1/history?continent=${continent}&status=${status}`;

    try {
        const covidData = await getData(dataUrl);
        selectData(Object.values(covidData));
    } catch (e) {
        console.error(e.message);
    }
})();


function selectData(data) {
    const filtredData = data.filter(item => {
        return Number.parseFloat(item.All.life_expectancy) <= 72;
    })
    average(filtredData);
}

function average(filteredData) {
    filteredData.forEach(element => {
        const dates = Object.values(element.All.dates).slice(-Object.values(element.All.dates).length, (-Object.values(element.All.dates).length + 30));
        let sum = 0;
        const data = Object.values(dates)
        data.forEach(element => sum += element)

        const country = {
            deaths_average: Math.round(sum / 30),
            country: element.All.country,
            continent: element.All.continent,
            capital: element.All.capital_city,
            life_expectancy: element.All.life_expectancy
        }

        renderValue(country);
    })
}

function renderValue(country) {
    const element = document.createElement("p");
    element.innerHTML = `${country.country} ${country.continent} ${country.life_expectancy} ${country.capital} ${country.deaths_average}`;
    document.body.appendChild(element);
}