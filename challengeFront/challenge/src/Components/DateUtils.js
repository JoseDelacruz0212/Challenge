const formatDate = (dateString) => {
  const formattedDate = new Date(dateString).toLocaleDateString('es-ES');
  return formattedDate;
};

const formatDateTime = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
  const formattedDateTime = new Date(dateString).toLocaleString('es-ES', options);
  return formattedDateTime;
};

export { formatDateTime , formatDate};
