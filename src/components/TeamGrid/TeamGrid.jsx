import React, { useState, Fragment, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MDXRenderer } from "gatsby-plugin-mdx";
const mainDummyTitle = "צוות הגן";
const diamondSideLength = 27;

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
              index
            }
          }
        }
      }
    }
  `);

  let teamList = [];
  data.allMdx.edges.forEach((employeeEdge) => {
    teamList.push({
      title: employeeEdge.node.frontmatter.title,
      firstName: employeeEdge.node.frontmatter.firstname,
      lastName: employeeEdge.node.frontmatter.lastname,
      imgPath: employeeEdge.node.frontmatter.img,
      body: employeeEdge.node.body,
      index: employeeEdge.node.frontmatter.index,
    });
  });

  teamList.sort((a, b) => (a.index > b.index ? 1 : -1));
  let splittedTeamList = [];
  let mainDummyDiamond = { title: mainDummyTitle };
  let DummyDiamond = { title: "", isDummy: true };
  splittedTeamList.push([teamList[0], mainDummyDiamond, teamList[1]]);
  let teamListWithoutFirstTwo = teamList.slice(2);
  let shouldTakeTwoEmployees = true;
  for (let i = 0; i < teamListWithoutFirstTwo.length; ) {
    if (shouldTakeTwoEmployees) {
      splittedTeamList.push(teamListWithoutFirstTwo.slice(i, i + 2));
      shouldTakeTwoEmployees = false;
      i += 2;
    } else {
      splittedTeamList.push(teamListWithoutFirstTwo.slice(i, i + 3));
      i += 3;
      shouldTakeTwoEmployees = true;
    }
  }

  const oneBeforeLastSubArrLen =
    splittedTeamList[splittedTeamList.length - 2].length;
  const lastSubArrLen = splittedTeamList[splittedTeamList.length - 1].length;

  if (oneBeforeLastSubArrLen === 2 && lastSubArrLen != 3) {
    for (let i = 0; i < oneBeforeLastSubArrLen - lastSubArrLen + 1; i++)
      splittedTeamList[splittedTeamList.length - 1].push(DummyDiamond);
  } else if (oneBeforeLastSubArrLen === 3 && lastSubArrLen === 1)
    splittedTeamList[splittedTeamList.length - 1].push(DummyDiamond);

  return (
    <>
      <div className="hidden md:block w-full -mb-20 mt-10">
        {splittedTeamList.map((singleSplittedTeamList, index) => {
          return (
            <div
              className="text-center w-full"
              style={{
                marginTop:
                  index === 0 ? "auto" : `-${(diamondSideLength - 1) / 2}vw`,
              }}
            >
              {singleSplittedTeamList.map((employeeDetails) => (
                <EmployeeCardDesktop details={employeeDetails} />
              ))}
            </div>
          );
        })}
      </div>

      <div className="block md:hidden w-full grid grid-cols-2 gap-2 text-center px-2">
        {teamList.map((employeeDetails) => {
          return <EmployeeCardMobile details={employeeDetails} />;
        })}
      </div>
    </>
  );
}

const EmployeeCardDesktop = ({ details }) => {
  const { title, imgPath, body, firstName, lastName, isDummy } = details;
  const [open, setOpen] = useState(false);
  return (
    <div
      className="inline-block text-white hover:text-red-link md:text-3xl lg:text-4xl xl:text-6xl text-center mx-4"
      style={{
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        backgroundImage: `url(${imgPath})`,
        backgroundSize: "cover",
      }}
    >
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <div
          className="relative mt-auto mr-auto"
          style={{
            width: `${diamondSideLength}vw`,
            height: `${diamondSideLength}vw`,
          }}
        >
          {details.isDummy ? null : (
            <div className="absolute inset-0">
              <div
                className={`h-full w-full absolute  ${
                  title === mainDummyTitle ? "text-red-link top-1/3" : "top-2/3"
                }`}
              >
                <div className=" flex flex-col justify-center">{title}</div>
              </div>
              {title === mainDummyTitle ? null : (
                <EmployeeModal
                  show={open}
                  as={Fragment}
                  onClose={setOpen}
                  firstName={firstName}
                  lastName={lastName}
                  imgPath={imgPath}
                  body={body}
                />
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

const EmployeeCardMobile = ({ details }) => {
  const { title, imgPath, body, firstName, lastName } = details;
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="bg-red-500">
      <div
        className="w-full h-24 "
        style={{
          backgroundImage: `url(${imgPath})`,
          backgroundSize: "cover",
        }}
      >
        <EmployeeModal
          show={open}
          as={Fragment}
          onClose={setOpen}
          firstName={firstName}
          lastName={lastName}
          imgPath={imgPath}
          body={body}
        />
      </div>
      <div className="bg-gray-200 h-8 text-xl w-full">{title}</div>
    </button>
  );
};

const EmployeeModal = ({
  show,
  as,
  onClose,
  imgPath,
  firstName,
  lastName,
  body,
}) => {
  return (
    <Transition.Root show={show} as={as}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto h-full bg-black bg-opacity-90 text-white"
        open={show}
        onClose={onClose}
      >
        <div className="md:grid grid-cols-3 pt-20">
          <div
            className="hidden md:block m-auto bg-red-100 text-center"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              backgroundImage: `url(${imgPath})`,
              backgroundSize: "cover",
              width: `${diamondSideLength}vw`,
              height: `${diamondSideLength}vw`,
            }}
          />
          <div className="col-span-2 w-4/5 mx-10">
            <button
              type="button"
              className="float-left h-10 w-10"
              onClick={() => onClose(!show)}
            >
              <XIcon />
            </button>

            <Dialog.Title className="text-5xl mb-5">
              {firstName} {lastName}
            </Dialog.Title>
            <div className="text-2xl">
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
