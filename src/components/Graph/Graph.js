import { Bar } from "react-chartjs-2";
import React from "react";

class Graph extends React.Component {
  constructor(props) {
    super();

    this.state = {
      carbonData: props.data,
    };
    this.setState(this.state);
  }

  render() {
    const drawLine = {
      afterDraw: function (chart) {
        if (typeof chart.config.options.lineAt != "undefined") {
          var lineAt = chart.config.options.lineAt;
          var ctxPlugin = chart.ctx;
          var xAxe = chart.scales[chart.config.options.scales.xAxes.id];
          var yAxe = chart.scales[chart.config.options.scales.yAxes.id];

          if (yAxe.min !== 0) return;

          ctxPlugin.lineWidth = 2;
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
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Amount",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Days",
            },
            ticks: {
              min: 0,
            },
          },
        ],
      },
    };

    let barData = {
      labels: [...new Set(this.state.carbonData.map((data) => data.date))],
      datasets: [
        {
          label: "CO",
          backgroundColor: "rgb(81,77,203)",
          data: [
            ...this.state.carbonData.map((data) => {
              if (data.gas === "CO") return parseFloat(data.amount);
              return null;
            }),
          ].filter((n) => n),
        },
        {
          label: "CO-2",
          backgroundColor: "rgb(208,67,19)",
          data: [
            ...this.state.carbonData
              .map((data) => {
                if (data.gas === "CO2") return parseFloat(data.amount);
                return null;
              })
              .filter((n) => n),
          ],
        },
      ],
    };

    return <Bar data={barData} options={options} plugins={[drawLine]} />;
  }
}
export default Graph;

// const drawLine = {
//   afterDraw: function (chart) {
//     if (typeof chart.config.options.lineAt != "undefined") {
//       var lineAt = chart.config.options.lineAt;
//       var ctxPlugin = chart.ctx;
//       var xAxe = chart.scales[chart.config.options.scales.xAxes.id];
//       var yAxe = chart.scales[chart.config.options.scales.yAxes.id];

//       if (yAxe.min !== 0) return;

//       ctxPlugin.lineWidth = 2;
//       ctxPlugin.strokeStyle = "red";
//       ctxPlugin.beginPath();
//       lineAt = (lineAt - yAxe.min) * (100 / yAxe.max);
//       lineAt = ((100 - lineAt) / 100) * yAxe.height + yAxe.top;
//       ctxPlugin.moveTo(xAxe.left, lineAt);
//       ctxPlugin.lineTo(xAxe.right, lineAt);
//       ctxPlugin.stroke();
//     }
//   },
// };

// const options = {
//   lineAt: 0.25,
//   scales: {
//     xAxes: [
//       {
//         scaleLabel: {
//           display: true,
//           labelString: "Amount",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         scaleLabel: {
//           display: true,
//           labelString: "Days",
//         },
//         ticks: {
//           min: 0,
//         },
//       },
//     ],
//   },
// };

// function Graph(prop) {
//   const [carbonData, setdata] = useState(prop.data);
// //   const carbonData = prop.data;

//   let barData = {
//     labels: [...new Set(carbonData.map((data) => data.date))],
//     datasets: [
//       {
//         label: "CO",
//         backgroundColor: "rgb(81,77,203)",
//         data: [
//           ...carbonData.map((data) => {
//             if (data.gas === "CO") return parseFloat(data.amount);
//             return null;
//           }),
//         ].filter((n) => n),
//       },
//       {
//         label: "CO-2",
//         backgroundColor: "rgb(208,67,19)",
//         data: [
//           ...carbonData
//             .map((data) => {
//               if (data.gas === "CO2") return parseFloat(data.amount);
//               return null;
//             })
//             .filter((n) => n),
//         ],
//       },
//     ],
//   };

//   return <Bar data={barData} options={options} plugins={[drawLine]} />;
// }

// export default Graph;
