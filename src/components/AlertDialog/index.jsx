import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function AlertDialog({ title, open, onSetAlert, callBack, isDisable }) {
  const handleDisagree = async () => {
    await onSetAlert((prev) => ({ ...prev, open: false, isDisable: false }));
  };

  const handleAgree = async () => {
    try {
      await onSetAlert((prev) => ({ ...prev, isDisable: true }));
      await callBack();
      await onSetAlert((prev) => ({ ...prev, open: false, isDisable: false }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDisagree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <WarningRoundedIcon sx={{ color: 'orange', marginRight: '8px' }} />
        <div>Cảnh báo</div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Từ chối</Button>
        <Button disabled={isDisable} onClick={handleAgree} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  callBack: PropTypes.func,
  isDisable: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  onSetAlert: PropTypes.func,
};
