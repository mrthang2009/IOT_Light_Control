import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from 'src/utils/product';

// ----------------------------------------------------------------------

export default function ProductTableHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  typeComponent,
}) {
  const ORDER_SORT = {
    DESC: 'desc',
    ASC: 'asc',
  };

  const onSort = (id) => {
    onRequestSort(id);
  };

  return (
    <TableHead>
      <TableRow>
        {typeComponent !== 'orderCreate' && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected !== 0}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.align || 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : ORDER_SORT.ASC}
                onClick={() => onSort(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === ORDER_SORT.DESC ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

ProductTableHead.propTypes = {
  headLabel: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  numSelected: PropTypes.number,
  order: PropTypes.oneOf(['asc', 'desc']),
  typeComponent: PropTypes.string,
  onSelectAllClick: PropTypes.func,
};
