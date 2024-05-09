import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import FormCustomer from '../components/FormCustomer';

function CustomerEdit() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [details, setDetails] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navigate = useNavigate();
  const { id: roleId } = useParams();

  const getDetailCustomer = useCallback(
    async (id) => {
      try {
        const resDetail = await axiosClient.get(`/customers/detail/${roleId}`);
        setDetails(resDetail.data.payload);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết thông tin khách hàng:', error);
      }
    },
    [roleId]
  );

  useEffect(() => {
    if (roleId) {
      getDetailCustomer(roleId);
    }
  }, [roleId, getDetailCustomer]);

  const editCustomer = async (formData) => {
    setIsFirstRender(false);
    try {
      setIsButtonDisabled(true);
      const urlApi = `/customers/edit-profile/${roleId}`;
      const resEdit = await axiosClient.patch(`${urlApi}`, formData);
      if (resEdit.data.payload) {
        showSuccess('Cập nhật thông tin khách hàng thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.CUSTOMER_LIST);
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
          <Typography variant="h4">Thông tin khách hàng</Typography>
        </Stack>
        <FormCustomer
          labelButton="Cập nhật thông tin khách hàng"
          isButtonDisabled={isButtonDisabled}
          onSubmit={editCustomer}
          isFirstRender={isFirstRender}
          initialValues={{
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email,
            phoneNumber: details.phoneNumber,
            birthday: details.birthday,
            address: details.address,
          }}
        />
      </Container>
    </>
  );
}

export default CustomerEdit;
