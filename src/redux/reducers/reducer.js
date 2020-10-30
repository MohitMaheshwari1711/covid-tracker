function reducer(state = {
    countryInfo: {
        lat: 34.80746,
        long: -40.4796
    },
    country: 'worldwide'
}, action) {
    switch (action.type) {
        case "location":
            return {
                ...state,
                ...action.value
            };
        case "countries_data":
            return {
                ...state,
                countries_data: [
                    ...action.value
                ]
            };
        default:
            return state;
    }
}

export default reducer;