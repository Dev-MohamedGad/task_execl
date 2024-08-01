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

  if (error) return <div>An error has occurred: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  if (!data?.data || !data?.totalRecords) return <div>No records found.</div>;

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

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
          <th className='py-2 px-4 border-b border-gray-200'>ID</th>

            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 border-b border-gray-200">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            
            <tr key={index} className="text-center">
            <td className='py-2 px-4 border-b border-gray-200'>{index+1}</td>
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
      <div className="mt-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          disabledClassName={'disabled'}
        />
      </div>
    </div>
  );
};

export default FMCSATable;
