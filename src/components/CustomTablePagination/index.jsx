import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import TablePagination from '@mui/material/TablePagination';

import { getParamsFormObject } from 'src/utils';

const CustomTablePagination = ({ pagination, locationPage, total }) => {
  const navigate = useNavigate();

  const onChangePage = (event, newPage) => {
    const nextPage = newPage + 1;

    const updatedPagination = { ...pagination, page: nextPage };
    const queryString = getParamsFormObject(updatedPagination);
    navigate(`${locationPage}${queryString}`);
  };

  const onChangePageSize = async (event) => {
    const newPageSize = parseInt(event.target.value, 10);

    const updatedPagination = { ...pagination, pageSize: newPageSize };
    const queryString = getParamsFormObject(updatedPagination);
    navigate(`${locationPage}${queryString}`);
  };

  const showsPerPageOptions = [5, 10, 25];
  if (!showsPerPageOptions.includes(pagination.pageSize)) {
    showsPerPageOptions.push(pagination.pageSize);
    showsPerPageOptions.sort((a, b) => a - b);
  }

  return (
    <TablePagination
      page={pagination.page - 1}
      count={total}
      component="div"
      rowsPerPage={pagination.pageSize}
      rowsPerPageOptions={showsPerPageOptions}
      onRowsPerPageChange={onChangePageSize}
      onPageChange={onChangePage}
      labelDisplayedRows={({ from, to, count }) =>
        `Hiển thị từ ${from} đến ${to} trong tổng số ${count} hàng`
      }
      labelRowsPerPage="Số hàng mỗi trang:"
    />
  );
};

CustomTablePagination.propTypes = {
  locationPage: PropTypes.string.isRequired,
  pagination: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
};

export default CustomTablePagination;
