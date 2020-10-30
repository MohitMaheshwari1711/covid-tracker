import React, { useState, useEffect } from 'react';

import { useDispatch } from "react-redux";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { sortData } from '../util';




function Header() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const dispatch = useDispatch();


    useEffect(() => {
        const getData = async () => {
            await fetch('https://disease.sh/v3/covid-19/all').then(
                (response) => response.json()
            ).then((data) => {
                dispatch({
                    type: "location",
                    value: data
                });
            });
        }

        getData();

    }, [dispatch]);



    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries").then(
                (response) => response.json()
            ).then(
                (data) => {
                    const sortedData = sortData(data);
                    const countries = sortedData.map((country) => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2,
                            id: country.countryInfo._id
                        }
                    ));
                    setCountries(countries);
                    dispatch({
                        type: "countries_data",
                        value: sortedData
                    });
                }
            );
        }

        getCountriesData();
    }, [dispatch]);



    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url).then(
            response => response.json()
        ).then(
            data => {
                setCountry(countryCode);
                if (countryCode === 'worldwide') {
                    dispatch({
                        type: "location",
                        value: {
                            ...data,
                            countryInfo: {
                                lat: 34.80746,
                                long: -40.4796
                            }
                        }
                    });
                } else {
                    dispatch({
                        type: "location",
                        value: data
                    });
                }
            }
        );
    }



    return (
        <div className='app_header'>
            <h1>COVID-19 TRACKER</h1>
            <FormControl className='app_dropdown'>
                <Select variant='outlined' value={country} onChange={onCountryChange}>
                    <MenuItem value='worldwide'>Worldwide</MenuItem>
                    {
                        countries.map(
                            (country, index) => (
                                <MenuItem value={country.value} key={index}>{country.name}</MenuItem>
                            )
                        )
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Header
