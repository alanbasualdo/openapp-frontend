import { useState } from "react";

export const Branches = ({ setBtnActivated }) => {
  const [branch, setBranch] = useState({
    name: "",
  });

  return (
    <>
      <h1
        className="mb-2 font-medium cursor-pointer"
        onClick={() => setBtnActivated(false)}
      >
        Sucursales
      </h1>
      <hr className="mb-2" />
    </>
  );
};
