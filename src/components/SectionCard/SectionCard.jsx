import React from 'react';
import { Link } from 'gatsby';
import TextTitle from '../TextTitle';

const SectionCard = ({
  title,
  subtitle,
  path,
  link,
  img,
  imgAlt,
  className,
}) => (
  <div className={className}>
    <div className="flex flex-col md:w-6/12 p-10 justify-center items-center text-center">
      <TextTitle title={title} />
      <p>{subtitle}</p>
      <Link to={path}>
        <div className="inline-block my-4 px-2 py-1 rounded-full text-center border-2 border-black text-black hover:bg-red-link hover:text-white">
          {link}
          {' >'}
        </div>
      </Link>
    </div>
    <div className="flex justify-center items-center md:w-6/12  mt-16 md:mt-0 ">
      <img className="m-auto shadow-img" alt={imgAlt} src={img} />
    </div>
  </div>
);
export default SectionCard;
