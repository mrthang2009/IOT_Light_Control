import React from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

import Iconify from 'src/components/iconify';

const MenuPopover = ({
  isOpenMenu,
  anchorEl,
  handleCloseMenu,
  handleEdit,
  isButtonDisabled,
  handleDelete,
}) => {
  return (
    <Popover
      open={isOpenMenu}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={handleEdit}>
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
        Chỉnh sửa
      </MenuItem>

      <MenuItem disabled={isButtonDisabled} onClick={handleDelete} sx={{ color: 'error.main' }}>
        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
        Xóa
      </MenuItem>
    </Popover>
  );
};
MenuPopover.propTypes = {
  anchorEl: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  isOpenMenu: PropTypes.bool.isRequired,
};
export default MenuPopover;
