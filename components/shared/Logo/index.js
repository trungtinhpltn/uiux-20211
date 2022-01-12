import { useRouter } from "next/router";
import React from "react";
import { useLayoutContext } from "../Layout";

const Logo = () => {
  const router = useRouter();
  const { setActiveMenu } = useLayoutContext();

  const handleClick = () => {
    setActiveMenu(-1);
    router.push(`/`);
  };
  return (
    <div className="text-center border-b">
      <p className="logo font30 pt-10 pb-10">
        <b onClick={handleClick} style={{ cursor: `pointer` }}>
          DX workplace
        </b>
      </p>
    </div>
  );
};

export default Logo;
