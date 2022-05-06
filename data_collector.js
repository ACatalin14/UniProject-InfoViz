const axios = require("axios").default;
const fs = require('fs');

const LOCATIONS = [
    ['Alba', 'Alba Iulia'],
    ['Arad', 'Arad'],
    ['Arges', 'Pitesti'],
    ['Bacau', 'Bacau'],
    ['Bihor', 'Oradea'],
    ['Bistrita-Nasaud', 'Bistrita'],
    ['Botosani', 'Botosani'],
    ['Brasov', 'Brasov'],
    ['Braila', 'Braila'],
    ['Bucharest', 'Bucharest'],
    ['Buzau', 'Buzau'],
    ['Caras-Severin', 'Resita'],
    ['Calarasi', 'Calarasi'],
    ['Cluj', 'Cluj-Napoca'],
    ['Constanta', 'Constanta'],
    ['Covasna', 'Sfantu Gheorghe'],
    ['Dambovita', 'Targoviste'],
    ['Dolj', 'Craiova'],
    ['Galati', 'Galati'],
    ['Giurgiu', 'Giurgiu'],
    ['Gorj', 'Targu Jiu'],
    ['Harghita', 'Miercurea Ciuc'],
    ['Hunedoara', 'Deva'],
    ['Ialomita', 'Slobozia'],
    ['Iasi', 'Iasi'],
    ['Maramures', 'Baia Mare'],
    ['Mehedinti', 'Drobeta-Turnu Severin'],
    ['Mures', 'Targu Mures'],
    ['Neamt', 'Piatra Neamt'],
    ['Olt', 'Slatina'],
    ['Prahova', 'Ploiesti'],
    ['Satu Mare', 'Satu Mare'],
    ['Salaj', 'Zalau'],
    ['Sibiu', 'Sibiu'],
    ['Suceava', 'Suceava'],
    ['Teleorman', 'Alexandria'],
    ['Timis', 'Timisoara'],
    ['Tulcea', 'Tulcea'],
    ['Vaslui', 'Vaslui'],
    ['Valcea', 'Ramnicu Valcea'],
    ['Vrancea', 'Focsani'],
];

const options = {
    method: 'GET',
    url: 'https://visual-crossing-weather.p.rapidapi.com/history',
    params: {
        aggregateHours: '24',
        unitGroup: 'metric',
        contentType: 'csv',
        shortColumnNames: 'false'
    },
    headers: {
        'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
        'x-rapidapi-key': process.env.SECRET_API_KEY
    }
};

async function main() {

    for (let year = 2019; year >= 2011; year--) {

        for (let location of LOCATIONS) {

            let response;

            console.log('Requesting data for ' + location[0] + ', ' + year + '...');

            options.params.location = location[1] + ', Romania';        // use the county seat for request
            options.params.startDateTime = year + '-01-01T00:00:00';
            options.params.endDateTime = year + '-12-31T00:00:00';

            try {
                response = await axios.request(options);
            } catch (err) {
                console.error(error);
            }

            fs.writeFileSync('./data/weather_' + year + '_' + location[0] + '.csv', response.data, {
                encoding: 'utf8',
                flag: 'a+',
            });
        }
    }
}

main();
