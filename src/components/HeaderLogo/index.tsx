import React from "react";
import AppText from "../AppText";
import classNames from "classnames";

function HeaderLogo() {
  return (
    <div
      className={classNames("flex gap-2 shrink-0")}
      style={{ fontFamily: "'Brush Script MT'" }} // Set font to Brush Script MT
    >
      <AppText textTag="span" secondary customClass="sm:text-4xl text-3xl">
        {""}
      </AppText>
      <a href="#">
        <AppText textTag="span" defaultColor customClass="sm:text-4xl text-3xl">
          {"Vemana A"}
        </AppText>
      </a>
      <AppText textTag="span" secondary customClass="sm:text-4xl text-3xl">
        {""}
      </AppText>
    </div>
  );
}

export default HeaderLogo;
