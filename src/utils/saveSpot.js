export const saveSpot = (spot) => {
  localStorage.setItem('spot', spot);
};

export const getSpot = () => {
  return Number(localStorage.getItem('spot'));
};
