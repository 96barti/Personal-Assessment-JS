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
        console.log(covidData)
        const selectedData = selectData(Object.values(covidData));
        console.log(selectedData)
            // displayInfo(selectedDestination);
    } catch (e) {
        console.error(e.message);
    }
})();


function selectData(data) {
    let deaths = [];
    console.log(deaths)
    let regex = new RegExp('^(0[0-9]|1[0-9])|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-2]$')
        // console.log(data.life_expectancy);
    const filtredData = data.filter(item => {
        const deaths = regex.test(item.All.life_expectancy);
        return deaths;
    })
    const prepare = prepareData(Object.values(filtredData));
}


function prepareData(data) {
    const date = data.All.dates.split(':').shift();
    console.log(date);
}


function calculate(data) {
    const sum = data.reduce((a, b) => a + b, 0);
    return Math.floor(sum / data.length)
}