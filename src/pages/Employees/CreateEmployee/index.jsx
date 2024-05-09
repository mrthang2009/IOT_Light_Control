import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';
import EmployeeForm from 'src/pages/Employees/components/EmployeeForm';

export default function EmployeeCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const createEmployee = async (formData, reset) => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/employees/create`;
      const resCreate = await axiosClient.post(`${urlApi}`, formData);
      if (resCreate.data.payload) {
        showSuccess('Tạo nhân viên thành công');
        reset();
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.EMPLOYEE_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo nhân viên thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tạo nhân viên mới</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin khách hàng</Typography>
        </Stack>
        <EmployeeForm
          labelButton="Tạo nhân viên mới"
          isDisabled={isButtonDisabled}
          onSubmit={createEmployee} // Truyền hàm onSubmit xuống component FormRole
          typeForm="create"
        />
      </Container>
    </>
  );
}
