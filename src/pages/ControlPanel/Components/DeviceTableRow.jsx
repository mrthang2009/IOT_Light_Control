import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/MenuPopover';
import ConfirmDialog from 'src/components/ConfirmDialog';

export default function DeviceTableRow({ selected, id, name, description, handleClick, getData }) {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleUpdate = () => {
    navigate(LOCATIONS.DEVICE_UPDATE.replace(':id', id));
  };

  const handleDeleteSingle = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/devices/detail/${id}`;
      const resDeleteSingle = await axiosClient.patch(urlApi);
      if (resDeleteSingle.data.payload) {
        showSuccess('Xóa thiết bị thành công');
        getData();
      }
      setIsButtonDisabled(false);
      setIsOpenDialog(false);
      setIsOpenMenu(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa thiết bị thất bại');
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
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
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
        handleEdit={handleUpdate}
        isButtonDisabled={isButtonDisabled}
        handleDelete={() => setIsOpenDialog(true)}
      />
      <ConfirmDialog
        closeDialog={() => setIsOpenDialog(false)}
        handleAgree={handleDeleteSingle}
        isOpenDialog={isOpenDialog}
        isButtonDisabled={isButtonDisabled}
        question={`Bạn xác nhận xóa thiết bị ${name}?`}
      />
    </>
  );
}

DeviceTableRow.propTypes = {
  description: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.any.isRequired,
};
