import React from 'react';
import logo from '../../../../static/logos/logo.png';
import cloudBig from '../../../../static/img/pics/icons/cloud_big.svg';
import bird from '../../../../static/img/pics/icons/bird.svg';
import treeLev from '../../../../static/img/pics/icons/tree_lev.svg';
import treeTri from '../../../../static/img/pics/icons/tree_tri.svg';
import * as mainHeaderStyles from '../../../styles/main-header.module.css';
import Logo from '../../Logo/Logo';

export default function HomeHeader() {
  return (
    <header>
      <div className="md:hidden  bg-gradient-to-r from-green-300 to-green-100">
        <div className="flex justify-center align-items w-full p-6 bg-patt2">
          <Logo className="w-40" />
        </div>
      </div>
      <div className="hidden sm:block">
        <div id="draw" className="z-40 absolute" style={{ height: 500 }} />
        <div
          className="bg-gradient-to-tl from-blue-300 to-green-400"
          style={{ height: 500 }}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 z-50 relative pointer-events-none	">
              <div>
                <div className="text-center">
                  <img
                    src={logo}
                    className="h-60 mt-24 sm:h-72 sm:mt-24 sm:-mr-8 md:h-64 md:mr-4 md:mt-34 lg:mr-16 lg:h-80 lg:mt-18 xl:mr-16 xl:h-96 xl:mt-14"
                    alt="Logo"
                  />
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-xl mt-32 xl:text-2xl xl:mt-24 font-bold"
                  style={{
                    color: '#63cccb',
                  }}
                >
                  <div>מתוך ההיכרות עם הילדים, למדתי כי הילדים</div>
                  <div>הקטנים האלו, הם אנשים חכמים ורגישים, עם</div>
                  <div>
                    {' '}
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
                    position: 'absolute',
                    top: 465,
                    left: 0,
                    opacity: '0.5',
                  }}
                >
                  לחצו להחלפת צבע
                </div>
                <div>
                  <img
                    src={cloudBig}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 400,
                      height: 155,
                    }}
                    alt="home header cloud"
                  />
                  <img
                    src={bird}
                    style={{
                      position: 'absolute',
                      top: 40,
                      left: 480,
                      height: 65,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: 'absolute',
                      top: 20,
                      left: 500,
                      height: 65,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={cloudBig}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 100,
                      height: 155,
                    }}
                    alt="home header cloud"
                  />
                  <img
                    src={bird}
                    style={{
                      position: 'absolute',
                      top: 40,
                      left: 100,
                      height: 55,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: 'absolute',
                      top: 20,
                      left: 120,
                      height: 55,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={treeLev}
                    style={{
                      position: 'absolute',
                      top: 304,
                      left: 110,
                      height: 255,
                    }}
                    alt="home header tree heart shape"
                  />
                  <img
                    src={treeLev}
                    style={{
                      position: 'absolute',
                      top: 346,
                      left: 90,
                      height: 200,
                    }}
                    alt="home header tree heart shape"
                  />
                  <img
                    src={treeTri}
                    style={{
                      position: 'absolute',
                      top: 278,
                      left: 370,
                      height: 295,
                    }}
                    alt="home header tree triangle shape"
                  />
                  <img
                    src={bird}
                    style={{
                      position: 'absolute',
                      top: 340,
                      left: 410,
                      height: 75,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: 'absolute',
                      top: 320,
                      left: 500,
                      height: 75,
                    }}
                    alt="home header bird"
                  />
                  <img
                    src={bird}
                    style={{
                      position: 'absolute',
                      top: 350,
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
