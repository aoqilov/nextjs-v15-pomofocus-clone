import Image from "next/image";
import React from "react";
import { BodyLogo } from "../../../public";

const Loading = () => {
  return (
    <div className="loading">
      <Image src={BodyLogo} alt="logo" className="loading-icon" />
      <h3>Loading ...</h3>
    </div>
  );
};

export default Loading;
