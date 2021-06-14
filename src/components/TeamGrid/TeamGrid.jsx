import React, { useState, Fragment, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MDXRenderer } from "gatsby-plugin-mdx";
import reactImageSize from "react-image-size";

export default function TeamGrid() {
  const data = useStaticQuery(graphql`
    query TeamQuery {
      allMdx(filter: { fields: { dir: { eq: "team" } } }) {
        edges {
          node {
            body
            frontmatter {
              title
              firstname
              lastname
              img
            }
          }
        }
      }
    }
  `);

  const [foundImagesSize, setFoundImagesSize] = useState(false);
  const [minImageSize, setMinImagesSize] = useState({
    height: Infinity,
    width: Infinity,
  });

  useEffect(() => {
    data.allMdx.edges.forEach(async (employeeEdge) => {
      reactImageSize(employeeEdge.node.frontmatter.img)
        .then(({ width, height }) => {
          if (width < minImageSize.width) {
            setMinImagesSize((prevState) => ({ ...prevState, width }));
          }

          if (height < minImageSize.height) {
            setMinImagesSize((prevState) => ({ ...prevState, height }));
          }
        })
        .catch((errorMessage) =>
          console.log("error getting image size", errorMessage)
        );
    });

    setFoundImagesSize(true);
  }, []);

  let teamList = [];
  data.allMdx.edges.forEach((employeeEdge) => {
    teamList.push({
      title: employeeEdge.node.frontmatter.title,
      firstName: employeeEdge.node.frontmatter.firstname,
      lastName: employeeEdge.node.frontmatter.lastname,
      imgPath: employeeEdge.node.frontmatter.img,
      body: employeeEdge.node.body,
    });
  });

  const containerStyle = {
    // width: "100%",
    width: "1160px",
    margin: "100px auto",
    backgroundColor: "#ccc",
  };
  const containerStyle2 = {
    width: "890px",
    margin: "auto",
  };

  const itemStyle = {
    // width: "21.833%",
    // height: "11.833%",
    height: "200px",
    width: "200px",
    float: "left",
    display: "inline-block",
    overflow: "hidden",
    marginLeft: "40px",
    marginRight: "40px",
    marginTop: "4px",
    transform: "rotate(45deg)",
    border: "solid 2px black",
    background: "transparent",
    textDecoration: "none",
    color: "#fff",
  };

  // const itemStyle = {
  //   width: "21.833%",
  //   paddingBottom: "21.833%",
  //   overflow: "hidden",
  //   float: "left",
  //   transform: "rotate(45deg)",
  //   margin: "5.5%",
  //   marginTop: "-11%",
  //   backgroundColor: "#fff",
  //   backgroundSize: "cover",
  //   display: "block",
  // };

  return (
    <div>
      <div style={containerStyle}>
        {[1, 2, 3].map((x) => {
          return (
            <div style={itemStyle}>
              <div
                style={{
                  display: "table-cell",
                  width: "20rem",
                  height: "20rem",
                  backgroundColor: "red",
                }}
              >
                {x}
              </div>
            </div>
          );
        })}
      </div>
      <div style={containerStyle2}>
        {[1, 2].map((x) => {
          return (
            <div style={itemStyle}>
              <div
                style={{
                  display: "table-cell",
                  width: "200px",
                  height: "200px",
                  backgroundColor: "blue",
                }}
              >
                {x}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div style={containerStyle}>
        {[1, 2, 3, 4].map((x) => {
          return (
            <div style={itemStyle}>
              <div
                style={{
                  display: "table-cell",
                  width: "200px",
                  height: "200px",
                }}
              >
                {x}
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

const EmployeeCard = ({ details, minImageSize }) => {
  const { height: minImgHeight, width: minImgWidth } = minImageSize;
  const [open, setOpen] = useState(false);

  return (
    <div
      className="text-white hover:text-red-link text-lg text-center inline-block bg-red-100"
      style={{
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",

        // height: minImgHeight,
        // width: minImgWidth,
      }}
    >
      <button onClick={() => setOpen(!open)}>
        <div className=" relative">
          <div
            className="absolute flex flex-col justify-center"
            // style={{ height: minImgHeight, width: minImgWidth }}
          >
            {/* <div className="absolute flex flex-col justify-center w-full h-full" style={{ height: minImgHeight, width: minImgWidth }}> */}
            {details.title}
          </div>

          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto h-full bg-black bg-opacity-80 text-white"
              open={open}
              onClose={setOpen}
            >
              <div className="md:grid grid-cols-3 pt-20">
                <div
                  className="hidden md:block m-auto bg-red-100 text-center w-72 h-72"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                >
                  <img className=" h-full" src={details.imgPath} />
                </div>
                <div className="col-span-2 w-4/5 mx-10">
                  <button
                    type="button"
                    className="float-left h-10 w-10"
                    onClick={() => setOpen(!open)}
                  >
                    <XIcon />
                  </button>

                  <Dialog.Title className="text-5xl mb-5">
                    {details.firstName} {details.lastName}
                  </Dialog.Title>
                  <div className="text-xl">
                    <MDXRenderer>{details.body}</MDXRenderer>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <div>
            <img
              // style={{ height: minImgHeight, width: minImgWidth }}
              // className="h-44 w-72"
              src={details.imgPath}
            />
          </div>
        </div>
      </button>
    </div>
  );
};
