import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
          onPageChange(page); // Send the page number back to the parent
        }
    };
    

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 text-white bg-green-700 rounded disabled:opacity-50`}
      >
        ក្រោយ
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === page ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 text-white bg-green-500 rounded disabled:opacity-50`}
      >
        បន្ទាប់
      </button>
    </div>
  );
};

export default Pagination;