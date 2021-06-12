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

  let minImgWidth = Infinity;
  let minImgHeight = Infinity;
  useEffect(() => {
    data.allMdx.edges.forEach(async (employeeEdge) => {
      reactImageSize(employeeEdge.node.frontmatter.img)
        .then(({ width, height }) => {
          if (width < minImgWidth) minImgWidth = width;

          if (height < minImgHeight) minImgHeight = height;
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

  return foundImagesSize ? (
    <div className="flex flex-wrap space-10">
      {teamList.map((employeeMdDetails) => (
        <EmployeeCard
          details={employeeMdDetails}
          minImgHeight={minImgHeight}
          minImgWidth={minImgWidth}
        />
      ))}
    </div>
  ) : null;
}

const EmployeeCard = ({ details, minImgHeight, minImgWidth }) => {
  console.log(minImgHeight, minImgWidth);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="text-white hover:text-red-link text-lg text-center w-44 h-44 bg-red-100"
      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
    >
      <button onClick={() => setOpen(!open)}>
        <div className=" relative">
          <div className="absolute flex flex-col justify-center  w-full h-full">
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
              style={{ height: minImgHeight, width: minImgWidth }}
              src={details.imgPath}
            />
          </div>
        </div>
      </button>
    </div>
  );
};
