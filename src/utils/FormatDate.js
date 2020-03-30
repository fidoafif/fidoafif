import moment from "moment";

moment.locale("id");
const formatDate = date => {
  // moment.locale('id');

  return moment(date).format("DD MMMM YYYY, hh:mm");
};

const formatDateTimeStamp = value => {
  return moment(value).format("DD MMMM YYYY, hh:mm");
};

export { formatDate, formatDateTimeStamp };
