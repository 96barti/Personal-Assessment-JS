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
        const selectedData = selectData(Object.values(covidData));
    } catch (e) {
        console.error(e.message);
    }
})();


function selectData(data) {
    let regex = new RegExp('^(0[0-9]|1[0-9])|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-2]$')
    const filtredData = data.filter(item => {
        const deaths = regex.test(item.All.life_expectancy);
        return deaths;
    })
    average(filtredData);
}

function average(filteredData) {
    filteredData.forEach(element => {
        const dates = Object.values(element.All.dates).slice(-Object.values(element.All.dates).length, (-Object.values(element.All.dates).length + 30));
        let sum = 0;
        const data = Object.values(dates)
        data.forEach(element => sum += element)
        sum = Math.round(sum / 30);
        const country = element.All.country;
        const continent = element.All.continent;
        const capital = element.All.capital_city;
        const life_expectancy = element.All.life_expectancy;
        renderValue(sum, country, continent, capital, life_expectancy)
    })
}

function renderValue(sum, country, continent, capital, life_expectancy) {
    const element = document.createElement("p");
    element.innerHTML = `${country} ${continent} ${life_expectancy} ${capital} ${sum}`;
    document.body.appendChild(element);
}