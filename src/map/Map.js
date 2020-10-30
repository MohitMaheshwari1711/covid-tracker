import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { useSelector } from "react-redux";

import { showDataOnMap } from '../util';

function Map({ casesType }) {

    const mapData = useSelector(state => state);


    return (
        <div className='map'>
            <LeafletMap center={{
                lat: mapData.countryInfo.lat,
                lng: mapData.countryInfo.long
            }} zoom={3}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapData.countries_data && 
                showDataOnMap(mapData.countries_data, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
