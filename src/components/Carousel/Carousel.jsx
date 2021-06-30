import React from "react";
import { useStaticQuery, graphql } from "gatsby";
// import { Carousel as ResCarousel } from "react-responsive-carousel";
// import { Carousel as Carousel3D } from "3d-react-carousal";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Carousel from "@brainhubeu/react-carousel";
// import "@brainhubeu/react-carousel/lib/style.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function CarouselComponent() {
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

  return (
    <AliceCarousel autoPlay={true}>
      {imgArr.map((img) => (
        <img className="w-20 h-20" src={img.src} />
      ))}
    </AliceCarousel>
    // <div className="mr-20 ">
    // <Carousel3D
    //   className="w-11/12 h-1/2"
    //   slides={slides}
    //   autoplay={true}
    //   interval={2000}
    // />
    /* <ResCarousel infiniteLoop={true} autoPlay={false} showArrows={true}>
        {imgArr.map((img) => (
          <img className="border-5" src={img.src} />
        ))}
      </ResCarousel>
      <img className="border-5" src={imgArr[0].src} />
      <img className="border-5" src={imgArr[0].src} />
      <img className="border-5" src={imgArr[0].src} />
      <ul>
        <li>
          <img className="border-5" src={imgArr[0].src} />
        </li>
        <li>
          <img className="border-5" src={imgArr[0].src} />
        </li>
        <li>
          <img className="border-5" src={imgArr[0].src} />
        </li>
      </ul> */

    /* {imgArr.map((img) => (
        <img src={img.src} />
      ))} */
    // </div>
  );
}
