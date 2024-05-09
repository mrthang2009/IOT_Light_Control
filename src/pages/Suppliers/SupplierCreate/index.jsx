import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import FormSupplier from '../components/FormSupplier';

export default function SupplierCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const createSupplier = async (formData) => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/suppliers/create`;
      const resCreate = await axiosClient.post(`${urlApi}`, formData);
      if (resCreate.data.payload) {
        showSuccess('Tạo nhà cung cấp mới thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.SUPPLIER_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo nhà cung cấp mới thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Thêm mới nhà cung cấp</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin nhà cung cấp</Typography>
        </Stack>
        <FormSupplier
          labelButton="Tạo nhà cung cấp mới"
          isButtonDisabled={isButtonDisabled}
          onSubmit={createSupplier} // Truyền hàm onSubmit xuống component FormRole
          typeForm="create"
        />
      </Container>
    </>
  );
}
