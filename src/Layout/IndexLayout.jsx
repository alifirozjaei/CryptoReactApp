import React from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/ui/CustomNavbar";

const IndexLayout = (props) => {
  return (
    <React.Fragment>
      <CustomNavbar />
      <div className="mx-auto container px-2 mb-2 flex flex-col justify-center items-center grow mt-24">
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default IndexLayout;
