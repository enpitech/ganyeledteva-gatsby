import React, { useState, Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MDXRenderer } from "gatsby-plugin-mdx";

const mainEmptyDiamondTitle = "צוות הגן";
const diamondSideEdgeLength = 27;

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

  let teamList = data.allMdx.edges.map((employeeEdge) => {
    const { body } = employeeEdge.node;
    const {
      title,
      firstname,
      lastname,
      img,
      index,
    } = employeeEdge.node.frontmatter;

    return {
      title,
      firstname,
      lastname,
      imgPath: img,
      index,
      content: body,
    };
  });

  teamList.sort((a, b) => (a.index > b.index ? 1 : -1));

  let teamListDesktop = prepareTeamListForDiamondGrid(teamList);

  return (
    <div className="mt-10">
      <div className="hidden md:block w-full -mb-20 ">
        {teamListDesktop.map((singleSplittedTeamList, index) => {
          return (
            <div
              key={index}
              className="text-center w-full"
              style={{
                marginTop:
                  index === 0
                    ? "auto"
                    : `-${(diamondSideEdgeLength - 1) / 2}vw`,
              }}
            >
              {singleSplittedTeamList.map((employeeData, index) => (
                <EmployeeCardDesktop key={index} data={employeeData} />
              ))}
            </div>
          );
        })}
      </div>

      <div className="block md:hidden w-full grid grid-cols-2 gap-2 text-center px-2">
        {teamList.map((employeeData, index) => {
          return <EmployeeCardMobile key={index} data={employeeData} />;
        })}
      </div>
    </div>
  );
}

const EmployeeCardDesktop = ({ data }) => {
  const { title, imgPath, content, firstName, lastName, isEmpty } = data;
  const [open, setOpen] = useState(false);

  return (
    <div
      className="inline-block text-white hover:text-red-link md:text-3xl lg:text-3xl xl:text-5xl text-center mx-4"
      style={{
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        backgroundImage: `url(${imgPath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <div
          className="relative mt-auto mr-auto"
          style={{
            width: `${diamondSideEdgeLength}vw`,
            height: `${diamondSideEdgeLength}vw`,
          }}
        >
          {isEmpty ? null : (
            <div className="absolute inset-0">
              <div
                className={`h-full w-full absolute  ${
                  title === mainEmptyDiamondTitle
                    ? "text-red-link top-1/3"
                    : "top-2/3"
                }`}
              >
                <div className=" flex flex-col justify-center">{title}</div>
              </div>
              {title === mainEmptyDiamondTitle ? null : (
                <EmployeeModal
                  open={open}
                  onClose={setOpen}
                  firstName={firstName}
                  lastName={lastName}
                  imgPath={imgPath}
                  content={content}
                />
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

const EmployeeCardMobile = ({ data }) => {
  const { title, imgPath, content, firstName, lastName } = data;
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="focus:outline-none">
      <div
        className="w-full h-24 "
        style={{
          backgroundImage: `url(${imgPath})`,
          backgroundSize: "cover",
        }}
      >
        <EmployeeModal
          open={open}
          onClose={setOpen}
          firstName={firstName}
          lastName={lastName}
          imgPath={imgPath}
          content={content}
        />
      </div>
      <div className="bg-gray-200 h-8 text-xl w-full">{title}</div>
    </button>
  );
};

const EmployeeModal = ({
  open,
  onClose,
  imgPath,
  firstName,
  lastName,
  content,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto h-full bg-black bg-opacity-90 text-white"
        open={open}
        onClose={onClose}
      >
        <div className="md:grid grid-cols-3 pt-20">
          <div
            className="hidden md:block m-auto bg-red-100 text-center"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              backgroundImage: `url(${imgPath})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: `${diamondSideEdgeLength}vw`,
              height: `${diamondSideEdgeLength}vw`,
            }}
          />
          <div className="col-span-2 w-4/5 mx-10">
            <button
              type="button"
              className="float-left h-10 w-10"
              onClick={() => onClose(!open)}
            >
              <XIcon />
            </button>

            <Dialog.Title className="text-5xl mb-5">
              {firstName} {lastName}
            </Dialog.Title>
            <div className="text-2xl">
              <MDXRenderer>{content}</MDXRenderer>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

/**
 * splits the team list into sub arrays of 2's and 3's,
 * to create a grid layout of rows of 3 diamonds followed by a row of 2 diamonds and so on...
 * assumptions: @param:teamList length >= 2, meaning there are at least 2 .md file of gan's workers
 */
const prepareTeamListForDiamondGrid = (teamList) => {
  let teamListSplitToSubArrs = []; // this will hold the team list split to sub arrays of 2's and 3's
  const mainEmptyDiamond = { title: mainEmptyDiamondTitle }; // this is for the first row middle diamond that holds text only
  const firstGridRow = [teamList[0], mainEmptyDiamond, teamList[1]]; // first row with the Gan's managers and the empty diamond with the grid title
  teamListSplitToSubArrs.push(firstGridRow);

  let shouldBeGridRowOfTwo = true; // for the splitting process, flag to indicate if row of 2 employees or 3.
  let ganEmployeesExcludeManagers = teamList.slice(2); // Managers - Tzachi and Ahinoham
  for (let i = 0; i < ganEmployeesExcludeManagers.length; ) {
    if (shouldBeGridRowOfTwo) {
      teamListSplitToSubArrs.push(ganEmployeesExcludeManagers.slice(i, i + 2));
      shouldBeGridRowOfTwo = false;
      i += 2;
    } else {
      teamListSplitToSubArrs.push(ganEmployeesExcludeManagers.slice(i, i + 3));
      i += 3;
      shouldBeGridRowOfTwo = true;
    }
  }
  teamListSplitToSubArrs = fillInEmptyDiamondsIfNeeded(teamListSplitToSubArrs);

  return teamListSplitToSubArrs;
};

/** fill in empty diamonds in the last row (to maintain grid layout) if:
 * one before last row length == 3 AND last row length != 2
 * OR
 * one before last row length == 2 AND last row length != 3
 * assumptions: @param:teamListSplitToSubArrs length >= 2, meaning there are at least 3 .md file of gan's workers
 */
const fillInEmptyDiamondsIfNeeded = (teamListSplitToSubArrs) => {
  const placeholderEmptyDiamond = { title: "", isEmpty: true };
  const oneBeforeLastRowLen =
    teamListSplitToSubArrs[teamListSplitToSubArrs.length - 2].length;
  const lastRowLen =
    teamListSplitToSubArrs[teamListSplitToSubArrs.length - 1].length;

  if (oneBeforeLastRowLen === 2 && lastRowLen != 3) {
    if (lastRowLen === 2) {
      const [employeeDiamond1, employeeDiamond2] = teamListSplitToSubArrs[
        teamListSplitToSubArrs.length - 1
      ];
      teamListSplitToSubArrs[teamListSplitToSubArrs.length - 1] = [
        employeeDiamond1,
        placeholderEmptyDiamond,
        employeeDiamond2,
      ];
    } else if (lastRowLen === 1) {
      const [employeeDiamond] = teamListSplitToSubArrs[
        teamListSplitToSubArrs.length - 1
      ];
      teamListSplitToSubArrs[teamListSplitToSubArrs.length - 1] = [
        placeholderEmptyDiamond,
        employeeDiamond,
        placeholderEmptyDiamond,
      ];
    }
  } else if (oneBeforeLastRowLen === 3 && lastRowLen === 1)
    teamListSplitToSubArrs[teamListSplitToSubArrs.length - 1].push(
      placeholderEmptyDiamond
    );

  return teamListSplitToSubArrs;
};
