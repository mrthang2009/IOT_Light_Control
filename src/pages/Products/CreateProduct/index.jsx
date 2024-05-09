import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';
import ProductForm from 'src/pages/Products/components/ProductForm';

export default function ProductCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const createProduct = async (formData, reset) => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/products/create`;
      const resCreate = await axiosClient.post(`${urlApi}`, formData);
      if (resCreate.data.payload) {
        showSuccess('Tạo sản phẩm thành công');
        reset();
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.PRODUCT_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo sản phẩm thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tạo sản phẩm mới</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin sản phẩm</Typography>
        </Stack>
        <ProductForm
          labelButton="Tạo sản phẩm mới"
          isDisabled={isButtonDisabled}
          onSubmit={createProduct} // Truyền hàm onSubmit xuống component FormRole
          typeForm="create"
        />
      </Container>
    </>
  );
}
