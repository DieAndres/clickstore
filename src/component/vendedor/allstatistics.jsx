import Header from "../header";
import { useMemo } from "react";
import { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
  const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
  const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
  const labels = [100, 200, 300, 400, 500, 600, 700];
  
  const options = {
      responsive:true,
      scales:{
          y:{
              min:0
          },
      },
      plugins:{
          legend:{
              display:true,
          },
      },
  }
const Allstatistics = () =>{
    const [tipoGrafica, setTipografica] = useState('');
    const data = useMemo(function (){
        return{
            datasets:[{
                label: "Mis datos",
                data:scores,
                tension:0.3,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 6,
            }
            ],
            labels,
        }
    })
    const RenderGraf = ()=>{
        switch(tipoGrafica){
            case 'Global':
            return <Bar data={data} options={options}></Bar>
        }
    }
    return (
      <>
        <Header></Header>
            <div class="post-jumper post-jumper-5 mt-5">
                <button type="button" class="btn btn-default px-3 d-flex flex-column btn-graf" onClick={()=>setTipografica('Global')}>
                    <img src="https://tobiasahlin.com/static/graph-icons/bars.png" alt="Bar chart" width="95" height="60"></img>
                <span class="post-jumper-item-title">Bar chart</span>
                </button>
                <button type="button" class="btn btn-default px-3 d-flex flex-column btn-graf">
                <img src="https://tobiasahlin.com/static/graph-icons/line.png" alt="Line chart" width="95" height="60"></img>
                    <span class="post-jumper-item-title">Line chart</span>
                </button>
            </div>
            <RenderGraf></RenderGraf>
      </>
      );
}

export default Allstatistics;
