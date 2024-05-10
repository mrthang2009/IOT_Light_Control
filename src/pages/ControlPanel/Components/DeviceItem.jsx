import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { axiosClient } from 'src/utils/axios';

import { showSuccess, handleErrorResponse } from 'src/utils';

const DeviceItem = ({ id, name, description, status, getData }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleUpdateStatus = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/devices/update-status/${id}`;
      const res = await axiosClient.patch(urlApi);
      if (res.data.payload) {
        await getData();
        showSuccess('Thay đổi trạng thái thiết bị thành công');
      }
      setIsButtonDisabled(false);
      // setIsOpenDialog(false);
    } catch (error) {
      handleErrorResponse(error, 'Thay đổi trạng thái thiết bị thất bại');
      setIsButtonDisabled(false);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {status ? (
          <Button size="small" isButtonDisabled={isButtonDisabled} onClick={handleUpdateStatus}>
            Tắt
          </Button>
        ) : (
          <Button size="small" isButtonDisabled={isButtonDisabled} onClick={handleUpdateStatus}>
            Bật
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
DeviceItem.propTypes = {
  description: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};
export default DeviceItem;
