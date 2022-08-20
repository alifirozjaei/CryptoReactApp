import millify from "millify";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Spinner from "../components/Spinner";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const count = props.simplify ? 10 : 50;
  const [offset, setOffset] = useState(queryParams.get("page")? +queryParams.get("page") - 1 : 0);
  const { data, isFetching } = useGetCryptosQuery({ count, offset });

  const [cryptoes, setCryptoes] = useState(data?.data?.coins);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    setCryptoes(data?.data?.coins);
    setIsFirst(false);
  }, [data, setCryptoes]);


  const inputChangeHandler = (e) => {
    const filteredData = data?.data?.coins.filter((item) =>
      item.name.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) >= 0
        ? true
        : false
    );
    setCryptoes(filteredData);
  };

  const pageChangeHandler = (e) => {
    setOffset(e.selected);
    navigate(".?page=" + (1 + e.selected), { replace: false });
  };
  return (
    <div className="h-auto w-full grow ">
      {!isFetching && !isFirst && !props.simplify && (
        <div className="flex justify-center my-2 mb-6">
          <input
            type="text"
            className="p-3 w-full md:w-1/2 border  bg-blue-100 font-bold rounded-none placeholder:font-normal placeholder:text-slate-600 focus:outline-blue-500 outline-2"
            placeholder="Search cryptocurrency..."
            onChange={inputChangeHandler}
          />
          <button className="p-2 shadow-md px-4 bg-blue-500 hover:bg-blue-800 hover:text-white transition-all">
            Search
          </button>
        </div>
      )}
      {/* Search cryptocurrency */}

      {!isFetching && cryptoes && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {cryptoes.map((item) => (
            <div
              key={item.uuid}
              className="p-3 border rounded bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <div className="text-center font-bold text-lg border-b py-1 mb-2">
                <Link
                  className="text-blue-600 hover:text-blue-600 transition-all flex justify-between items-center py-2"
                  to={`/crypto/${item.uuid}`}
                >
                  <span>
                    {item.rank}. {item.name}
                  </span>
                  <img
                    src={item.iconUrl}
                    className="w-10 h-10 object-contain "
                    alt=""
                  />
                </Link>
              </div>
              <div className="space-y-1">
                <div> Price: {item.price? millify(item.price, { precision: 2 }): '-'} $</div>
                <div>Market Cap: {item.marketCap? millify(item.marketCap): '-'}</div>
                <div>Daily Change: {item.change ? millify(item.change): '-'} %</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* cryptoes list */}
      {!isFetching && cryptoes && cryptoes.length === 0 && (
        <p className="text-xl text-center my-8"> Crypto Not Founded!</p>
      )}
      {/* NotFound Crypto */}

      <div className="flex items-center justify-center">
        {isFetching && <Spinner className="w-12 h-12 border-b-blue-500" />}
      </div>
      {/* show loading spinner when fetching data */}

      {/* pagination */}
      {!props.simplify && (
        <div className="custom-pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={pageChangeHandler}
            pageRangeDisplayed={2}
            pageCount={data?.data?.stats?.total / count}
            previousLabel="<"
            renderOnZeroPageCount={null}
            activeLinkClassName="bg-slate-600 hover:bg-slate-600"
            pageLinkClassName="p-2 text-lg bg-blue-400 text-white rounded hover:bg-blue-600"
            forcePage={offset}
            nextLinkClassName='text-lg border p-2 bg-gray-200 rounded'
            previousLinkClassName='text-lg border p-2 bg-gray-200 rounded'
          />
        </div>
      )}
      {/* end pagination */}
    </div>
  );
};

export default Cryptocurrencies;
