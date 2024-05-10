import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import DeviceForm from '../Components/DeviceForm';

export default function DeviceCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const create = async (data) => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/devices/create`;
      const resCreate = await axiosClient.post(urlApi, data);

      if (resCreate.data.payload) {
        showSuccess('Tạo thiết bị mới thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.DEVICE_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo thiết bị mới thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tạo thiết bị mới</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin thiết bị</Typography>
        </Stack>
        <DeviceForm
          labelButton="Tạo thiết bị mới"
          isButtonDisabled={isButtonDisabled}
          onSubmit={create} // Truyền hàm onSubmit xuống component FormRole
        />
      </Container>
    </>
  );
}
