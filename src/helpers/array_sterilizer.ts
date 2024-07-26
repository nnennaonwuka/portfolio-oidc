export const getArrayString = (arr) => {
  const arr_string = arr.join("','");
  return `'${arr_string}'`;
};

export const getArrayStringForRf = (arr) => {
  const arr_string = arr.map((ele) => `RF_No Farm Mapped_${ele}`).join("','");
  return `'${arr_string}'`;
};

export function convertToISOFormat(strDate: string) {
  //returns date in this format: YYYY-MM-DD HH:MM:SS
  const datePlus1hr = new Date(strDate);
  datePlus1hr.setHours(datePlus1hr.getHours() + 1); //this is done cause ISOstring is behind by 1hr
  const value = datePlus1hr.toISOString().split('T');
  const dateStr = value[0];
  const timeStr = value[1].split('.')[0];

  return `${dateStr} ${timeStr}`;
}