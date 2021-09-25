import { Bar } from "react-chartjs-2";

// const state = {
//     labels: ['January', 'February', 'March',
//              'April', 'May'],
//     datasets: [
//       {
//         label: 'Rainfall',
//         backgroundColor: 'rgba(75,192,192,1)',
//         borderColor: 'rgba(0,0,0,1)',
//         borderWidth: 2,
//         data: [65, 59, 80, 81, 56]
//       }
//     ]
//   }

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  title: {
    display: true,
    text: "Gas Emmissions per day",
    fontSize: 20,
  },
  legend: {
    display: true,
    position: "right",
  },
};

function Graph(prop) {
  const carbonData = prop.data;

  let barState = {
    labels: [...new Set(carbonData.map((data) => data.date))],
    datasets: [
      {
        label: "CO",
        backgroundColor: "blue",
        data: [
          ...carbonData.map((data) => {
            if (data.gas === "CO") return data.amount;
            return null;
          }),
        ],
      },
      {
        label: "CO2",
        backgroundColor: "red",
        data: [
          ...carbonData.map((data) => {
            if (data.gas === "CO2") return data.amount;
            return null;
          }),
        ],
      },
    ],
  };

  return <Bar data={barState} options={options} />;
}

export default Graph;
