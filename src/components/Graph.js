import { useRef } from "react";
import { Bar } from "react-chartjs-2";

const drawLine = {
  afterDraw: function (chart) {
    console.log(chart);
    if (typeof chart.config.options.lineAt != "undefined") {
      var lineAt = chart.config.options.lineAt;
      var ctxPlugin = chart.ctx;
      var xAxe = chart.scales['x'];
      var yAxe = chart.scales[chart.config.options.scales.yAxes.id];
      console.log(xAxe);

      // I'm not good at maths
      // So I couldn't find a way to make it work ...
      // ... without having the `min` property set to 0
      if (yAxe.min !== 0) return;

      ctxPlugin.strokeStyle = "red";
      ctxPlugin.beginPath();
      lineAt = (lineAt - yAxe.min) * (100 / yAxe.max);
      lineAt = ((100 - lineAt) / 100) * yAxe.height + yAxe.top;
      ctxPlugin.moveTo(xAxe.left, lineAt);
      ctxPlugin.lineTo(xAxe.right, lineAt);
      ctxPlugin.stroke();
    }
  },
};

const options = {
  lineAt: 0.25,
  scales: {
    yAxes: [{
        ticks: {
            min: 0
        }
    }]
},
};

function Graph(prop) {
  const ref = useRef();
  const carbonData = prop.data;
  console.log(ref);

  let barData = {
    labels: [...new Set(carbonData.map((data) => data.date))],
    datasets: [
      {
        label: "CO",
        backgroundColor: "blue",
        data: [
          ...carbonData.map((data) => {
            if (data.gas === "CO") return parseFloat(data.amount);
            return null;
          }),
        ].filter((n) => n),
      },
      {
        label: "CO2",
        backgroundColor: "red",
        data: [
          ...carbonData
            .map((data) => {
              if (data.gas === "CO2") return parseFloat(data.amount);
              return null;
            })
            .filter((n) => n),
        ],
      },
    ],
  };

  return (
    <Bar data={barData} ref={ref} options={options} plugins={[drawLine]} />
  );
}

export default Graph;
