import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import numeral from "numeral";


const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};


function Graph({ casesType }) {

  const countryDetails = useSelector(state => state);
  const [data, setData] = useState({});
  const [backgroundColor, changebackgroundColor] = useState('');
  const [borderColor, changeborderColor] = useState('');

  useEffect(() => {

    if (casesType === 'cases') {
      changebackgroundColor('rgb(255, 102, 0, 0.5)');
      changeborderColor('rgb(255, 102, 0)');
    } else if (casesType === 'recovered') {
      changebackgroundColor('rgb(125, 215, 29, 0.5)');
      changeborderColor('rgb(125, 215, 29)');
    } else if (casesType === 'deaths') {
      changebackgroundColor('rgb(251, 68, 67, 0.5)');
      changeborderColor('rgb(251, 68, 67)');
    }

    const fetchData = async () => {
      const url = countryDetails.country === 'Worldwide' ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120' : `https://disease.sh/v3/covid-19/historical/${countryDetails.country}?lastdays=120`;
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data['timeline']) {
            let chartData = buildChartData(data['timeline'], casesType);
            setData(chartData);
          } else {
            let chartData = buildChartData(data, casesType);
            setData(chartData);
          }
        }); 
    };

    fetchData();
  }, [casesType, countryDetails.country]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Graph;