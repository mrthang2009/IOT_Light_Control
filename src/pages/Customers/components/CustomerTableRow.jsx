import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';
import { fDateTime } from 'src/utils/format-time';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/MenuPopover';
import ConfirmDialog from 'src/components/ConfirmDialog';
import DefaultAvatar from 'src/components/DefaultAvatar';

export default function CustomerTableRow({
  selected,
  id,
  name,
  avatarUrl,
  email,
  phoneNumber,
  birthday,
  address,
  handleClick,
  getData,
}) {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEditCustomer = () => {
    navigate(LOCATIONS.CUSTOMER_EDIT.replace(':id', id));
  };

  const handleDeleteCustomer = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/customers/detail/${id}`;
      const resDeleteDetail = await axiosClient.patch(urlApi);
      if (resDeleteDetail.data.payload) {
        showSuccess('Xóa khách hàng thành công');
        await getData();
      }
      setIsButtonDisabled(false);
      setIsOpenDialog(false);
      setIsOpenMenu(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa khách hàng thất bại');
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
            {avatarUrl && avatarUrl !== null ? (
              <Avatar alt={name} src={avatarUrl} />
            ) : (
              <DefaultAvatar textString={name} />
            )}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phoneNumber}</TableCell>
        <TableCell>{fDateTime(birthday, 'dd MMM yyyy')}</TableCell>
        <TableCell>{address}</TableCell>
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
        handleEdit={handleEditCustomer}
        isButtonDisabled={isButtonDisabled}
        handleDelete={() => setIsOpenDialog(true)}
      />
      <ConfirmDialog
        closeDialog={() => setIsOpenDialog(false)}
        handleAgree={handleDeleteCustomer}
        isOpenDialog={isOpenDialog}
        isButtonDisabled={isButtonDisabled}
        question={`Bạn xác nhận xóa khách hàng ${name}?`}
      />
    </>
  );
}

CustomerTableRow.propTypes = {
  address: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  selected: PropTypes.any.isRequired,
  avatarUrl: PropTypes.string,
};
