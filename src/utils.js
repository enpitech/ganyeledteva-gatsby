import moment from "moment";

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default { classNames };

/*return a formatted date with the given format. default format is: "DD/MM/YYYY" */
export const formatDate = (date,format = "DD/MM/YYYY") => {
  return moment(date).format(format)

}