const formatDate = (isoDate) => {
  if (!isoDate) return "No date";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

export default formatDate;