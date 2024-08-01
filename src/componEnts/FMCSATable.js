// src/components/FMCSATable.js
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ReactPaginate from 'react-paginate'; // Import the library
import './FMCSATable.css'; // Import CSS for additional styling

// Fetch data function
const fetchData = async (page = 0, perPage = 100) => {
  const response = await axios.get(
    `http://localhost:8000/dataexecl?_page=${page + 1}&_per_page=${perPage}`
  );
  const data = response.data.data;
  const totalRecords = response.data.items;
  return { data, totalRecords };
};

const FMCSATable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState(null); // State for selected record
  const recordsPerPage = 100; // Adjust as needed

  const { isLoading, error, data, refetch } = useQuery(
    ['fmcsaData', currentPage],
    () => fetchData(currentPage, recordsPerPage),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (error) return <div className="text-red-500">An error has occurred: {error.message}</div>;
  if (isLoading) return <div className="text-gray-500">Loading...</div>;

  if (!data?.data || !data?.totalRecords) return <div className="text-gray-500">No records found.</div>;

  const { data: records, totalRecords } = data;
  const pageCount = Math.ceil(totalRecords / recordsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const columns = [
    { key: 'created_dt', label: 'Created Date' },
    { key: 'data_source_modified_dt', label: 'Modified Date' },
    { key: 'entity_type', label: 'Entity Type' },
    { key: 'operating_status', label: 'Operating Status' },
    { key: 'legal_name', label: 'Legal Name' },
    { key: 'dba_name', label: 'DBA Name' },
    { key: 'physical_address', label: 'Physical Address' },
    { key: 'p_street', label: 'Physical Street' },
    { key: 'p_city', label: 'Physical City' },
    { key: 'p_state', label: 'Physical State' },
    { key: 'p_zip_code', label: 'Physical Zip Code' },
    { key: 'phone', label: 'Phone' },
    { key: 'mailing_address', label: 'Mailing Address' },
    { key: 'm_street', label: 'Mailing Street' },
    { key: 'm_city', label: 'Mailing City' },
    { key: 'm_state', label: 'Mailing State' },
    { key: 'm_zip_code', label: 'Mailing Zip Code' },
    { key: 'usdot_number', label: 'USDOT Number' },
    { key: 'mc_mx_ff_number', label: 'MC/MX/FF Number' },
    { key: 'power_units', label: 'Power Units' },
    { key: 'mcs_150_form_date', label: 'MCS-150 Form Date' },
    { key: 'out_of_service_date', label: 'Out of Service Date' },
    { key: 'state_carrier_id_number', label: 'State Carrier ID Number' },
    { key: 'duns_number', label: 'DUNS Number' },
    { key: 'drivers', label: 'Drivers' },
    { key: 'mcs_150_mileage_year', label: 'MCS-150 Mileage Year' },
    { key: 'id', label: 'ID' },
    { key: 'credit_score', label: 'Credit Score' },
    { key: 'record_status', label: 'Record Status' },
  ];

  const handleRowClick = (record) => {
    setSelectedRecord(record); // Set the selected record for the modal
  };

  const closeModal = () => {
    setSelectedRecord(null); // Close the modal by clearing the selected record
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className='py-2 px-4 border-b border-gray-200 text-left text-gray-600'>ID</th>
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="text-center even:bg-gray-50 hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(record)}>
              <td className='py-2 px-4 border-b border-gray-200'>{index + 1}</td>
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-4 border-b border-gray-200">
                  {record[col.key] || 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'flex space-x-2'}
          previousClassName={'bg-blue-500 text-white px-4 py-2 rounded'}
          nextClassName={'bg-blue-500 text-white px-4 py-2 rounded'}
          pageClassName={'bg-gray-200 px-4 py-2 rounded'}
          activeClassName={'bg-blue-500 text-white'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>

      {/* Modal for displaying details */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-3xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Record Details</h2>
              <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
                &times; {/* Close icon */}
              </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
              <tbody>
                {Object.entries(selectedRecord).map(([key, value]) => (
                  <tr key={key}>
                    <td className="py-2 px-4 border-b border-gray-200 font-bold">{key}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{value || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-6"> {/* Increased margin top */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FMCSATable;
