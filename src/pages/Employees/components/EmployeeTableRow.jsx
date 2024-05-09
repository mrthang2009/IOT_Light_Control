import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { axiosClient } from 'src/utils/axios';
import { fDateTime } from 'src/utils/format-time';

import { showSuccess, handleErrorResponse } from 'src/utils';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/MenuPopover';
import ConfirmDialog from 'src/components/ConfirmDialog';
import TemporaryAvatar from 'src/components/DefaultAvatar';

export default function EmployeeTableRow({
  isSelected,
  id,
  name,
  avatarUrl,
  email,
  phoneNumber,
  birthday,
  address,
  roleName,
  selected,
  setSelected,
  getFilterEmployee,
  handleClick,
}) {
  const router = useRouter();
  const anchorRef = useRef(null);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleOpenMenu = (event) => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const handleEdit = (idEmployee) => () => {
    router.push(`/employees/edit-profile/${idEmployee}`);
  };

  const handleDeleteDetail = (idEmployee) => async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/employees/deleteSoftEmployee/${idEmployee}`;
      const resDeleteDetail = await axiosClient.patch(urlApi);
      if (resDeleteDetail.data.payload) {
        showSuccess('Xóa nhân viên thành công');
        await getFilterEmployee();
      }
      const filterSelected = selected.filter((item) => item !== idEmployee);
      setSelected(filterSelected);
      setIsButtonDisabled(false);
      setIsOpenDialog(false);
      setIsOpenMenu(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa nhân viên thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={isSelected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Link to={`/employees/edit-profile/${id}`}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {avatarUrl && avatarUrl !== null ? (
                <Avatar alt={name} src={avatarUrl} />
              ) : (
                <TemporaryAvatar textString={name} />
              )}
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            </Stack>
          </Link>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{phoneNumber}</TableCell>

        <TableCell>{fDateTime(birthday, 'dd MMM yyyy')}</TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>{roleName}</TableCell>

        <TableCell align="right">
          <IconButton ref={anchorRef} onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        isOpenMenu={isOpenMenu}
        handleCloseMenu={handleCloseMenu}
        handleEdit={handleEdit(id)}
        isButtonDisabled={isButtonDisabled}
        handleDelete={() => setIsOpenDialog(true)}
        anchorEl={() => anchorRef.current}
      />

      <ConfirmDialog
        closeDialog={() => {
          setIsOpenDialog(false);
        }}
        handleAgree={handleDeleteDetail(id)}
        isOpenDialog={isOpenDialog}
        isButtonDisabled={isButtonDisabled}
        question={`Bạn xác nhận xóa nhân viên ${name}?`}
      />
    </>
  );
}

EmployeeTableRow.propTypes = {
  address: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  birthday: PropTypes.any.isRequired,
  email: PropTypes.string.isRequired,
  getFilterEmployee: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  roleName: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};
