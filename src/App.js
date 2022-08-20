import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// import layout
import IndexLayout from "./Layout/IndexLayout";

// import pages
import Cryptocurrencies from "./Pages/Cryptocurrencies";
import Home from "./Pages/Home";
import News from "./Pages/News";

// import components
import Spinner from "./components/Spinner";

const Exchanges = React.lazy(() => import("./Pages/Exchanges"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const CryptoDetail = React.lazy(() => import("./Pages/CryptoDetail"));

const FallbackElement = () => (
  <div className="flex items-center justify-center">
    <Spinner className="w-12 h-12 border-b-blue-500" />
  </div>
);

function App() {
  return (
    <div className="w-full min-h-screen h-auto flex flex-col font-sans">
      <Routes>
        <Route path="/" element={<IndexLayout />}>
          <Route index element={<Home />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route
            path="/exchanges"
            element={
              <React.Suspense fallback={<FallbackElement />}>
                <Exchanges />
              </React.Suspense>
            }
          />
          <Route path="/news" element={<News />} />
          <Route
            path="/crypto/:coinId"
            element={
              <React.Suspense fallback={<FallbackElement />}>
                <CryptoDetail />
              </React.Suspense>
            }
          />
          <Route
            path="/404"
            element={
              <React.Suspense fallback={<FallbackElement />}>
                <NotFound />
              </React.Suspense>
            }
          />
        </Route>

        {/* NotFoud */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>

      <br />
      <footer className="mt-auto border p-4 text-center text-slate-500 ">
        &copy; 2022
        <br />
        All rights reserved.
      </footer>
    </div>
  );
}

export default App;
