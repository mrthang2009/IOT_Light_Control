import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosUpFile } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showError, showSuccess, handleErrorResponse } from 'src/utils';

import FormCategory from '../components/FormCategory';

export default function CategoryCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const createCategory = async (formData) => {
    try {
      setIsButtonDisabled(true);

      if (formData.coverImageId === undefined || formData.coverImageId === '') {
        showError('Vui lòng chọn ảnh bìa cho danh mục sản phẩm');
        setIsButtonDisabled(false);
        return;
      }

      const urlApi = `/categories/create`;
      const resCreate = await axiosUpFile.post(urlApi, formData);

      if (resCreate.data.payload) {
        showSuccess('Tạo danh mục mới thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.CATEGORY_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo danh mục mới thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tạo danh mục mới</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin danh mục</Typography>
        </Stack>
        <FormCategory
          labelButton="Tạo danh mục mới"
          isButtonDisabled={isButtonDisabled}
          onSubmit={createCategory} // Truyền hàm onSubmit xuống component FormRole
        />
      </Container>
    </>
  );
}
