import moment from "moment";
import siteConfig from "../data/SiteConfig";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default { classNames };

/*return a formatted date with the given format. default format is: "DD/MM/YYYY" */
export const formatDate = (date, format = siteConfig.dateFormat) => {
  return moment(date).format(format);
};
export const formatScreenSizeStringToNumber = (string) => {
  return Number(string.slice(0, -2));
};

/**
 * Extract the video ID after the "watch?v=" from YouTube video URL
 * example input: "https://www.youtube.com/watch?v=SVe2cxA6PqU" -> example output : "SVe2cxA6PqU"
 */
export const getVideoIdFromYoutubeUrl = (youtubeURL) => {
  return youtubeURL.split("watch?v=")[1];
};
