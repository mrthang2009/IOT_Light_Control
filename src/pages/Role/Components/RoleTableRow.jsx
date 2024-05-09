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

export default function RoleTableRow({
  selected,
  id,
  name,
  description,
  permissions,
  handleClick,
  dataPermissions,
  getData,
}) {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEditRole = () => {
    navigate(LOCATIONS.ROLE_EDIT.replace(':id', id));
  };

  const handleDeleteRole = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/roles/detail/${id}`;
      const resDeleteDetail = await axiosClient.patch(urlApi);
      if (resDeleteDetail.data.payload) {
        showSuccess('Xóa vai trò thành công');
        await getData();
      }
      setIsButtonDisabled(false);
      setIsOpenDialog(false);
      setIsOpenMenu(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa vai trò thất bại');
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
        <TableCell>
          {permissions && permissions.length > 0 && (
            <>
              {dataPermissions.length > 0 &&
                dataPermissions.map((group) => {
                  const groupPermissions = group.permissions.filter((permission) =>
                    permissions.includes(permission.name)
                  );
                  if (groupPermissions.length > 0) {
                    const displayedPermissions = groupPermissions.slice(0, 3);
                    if (groupPermissions.length > 3) {
                      displayedPermissions.push('...'); // Thêm dấu '...' vào cuối mảng nếu có nhiều hơn 3 quyền
                    }
                    return (
                      <div key={group.groupName}>
                        {group.groupName}:{' '}
                        {displayedPermissions
                          .map((permission) => {
                            return permission === '...' ? permission : permission.label;
                          })
                          .join('; ')}
                      </div>
                    );
                  }
                  return null;
                })}
            </>
          )}
        </TableCell>
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
        handleEdit={handleEditRole}
        isButtonDisabled={isButtonDisabled}
        handleDelete={() => setIsOpenDialog(true)}
      />
      <ConfirmDialog
        closeDialog={() => setIsOpenDialog(false)}
        handleAgree={handleDeleteRole}
        isOpenDialog={isOpenDialog}
        isButtonDisabled={isButtonDisabled}
        question={`Bạn xác nhận xóa vai trò ${name}?`}
      />
    </>
  );
}

RoleTableRow.propTypes = {
  dataPermissions: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.any.isRequired,
};
