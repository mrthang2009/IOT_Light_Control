import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

// import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import EmployeeForm from '../components/EmployeeForm';

function EmployeeEdit() {
  const [isDisabled, setIsDisabled] = useState({
    edit: false,
    changePassword: false,
  });
  const [details, setDetails] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  // const navigate = useNavigate();
  const { id: employeeID } = useParams();

  const getDetailEmployee = useCallback(
    async (id) => {
      try {
        const resDetail = await axiosClient.get(`/employees/${id}`);
        setDetails(resDetail.data.payload);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết thông tin khách hàng:', error);
      }
    },
    [employeeID]
  );

  useEffect(() => {
    if (employeeID) {
      getDetailEmployee(employeeID);
    }
  }, [employeeID]);

  const editEmployee = async (formData) => {
    setIsFirstRender(false);
    try {
      setIsDisabled((prev) => ({ ...prev, edit: true }));
      const urlApi = `/employees/${employeeID}`;
      const resEdit = await axiosClient.patch(`${urlApi}`, formData);
      if (resEdit.data.payload) {
        showSuccess('Cập nhật thông tin nhân viên thành công');
      }
      setIsDisabled((prev) => ({ ...prev, edit: false }));
    } catch (error) {
      handleErrorResponse(error, 'Cập nhật thông tin nhân viên thất bại');
      setIsDisabled((prev) => ({ ...prev, edit: true }));
    }
  };

  const changePasswordEmployee = async (formData, reset) => {
    try {
      setIsDisabled((prev) => ({ ...prev, changePassword: true }));
      const urlApi = `/employees/changePassword/${employeeID}`;
      const resChangePassword = await axiosClient.patch(urlApi, formData);
      if (resChangePassword.data.payload) {
        showSuccess('Cập nhật mật khẩu nhân viên thành công');
        reset();
      }
      setIsDisabled((prev) => ({ ...prev, changePassword: false }));
    } catch (error) {
      handleErrorResponse(error, 'Cập nhật mật khẩu nhân viên thất bại');
      setIsDisabled((prev) => ({ ...prev, changePassword: false }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Cập nhật thông tin</title>
      </Helmet>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin nhân viên</Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <EmployeeForm
              labelButton="Cập nhật thông tin nhân viên"
              isDisabled={isDisabled.edit}
              onSubmit={editEmployee}
              isFirstRender={isFirstRender}
              initialValues={{
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                phoneNumber: details.phoneNumber,
                birthday: details.birthday,
                address: details.address,
                roleId: details.roleId,
              }}
              typeForm="edit"
            />
          </Grid>
          <Grid item xs={4}>
            <EmployeeForm
              labelButton="Cập nhật mật khẩu nhân viên"
              isDisabled={isDisabled.changePassword}
              onSubmit={changePasswordEmployee}
              typeForm="changePassword"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EmployeeEdit;
