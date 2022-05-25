// Avoid CORS errors by using a CORS proxy
const URLs = {
    modelYears:
        'https://bibliotheque-croissant-10521.herokuapp.com/https://api.nhtsa.gov/products/vehicle/modelYears?issueType=r',
    makesForModelYear: (year) =>
        `https://sheltered-temple-54799.herokuapp.com/https://api.nhtsa.gov/products/vehicle/makes?modelYear=${year}&issueType=r`,
    modelForMakeYear: (make, year) =>
        `https://sheltered-temple-54799.herokuapp.com/https://api.nhtsa.gov/products/vehicle/models?modelYear=${year}&make=${make}&issueType=r`,
    recalls: (make, model, year) =>
        `https://sheltered-temple-54799.herokuapp.com/https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${year}`,
};

const fetchJson = (url) => fetch(url).then((response) => response.json());

const STAGES = {
    year: {
        name: 'year',
        getDataset: () =>
            fetchJson(URLs.modelYears).then(
                (data) =>
                    data.results &&
                    data.results.map((yearObj) => yearObj.modelYear)
            ),
    },
    make: {
        name: 'make',
        getDataset: (year) => fetchJson(URLs.makesForModelYear(year)),
    },
    model: {
        name: 'model',
        getDataset: (make, year) =>
            fetchJson(URLs.modelForMakeYear(make, year)),
    },
    final: {
        name: 'final',
        getDataset: (make, model, year) =>
            fetchJson(URLs.recalls(make, model, year)),
    },
};

export { STAGES, URLs };
