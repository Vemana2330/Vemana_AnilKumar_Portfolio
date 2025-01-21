import React from "react";
import { Allura } from "next/font/google";
import AppText from "../AppText";
import classNames from "classnames";

// Load the Allura font with fallback to Arial and sans-serif
const sacramento = Allura({ weight: "400", subsets: ["latin"] });

function HeaderLogo() {
  return (
    <div
      className={classNames(sacramento.className, "flex gap-2 shrink-0")}
      style={{ fontFamily: "'Allura', Brush Script MT" }} // Added fallback font here
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
