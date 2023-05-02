const makeTreesChart = (trees, chart) => {
  const data = Object.keys(trees).map(entry => trees[entry])

  return new Chart(chart, {
    type: 'bar',
    data: {
      labels: [
        "0",
        "1 - 3",
        "4 - 8",
        "9+"
      ],
      datasets: [{
        label: '# of streets',
        data,
        borderWidth: 1,
        backgroundColor: [
            'rgba(0,0,0,0)',
            '#f7fcb9',
            '#addd8e',
            '#31a354'
        ],
        borderColor: '#353535'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Trees per Street'
        }
      }
    }
  });
}

const makeCharts = (data, els) => {
  return { 
      trees: makeTreesChart(data.trees, els.trees)
  }
}

// @PARAMS
    // data: key/values of chartNme: chartData
    // chartObjs: key/values of chartName: chart.js object
const updateCharts = (data, chartObjs) => {
  for(let [key, chart] of Object.entries(chartObjs)) {
    const chartDataObj = data[key]
    const chartData = Object.keys(chartDataObj).map(entry => chartDataObj[entry])

    // replace data array
    chart.data.datasets.forEach((dataset) => {
        dataset.data = chartData;
    });

    chart.update()
  }
}

export { makeCharts, updateCharts }