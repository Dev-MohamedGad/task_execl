// src/fetchData.js

import axios from "axios";

const SHEET_ID = "1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE";
const SHEET_GID = "1874221723";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;

// export async function fetchData() {
//   try {
//     const response = await axios.get(SHEET_URL);
//     const csvData = response.data;
//     const rows = csvData.split('\n').map(row => row.split(','));

//     const headers = rows[0];
//     const data = rows.slice(1).map(row => {
//       let record = {};
//       headers.forEach((header, index) => {
//         record[header.trim()] = row[index].trim();
//       });
//       return record;
//     });

//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// }

export const a = async (page = 0, perPage = 100) => {
  const response = await axios.get(
    `http://localhost:8000/dataexecl?_page=${page + 1}&_limit=${perPage}`
  );
  const data =  response.data;
  const totalRecords = data.length;
  return { data, totalRecords };
};
