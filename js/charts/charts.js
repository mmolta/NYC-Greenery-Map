const makeTreesChart = (trees, chart) => {
    const labels = Object.keys(trees)
    const data = Object.keys(trees).map(entry => trees[entry])

    console.log('chart labels ', labels)
    console.log('chart data ', data)

    new Chart(chart, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Trees per Street',
            data,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}

const makeCharts = (data, els) => {
    makeTreesChart(data.trees, els.trees)
}

export default makeCharts