import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/MenuPopover';
import ConfirmDialog from 'src/components/ConfirmDialog';

export default function CategoryTableRow({
  selected,
  id,
  name,
  description,
  handleClick,
  getData,
  coverImageUrl,
}) {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEditCategory = () => {
    navigate(LOCATIONS.CATEGORY_EDIT.replace(':id', id));
  };

  const handleDeleteCategory = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/categories/detail/${id}`;
      const resDeleteDetail = await axiosClient.patch(urlApi);
      if (resDeleteDetail.data.payload) {
        showSuccess('Xóa danh mục thành công');
        await getData();
      }
      setIsButtonDisabled(false);
      setIsOpenDialog(false);
      setIsOpenMenu(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa danh mục thất bại');
      setIsButtonDisabled(false);
    }
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CardMedia
              component="img"
              image={coverImageUrl}
              alt={name}
              sx={{
                height: 60,
                width: 106,
                borderRadius: '8px',
              }}
            />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{description}</TableCell>
        <TableCell align="right">
          <IconButton ref={anchorRef} onClick={() => setIsOpenMenu(true)}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <MenuPopover
        isOpenMenu={isOpenMenu}
        anchorEl={() => anchorRef.current}
        handleCloseMenu={() => setIsOpenMenu(false)}
        handleEdit={handleEditCategory}
        isButtonDisabled={isButtonDisabled}
        handleDelete={() => setIsOpenDialog(true)}
      />
      <ConfirmDialog
        closeDialog={() => setIsOpenDialog(false)}
        handleAgree={handleDeleteCategory}
        isOpenDialog={isOpenDialog}
        isButtonDisabled={isButtonDisabled}
        question={`Bạn xác nhận xóa danh mục ${name}?`}
      />
    </>
  );
}

CategoryTableRow.propTypes = {
  coverImageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.any.isRequired,
};
