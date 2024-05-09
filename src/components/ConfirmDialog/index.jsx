import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TiWarningOutline } from 'react-icons/ti';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const ConfirmDialog = ({ isButtonDisabled, isOpenDialog, closeDialog, question, handleAgree }) => {
  return (
    <Dialog
      open={isOpenDialog}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TiWarningOutline
            style={{
              color: 'orange',
              marginRight: '8px',
              fontSize: '160%',
            }}
          />
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Cảnh báo
          </Typography>{' '}
        </div>
      </DialogTitle>{' '}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="subtitle1">
          Từ chối
        </Button>
        <Button
          // variant="outlined"
          color="error"
          disabled={isButtonDisabled}
          onClick={handleAgree}
          autoFocus
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};
ConfirmDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  handleAgree: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  isOpenDialog: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
};
export default ConfirmDialog;
