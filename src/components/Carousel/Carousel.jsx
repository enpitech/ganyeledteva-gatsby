import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import "./Carousel.css";

export default function CarouselComponent({ items }) {
  const data = useStaticQuery(graphql`
    query usOnMediaQuery {
      allMdx(filter: { fields: { dir: { eq: "team" } } }) {
        edges {
          node {
            frontmatter {
              img
            }
          }
        }
      }
    }
  `);

  const imgEdges = data.allMdx.edges;
  let imgArr = imgEdges.map((imgEdge) => ({
    src: imgEdge.node.frontmatter.img,
  }));

  const [currentImage, setCurrentImage] = useState(0);
  // const [refs, setRefs] = useState([]);

  // We are using react ref to 'tag' each of the images. Below will create an array of
  // objects with numbered keys. We will use those numbers (i) later to access a ref of a
  // specific image in this array.
  const refs = imgArr.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i);

    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do exactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: "smooth",
      //      Defines vertical alignment.
      block: "nearest",
      //      Defines horizontal alignment.
      inline: "start",
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalImages = imgArr.length;

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle =
    "absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? "◀" : "▶"}
      </span>
    </button>
  );

  // //pass to next image every 5 seconds
  // const MINUTE_MS = 60000;
  // useEffect(() => {
  //   let tmpRefsArr = imgArr.reduce((acc, val, i) => {
  //     acc[i] = React.createRef();
  //     return acc;
  //   }, {});

  //   setRefs(tmpRefsArr);
  //   const interval = setInterval(() => {
  //     nextImage();
  //   }, MINUTE_MS / 12);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, []);

  return (
    // Images are placed using inline flex. We then wrap an image in a div
    // with flex-shrink-0 to stop it from 'shrinking' to fit the outer div.
    // Finally the image itself will be 100% of a parent div. Outer div is
    // set with position relative, so we can place our cotrol buttons using
    // absolute positioning on each side of the image.
    <div className="w-screen flex justify-center">
      <div className="p-12 flex justify-center w-screen md:w-1/2 items-center">
        <div className="relative w-full">
          <div className="carousel">
            {sliderControl(true)}
            {imgArr.map((img, index) => (
              <div
                className="w-full flex-shrink-0"
                key={img.src}
                ref={refs[index]}
              >
                <a href="https://www.google.com" target="_blank">
                  <img src={img.src} className="w-full object-contain" />
                  <h2 className="text-center ">לחצו עליי כדי לעבור לכתבה</h2>
                </a>
              </div>
            ))}
            {sliderControl()}
          </div>
        </div>
      </div>
    </div>
  );
}
