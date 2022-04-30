import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CryptoState } from '../CryptoContext'
import { HistoricalChart } from '../Config/apis'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const CoinChart = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()
  const chartDays = [
    {
      label: "24 H",
      value: 1,
    },
    {
      label: "30 D",
      value: 30,
    },
    {
      label: "3 M",
      value: 90,
    },
    {
      label: "1 Yr",
      value: 365,
    },
  ]

  const fetchHistoricalCoinData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricalData(data.prices)
  }

  useEffect(() => {
    fetchHistoricalCoinData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days])


  return (
    <div className='chart-container'>
      {
        !historicalData ?
          <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
          : (<>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0])
                  let time = date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`

                  return days === 1 ? time : date.toLocaleDateString()
                }),

                datasets: [{
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price Past ${days} Day(s) in ${currency}`,
                  borderColor: 'rgb(68, 130, 222)'
                }]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  }
                }

              }}
            />
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: 30
            }}>
              {chartDays.map((day) => (
                <button
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  style={{
                    backgroundColor: (day.value) === days ? '#007bff' : '',
                    color: (day.value) === days ? '#fff' : '',
                    width: '22%'
                  }}
                  type="button" className="btn btn-outline-primary text-break">{day.label}</button>
              ))}
            </div>
          </>)
      }

    </div>
  )
}

export default CoinChart