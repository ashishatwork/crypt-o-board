import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/apis'
import { CryptoState } from '../CryptoContext'
import { useNavigate } from 'react-router-dom'
import { priceWithCommas } from './Carousel'
import ReactPaginate from 'react-paginate'

const CoinsTable = () => {
  const [coinList, setCoinList] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const { currency, symbol } = CryptoState()

  const getCoinsList = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoinList(data);
    setLoading(false)
  }


  useEffect(() => {
    getCoinsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const handleSearch = () => {
    return coinList.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
    window.scroll(0, 950)

  }

  return (
    <div className='container' style={{ textAlign: 'center' }}>
      <div className='h3' style={{ margin: 18 }}>
        Crypocurrency Prices by Market Cap
      </div>

      <form className="d-flex">
        <input className="form-control me-2" style={{ marginBottom: 20 }}
          type="search" placeholder="Search crypto"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className='table-responsive' id='coins-table'>

        {
          loading ? (
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated progress-style" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" ></div>
            </div>
          ) : (
            <>
              <table className="table table-hover">
                <thead style={{ backgroundColor: 'rgb(204, 224, 255)' }}>
                  <tr >
                    {["Coin", "Price", "24h Change", "Market Cap"].map((header) => (
                      <th style={{ color: 'black', fontWeight: '700' }}
                        key={header}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0
                      return (
                        <tr
                          onClick={() => navigate(`/coins/${row.id}`)}
                          key={row.name}
                        >
                          <th scope='row' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                            <div style={{ paddingTop: 10, marginRight: 50 }}>
                              <span style={{ textTransform: 'uppercase', fontWeight: 400, fontSize: 18 }}>{row.market_cap_rank}</span>
                            </div>
                            <img
                              src={row?.image}
                              alt={row.name}
                              height='50'
                              style={{ marginBottom: '15' }}
                            />
                            <div style={{ width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ width: '40%', alignItems: 'center' }}>
                                <span style={{ textTransform: 'uppercase', fontSize: 20 }}>{row.symbol}</span>
                              </div>
                              <span style={{ color: 'darkgray', fontSize: 18, fontWeight: 400 }}>{row.name}</span>
                            </div>
                          </th>
                          <td
                            data-title='Price'
                          >
                            {symbol}{" "}{priceWithCommas(row.current_price.toFixed(2))}

                          </td>
                          <td
                            data-title='24h Change'
                            style={{
                              color: profit > 0 ? "rgb(14, 203,49)" : "red",
                              fontWeight: 500
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </td>
                          <td 
                            data-title='Market Cap'
                          >{symbol}{" "}
                            {priceWithCommas(row.market_cap.toString().slice(0, -6))}M
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </>
          )
        }

      </div>
      <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        pageCount={Math.ceil(handleSearch()?.length / 10)}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination justify-content-center'
        activeClassName='active'
        renderOnZeroPageCount={null}
      />

    </div>
  )
}

export default CoinsTable