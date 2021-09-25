import { Bar } from 'react-chartjs-2';

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

function Graph(prop) {
    const carbonData = prop.data;

   let barState = {
        labels: [carbonData.map((data) => data.date)],
        datasets: [
            {
                label: 'CO',
                backgroundColor: 'green',
                borderColor: 'yellow',
                borderWidth: 1,
                data: [carbonData.map((data) => data.amount)]
            }
        ]
    }


    return (
        <Bar
             data={barState}
          options={{
            title:{
              display:true,
              text:'Gas Emmissions per day',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    );
}

export default Graph;