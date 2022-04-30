import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { SingleCoin } from '../Config/apis'
import CoinChart from '../Components/CoinChart'
const parse = require('html-react-parser');

const Coinpage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState()

  const { currency } = CryptoState()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  if (!coin) return (
    <div className="progress">
      <div className="progress-bar progress-bar-striped progress-bar-animated progress-style" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" ></div>
    </div>
  )

  return (
    <div className='container-fluid d-md-flex flex-md-row' >
      <div className='sidebar'>
        <img
          src={coin?.image.large} 
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 25, alignSelf: 'center' }}
        />
        <p className='h3' style={{ fontWeight: 'bold', marginBottom: 20 }}>{coin?.name}</p>
        <p className='lead description'>{parse(coin?.description.en.split(". ")[0])}</p>
        <p className='h5 py-2'> Rank : {coin?.market_cap_rank}</p>
        <p className='h6 py-2'> Official site : <a href={coin?.links.homepage[0]}>{coin?.links.homepage[0]}</a></p>
      </div>

      <CoinChart coin={coin} />

    </div>
  )
}

export default Coinpage