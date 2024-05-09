// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Toolbar from '@mui/material/Toolbar';
// import Tooltip from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';

// import Iconify from 'src/components/iconify';
// import ConfirmDialog from 'src/components/ConfirmDialog';

// import { buildQueryParams } from 'src/utils';

// export default function TableToolbar({
//   namePage,
//   typePage,
//   valueSearch,
//   locationPage,
//   numSelected,
//   contentPlaceholder,
//   handleDeleteSelected,
//   isButtonDisabled,
// }) {
//   const navigate = useNavigate();
//   const [searchValue, setSearchValue] = useState({
//     keyword: "",
//     priceStart: "",
//     priceEnd: "",
//   });
//   const [isOpenDialog, setIsOpenDialog] = useState(false);

//   const handleDelete = () => {
//     handleDeleteSelected();
//     setIsOpenDialog(false);
//   };

//   const handleSearchInputChange = (event) => {
//     const { name, value } = event.target;
//     console.log(name, value);
//     setSearchValue((prevSearchValue) => ({
//       ...prevSearchValue,
//       [name]: value,
//     }));
//   };

//   const handleSearch = () => {
//     if (searchValue && typePage === 'product') {
//        {
//         const params = {
//           ...(searchValue.keyword && { keyword: searchValue.keyword }),
//           ...(searchValue.priceStart && { priceStart: searchValue.priceStart }),
//           ...(searchValue.priceEnd  && { priceEnd: searchValue.priceEnd }),
//         };
//         const queryParams = buildQueryParams(params);
//         navigate(`${locationPage}?${queryParams}`);
//       }
//     } else {
//       if (searchValue && searchValue !== '') {
//         navigate(`${locationPage}?keyword=${searchValue.keyword}`);
//       } else {
//         navigate(locationPage);
//       }
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleClearSearch = () => {
//     navigate(locationPage);
//     if (typePage === "product" && typePage) {
//       setSearchValue((prevValueSearch) => ({
//         ...prevValueSearch,
//         keyword: "",
//         priceStart: "",
//         priceEnd: "",
//       }))
//     } else {
//       setSearchValue((prevValueSearch) => ({
//         ...prevValueSearch,
//         keyword: "",
//       }))
//     }
//   };

//   useEffect(() => {
//     setSearchValue((prevValueSearch) => ({ ...prevValueSearch, ...valueSearch }));
//   }, [valueSearch]);

//   return (
//     <Toolbar
//       sx={{
//         height: 96,
//         display: 'flex',
//         justifyContent: 'space-between',
//         p: (theme) => theme.spacing(0, 2, 0, 2),
//         ...(numSelected > 0 && {
//           color: 'primary.main',
//           bgcolor: 'primary.lighter',
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography component="div" variant="subtitle1">
//           {numSelected} đã chọn
//         </Typography>
//       ) : (
//         <>
//           <OutlinedInput
//             name="keyword"
//             value={searchValue.keyword}
//             onChange={handleSearchInputChange}
//             onKeyPress={handleKeyPress} // Bắt lấy sự kiện khi nhấn phím Enter
//             placeholder={contentPlaceholder.keyword}
//             startAdornment={
//               <InputAdornment position="start">
//                 <IconButton onClick={handleSearch}>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             }
//           />

//           {
//             typePage === "product" && typePage && (
//               <>
//                 <OutlinedInput
//                   name="priceStart"
//                   value={searchValue.priceStart}
//                   onChange={handleSearchInputChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder={contentPlaceholder.priceStart}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <IconButton onClick={handleSearch}>
//                         <SearchIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />

//                 <OutlinedInput
//                   name="priceEnd"
//                   value={searchValue.priceEnd}
//                   onChange={handleSearchInputChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder={contentPlaceholder.priceEnd}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <IconButton onClick={handleSearch}>
//                         <SearchIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </>
//             )
//           }

//           <Stack direction="row" spacing={1}>
//             <Button onClick={handleSearch}>Tìm kiếm</Button>
//             {valueSearch.keyword || valueSearch.priceStart || valueSearch.priceEnd ? <Button onClick={handleClearSearch}>Xóa bộ lọc</Button> : null}
//           </Stack>
//         </>
//       )}
//       {numSelected > 0 && (
//         <Tooltip title="Xóa">
//           <IconButton disabled={isButtonDisabled} onClick={() => setIsOpenDialog(true)}>
//             <Iconify icon="eva:trash-2-fill" />
//           </IconButton>
//         </Tooltip>
//       )}
//       <ConfirmDialog
//         closeDialog={() => setIsOpenDialog(false)}
//         handleAgree={handleDelete}
//         handleDisagree={() => setIsOpenDialog(false)}
//         isOpenDialog={isOpenDialog}
//         isButtonDisabled={isButtonDisabled}
//         question={`Bạn xác nhận xóa những ${namePage} đã chọn?`}
//       />
//     </Toolbar>
//   );
// }

// TableToolbar.propTypes = {
//   contentPlaceholder: PropTypes.object.isRequired,
//   handleDeleteSelected: PropTypes.func.isRequired,
//   isButtonDisabled: PropTypes.bool.isRequired,
//   locationPage: PropTypes.string.isRequired,
//   namePage: PropTypes.string.isRequired,
//   typePage: PropTypes.string,
//   numSelected: PropTypes.number.isRequired,
//   valueSearch: PropTypes.object.isRequired,
// };

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { getParamsFormObject } from 'src/utils';

import Iconify from 'src/components/iconify';
import ConfirmDialog from 'src/components/ConfirmDialog';

export default function TableToolbar({
  namePage,
  valueQuery,
  locationPage,
  numSelected,
  placeholder,
  handleSelectedDeletion,
  isButtonDisabled,
}) {
  const navigate = useNavigate();
  const [queryValue, setQueryValue] = useState({});
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    setQueryValue(valueQuery);
  }, [valueQuery]);

  const handleDelete = () => {
    handleSelectedDeletion();
    setIsOpenDialog(false);
  };

  const handleInputChange = (event, name) => {
    const newValue = event.target.value;
    setQueryValue((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleQuery = () => {
    const queryParams = {
      keyword: queryValue.keyword,
      priceStart: queryValue.priceStart,
      priceEnd: queryValue.priceEnd,
    };

    const queryString = getParamsFormObject(queryParams);
    navigate(`${locationPage}${queryString}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleQuery();
    }
  };

  const handleClearQuery = () => {
    navigate(locationPage);
    setQueryValue({});
  };

  return (
    <Toolbar
      sx={{
        maxHeight: 450,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(3, 3, 3, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} đã chọn
        </Typography>
      ) : (
        <>
          <OutlinedInput
            value={queryValue.keyword || ''}
            onChange={(event) => handleInputChange(event, 'keyword')}
            onKeyPress={handleKeyPress} // Bắt lấy sự kiện khi nhấn phím Enter
            placeholder={placeholder.keyword}
            startAdornment={
              <InputAdornment position="start">
                <IconButton onClick={handleQuery}>
                  <IoSearch />
                </IconButton>
              </InputAdornment>
            }
          />
          {namePage === 'sản phẩm' && (
            <>
              <OutlinedInput
                name="priceStart"
                value={queryValue.priceStart || ''}
                onChange={(event) => handleInputChange(event, 'priceStart')}
                onKeyPress={handleKeyPress}
                placeholder={placeholder.priceStart}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={handleQuery}>
                      <IoSearch />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <OutlinedInput
                name="priceEnd"
                value={queryValue.priceEnd || ''}
                onChange={(event) => handleInputChange(event, 'priceEnd')}
                onKeyPress={handleKeyPress}
                placeholder={placeholder.priceEnd}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={handleQuery}>
                      <IoSearch />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </>
          )}
          <Stack direction="row" spacing={1}>
            <Button onClick={handleQuery}>Tìm kiếm</Button>
            {queryValue &&
              Object.values(queryValue).some(
                (value) => value !== '' && value !== null && value !== undefined
              ) && <Button onClick={handleClearQuery}>Xóa bộ lọc</Button>}
          </Stack>
        </>
      )}
      {numSelected > 0 && (
        <Tooltip title="Xóa">
          <IconButton disabled={isButtonDisabled} onClick={() => setIsOpenDialog(true)}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
      <ConfirmDialog
        closeDialog={() => setIsOpenDialog(false)}
        handleAgree={handleDelete}
        handleDisagree={() => setIsOpenDialog(false)}
        isOpenDialog={isOpenDialog}
        isButtonDisabled={isButtonDisabled}
        question={`Bạn xác nhận xóa những ${namePage} đã chọn?`}
      />
    </Toolbar>
  );
}

TableToolbar.propTypes = {
  handleSelectedDeletion: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  locationPage: PropTypes.string.isRequired,
  namePage: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  placeholder: PropTypes.object.isRequired,
  valueQuery: PropTypes.object.isRequired,
};
