import React from "react";
import logo from "../../../../static/logos/logo.png";
import cloudBig from "../../../../static/img/pics/icons/cloud_big.svg";
import bird from "../../../../static/img/pics/icons/bird.svg";
import treeLev from "../../../../static/img/pics/icons/tree_lev.svg";
import treeTri from "../../../../static/img/pics/icons/tree_tri.svg";
import * as mainHeaderStyles from "../../../styles/main-header.module.css";
import Logo from "../../Logo/Logo";

const sketchableHeroHeight = 450;
export default function HomeHeader() {
  return (
    <header>
      <div className="md:hidden bg-gradient-to-r from-green-300 to-green-100">
        <div className="flex justify-center align-items w-full p-6 bg-patt2">
          <Logo className="w-40" />
        </div>
      </div>
      <div className="hidden md:block">
        <div
          id="draw"
          className="z-40 absolute"
          style={{ height: sketchableHeroHeight }}
        />
        <div
          className="bg-gradient-to-tl from-blue-300 to-green-400"
          style={{ height: sketchableHeroHeight }}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 z-50 relative pointer-events-none	">
              <div>
                <div className="text-center">
                  <img
                    src={logo}
                    className="h-60 mt-20 sm:h-72 sm:-mr-8 md:h-64 md:mr-4 md:mt-28 lg:mr-16 lg:h-80 lg:mt-14 xl:mr-16 xl:h-96 xl:mt-10"
                    alt="Logo"
                  />
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-xl mt-32 xl:text-2xl xl:mt-24 font-bold"
                  style={{
                    color: "#63cccb",
                  }}
                >
                  <div>מתוך ההיכרות עם הילדים, למדתי כי הילדים</div>
                  <div>הקטנים האלו, הם אנשים חכמים ורגישים, עם</div>
                  <div>
                    {" "}
                    <span>רצון עז ללמוד ו...</span>
                    <span
                      className={mainHeaderStyles.typewriter}
                      id="hiddenText"
                    >
                      סקרנות אין קץ!
                    </span>
                  </div>
                  <div>הבנתי כי בניגוד לתפיסה הרווחת, התינוקות מבינים</div>
                  <div>את השפה שלנו על אף שאינם מדברים, לומדים</div>
                  <div>במהרה גם ללא הסברים ובעיקר מסוגלים</div>
                  <div>להרבה מעבר למה שנדמה לנו.</div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 405,
                    left: 15,
                    opacity: "0.5",
                  }}
                >
                  לחצו להחלפת צבע
                </div>
                <div>
                  <img
                    src={cloudBig}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 400,
                      height: 155,
                    }}
                    alt="home header cloud"
                  />
                  <img
                    src={bird}
                    style={{
                      position: "absolute",
                      top: 30,
                      left: 480,
                      height: 65,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 500,
                      height: 65,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={cloudBig}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 100,
                      height: 155,
                    }}
                    alt="home header cloud"
                  />
                  <img
                    src={bird}
                    style={{
                      position: "absolute",
                      top: 30,
                      left: 100,
                      height: 55,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 120,
                      height: 55,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={treeLev}
                    style={{
                      position: "absolute",
                      top: sketchableHeroHeight - 197,
                      left: 110,
                      height: 255,
                    }}
                    alt="home header tree heart shape"
                  />
                  <img
                    src={treeLev}
                    style={{
                      position: "absolute",
                      top: sketchableHeroHeight - 155,
                      left: 90,
                      height: 200,
                    }}
                    alt="home header tree heart shape"
                  />
                  <img
                    src={treeTri}
                    style={{
                      position: "absolute",
                      top: sketchableHeroHeight - 223,
                      left: 370,
                      height: 295,
                    }}
                    alt="home header tree triangle shape"
                  />
                  <img
                    src={bird}
                    style={{
                      position: "absolute",
                      top: sketchableHeroHeight - 149,
                      left: 410,
                      height: 75,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: "absolute",
                      top: sketchableHeroHeight - 159,
                      left: 500,
                      height: 75,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: "absolute",
                      top: sketchableHeroHeight - 129,
                      left: 530,
                      height: 75,
                    }}
                    alt="home header bird"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
