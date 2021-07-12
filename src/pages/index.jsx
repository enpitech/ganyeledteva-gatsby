import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby";
import _ from "lodash";
import $ from "jquery";

import Layout from "../layout";
import config from "../../data/SiteConfig";
import Home from "../components/Pages/Home/Home";
import useScript from "../hooks/useScript";

const sketchScriptPath = withPrefix("js/lib/sketch.js");

function initSketchDrawer() {
  let color = "#f7479e";
  let mainVisibleTextColor = "#B4F8C8";
  const COLORS = ["#ff2b56", "#4b2ac8", "#f36c4f", "#1b522f", "#fff797"];
  const WINDOW_WIDTH = window.innerWidth;
  let radius = 0;

  let colorIndex = -1;
  const changeColor = function () {
    colorIndex += 1;
    if (colorIndex === COLORS.length) {
      colorIndex = 0;
    }
    color = COLORS[colorIndex];

    $("#hiddenText")
      .css("color", mainVisibleTextColor)
      .css("borderBottomColor", mainVisibleTextColor);
  };

  const draw = function () {
    if (this.touches === undefined) {
      return;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = this.touches.length - 1; i >= 0; i--) {
      const touch = this.touches[i];

      this.lineCap = "round";
      this.lineJoin = "round";
      this.fillStyle = color;
      this.strokeStyle = color;
      this.lineWidth = radius;

      this.beginPath();
      this.moveTo(touch.ox, touch.oy);
      this.lineTo(touch.x, touch.y);
      this.stroke();
    }
  };

  function initSketch() {
    // eslint-disable-next-line no-undef
    return Sketch.create({
      container: document.getElementById("draw"),
      autoclear: false,
      retina: "auto",
      fullscreen: false,
      height: 500,
      width: WINDOW_WIDTH,

      setup() {
        changeColor();
      },
      mousedown() {
        changeColor();
        // eslint-disable-next-line no-plusplus
        for (let i = this.touches.length - 1; i >= 0; i--) {
          const touch = this.touches[i];

          this.lineCap = "round";
          this.lineJoin = "round";
          this.fillStyle = color;
          this.strokeStyle = color;
          this.lineWidth = radius;

          this.beginPath();
          this.moveTo(touch.ox, touch.oy);
          this.lineTo(touch.x, touch.y);
          this.stroke();
        }
      },
      update() {
        radius = 2 + Math.abs(Math.sin(this.millis * 0.003) * 55);
      },

      // Event handlers

      keydown() {
        if (this.keys.C) this.clear();
      },

      // Mouse & touch events are merged, so handling touch events by default
      // and powering sketches using the touches array is recommended for easy
      // scalability. If you only need to handle the mouse / desktop browsers,
      // use the 0th touch element and you get wider device support for free.
      touchmove: draw,
    });
  }

  window.sketch = initSketch();

  // handle resize
  const lazyLayout = _.debounce(() => {
    // WINDOW_WIDTH = window.innerWidth;
    if (window.sketch) window.sketch.destroy();
    window.sketch = initSketch();
  }, 500);
  $(window).on("resize", lazyLayout);
}

function HomePage() {
  const status = useScript(sketchScriptPath);

  useEffect(() => {
    if (status === "ready") {
      initSketchDrawer();
    }
  }, [status]);

  return (
    <Layout>
      <div>
        <Helmet title={`גן ילדי הטבע | ${config.siteTitle}`} />
        <Home />
      </div>
    </Layout>
  );
}

export default HomePage;
