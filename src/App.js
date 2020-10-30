import React, { useState } from 'react';

import { useSelector } from "react-redux";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Header from './header/Header';
import InfoBox from './info-box/InfoBox';
import Map from './map/Map';
import Table from './tables/Table';
import Graph from './graphs/Graph';

import { prettyStat } from './util';

import './App.css';
import 'leaflet/dist/leaflet.css';





function App() {

  const countryInfo = useSelector(state => state);
  const [casesType, setCasesType] = useState("cases");

  return (
    <div className="app">
      <div className="app_left">
        <Header />
        <div className='app_stats'>
          <InfoBox title='Coronavirus Cases' isOrange active={casesType === "cases"} onClick={e => setCasesType('cases')} cases={prettyStat(countryInfo.todayCases)} total={prettyStat(countryInfo.cases)} />
          <InfoBox title='Recovered' isGreen active={casesType === "recovered"} onClick={e => setCasesType('recovered')} cases={prettyStat(countryInfo.todayRecovered)} total={prettyStat(countryInfo.recovered)} />
          <InfoBox title='Deaths' isRed active={casesType === "deaths"} onClick={e => setCasesType('deaths')} cases={prettyStat(countryInfo.todayDeaths)} total={prettyStat(countryInfo.deaths)} />
        </div>
        <Map casesType={casesType} />
      </div>

      <div className='app_right'>
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            <Table />
            <h3>Worldwide new {casesType}</h3>
            <Graph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
