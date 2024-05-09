import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showError, showSuccess, handleErrorResponse } from 'src/utils';

import FormRole from '../components/FormRole';

export default function RoleCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const createRole = async (formData) => {
    try {
      setIsButtonDisabled(true);
      if (formData.permissions.length === 0) {
        showError('Vui lòng chọn ít nhất 1 quyền truy cập của vai trò');
        setIsButtonDisabled(false);
        return;
      }
      const urlApi = `/roles/create`;
      const resCreateRole = await axiosClient.post(`${urlApi}`, formData);
      if (resCreateRole.data.payload) {
        showSuccess('Tạo vai trò mới thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.ROLE_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo vai trò mới thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tạo vai trò mới</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin vai trò</Typography>
        </Stack>
        <FormRole
          labelButton="Tạo vai trò mới"
          isButtonDisabled={isButtonDisabled}
          onSubmit={createRole} // Truyền hàm onSubmit xuống component FormRole
        />
      </Container>
    </>
  );
}
