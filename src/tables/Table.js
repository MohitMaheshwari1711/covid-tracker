import React from 'react';
import { useSelector } from "react-redux";

import numeral from 'numeral';

function Table() {

    const tableData = useSelector(state => state);

    if (tableData['countries_data'] === undefined) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='table'>
                <table>
                    <tbody>
                        {
                            tableData.countries_data.map(
                                (country, index) => (
                                    <tr key={index}>
                                        <td>{country.country}</td>
                                        <td><strong>{numeral(country.cases).format("0,0")}</strong></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table
