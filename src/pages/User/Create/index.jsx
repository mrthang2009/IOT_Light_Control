import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import FormCustomer from '../components/FormCustomer';

export default function CustomerCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const createCustomer = async (formData) => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/customers/create`;
      const resCreate = await axiosClient.post(`${urlApi}`, formData);
      if (resCreate.data.payload) {
        showSuccess('Tạo khách hàng mới thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.CUSTOMER_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo khách hàng mới thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tạo khách hàng mới</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin khách hàng</Typography>
        </Stack>
        <FormCustomer
          labelButton="Tạo khách hàng mới"
          isButtonDisabled={isButtonDisabled}
          onSubmit={createCustomer} // Truyền hàm onSubmit xuống component FormRole
          typeForm="create"
        />
      </Container>
    </>
  );
}
