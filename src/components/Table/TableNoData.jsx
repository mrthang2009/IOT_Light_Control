// import PropTypes from 'prop-types';

// import Paper from '@mui/material/Paper';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';

// // ----------------------------------------------------------------------

// export default function TableNoData({ query }) {
//   return (
//     <TableRow>
//       <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//         <Paper
//           sx={{
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h6" paragraph>
//             Không tìm thấy
//           </Typography>

//           {query.keyword !== '' || !query.priceStart || !query.priceEnd? (
//             <Typography variant="body2">
//               Không tìm thấy kết quả nào {query.priceStart && ("giá bắt đầu") || query.priceEnd && ("giá kết thúc")} cho &nbsp;
//               <strong>&quot;{query.keyword || query.priceStart || query.priceEnd}&quot;</strong>.
//               <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các từ hoàn chỉnh.
//             </Typography>
//           ) : (
//             <Typography variant="body2">Danh sách trống.</Typography>
//           )}
//         </Paper>
//       </TableCell>
//     </TableRow>
//   );
// }

// TableNoData.propTypes = {
//   query: PropTypes.shape({
//     keyword: PropTypes.string.isRequired,
//     priceStart: PropTypes.any,
//     PriceEnd: PropTypes.any,
//   }).isRequired,
// };

import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({ queryValue }) {
  const isQueryEmpty = (query) => {
    return Object.values(query).every(
      (value) => value == null || value === '' || value === undefined
    );
  };

  const keyMappings = {
    keyword: 'từ khóa',
    priceStart: 'giá bắt đầu',
    priceEnd: 'giá kết thúc',
  };

  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Không tìm thấy
          </Typography>

          {isQueryEmpty(queryValue) ? (
            <Typography variant="body2">Danh sách trống.</Typography>
          ) : (
            <Typography variant="body2">
              Không tìm thấy kết quả nào cho &nbsp;
              {Object.entries(queryValue).map(([key, value]) => {
                if (value != null && value !== '' && value !== undefined) {
                  return (
                    <span key={key}>
                      {keyMappings[key] || key}: <strong>&quot;{value}&quot;</strong>
                      <br />
                    </span>
                  );
                }
                return null;
              })}
              <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các từ khóa hoàn chỉnh.
            </Typography>
          )}
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  queryValue: PropTypes.object.isRequired,
};
