import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../Config/apis'
import { CryptoState } from '../CryptoContext'

export function priceWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([])
  const { currency,symbol } = CryptoState()

  const getTrendingCoins = async() => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  useEffect(() => {
    getTrendingCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])
  

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >=0;

    return (
      <Link style={{ textDecoration: 'none' }}
      className='carousel-item'
      to={`/coins/${coin.id}`}
      >
        <img src={coin?.image}
          alt={coin.name}
          height="100"
          style={{marginBottom: 10}}
        />
          <span>
            {coin?.symbol}
            &nbsp;&nbsp;
            <span style={{
              color: profit ? "rgb(14, 203,49)": "red",
              fontSize:13,
              fontWeight: 500
            }}>
              {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{fontSize:22, fontWeight:500}}>
          {symbol} {priceWithCommas(coin?.current_price.toFixed(2))}
          </span>

      </Link>
    )
  })

  const responsive = {
    0:{
      items:2,
    },
    500: {
      items:3,
    },
    768: {
      items:4,
    },
    1200: {
      items:5,
    }
  }

  return (
    <div className='carousel-container'>
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1200}
      animationDuration={1800}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
    />
    </div>
  )
}

export default Carousel