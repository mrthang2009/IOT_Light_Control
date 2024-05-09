import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import FormCategory from '../components/FormCategory';

function CategoryEdit() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [details, setDetails] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navigate = useNavigate();
  const { id: roleId } = useParams();

  const getDetailCategory = useCallback(
    async (id) => {
      try {
        const resDetail = await axiosClient.get(`/categories/detail/${roleId}`);
        setDetails(resDetail.data.payload);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết danh mục:', error);
      }
    },
    [roleId]
  );

  useEffect(() => {
    if (roleId) {
      getDetailCategory(roleId);
    }
  }, [roleId, getDetailCategory]);

  const editCategory = async (formData) => {
    setIsFirstRender(false);
    try {
      setIsButtonDisabled(true);
      const urlApi = `/categories/edit/${roleId}`;
      const resEdit = await axiosClient.patch(`${urlApi}`, formData);
      if (resEdit.data.payload) {
        showSuccess('Cập nhật thông tin khách hàng thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.CATEGORY_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Cập nhật thông tin khách hàng thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cập nhật thông tin</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin danh mục</Typography>
        </Stack>
        <FormCategory
          labelButton="Cập nhật thông tin danh mục"
          isButtonDisabled={isButtonDisabled}
          onSubmit={editCategory}
          isFirstRender={isFirstRender}
          initialValues={{
            name: details.name,
            description: details.description,
            coverImage: details.media?.location,
          }}
        />
      </Container>
    </>
  );
}

export default CategoryEdit;
