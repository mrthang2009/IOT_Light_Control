import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import FormSupplier from '../components/FormSupplier';

function SupplierEdit() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [details, setDetails] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navigate = useNavigate();
  const { id: roleId } = useParams();

  const getDetailSuppliers = useCallback(
    async (id) => {
      try {
        const resDetail = await axiosClient.get(`/suppliers/detail/${roleId}`);
        setDetails(resDetail.data.payload);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết thông tin nhà cung cấp:', error);
      }
    },
    [roleId]
  );

  useEffect(() => {
    if (roleId) {
      getDetailSuppliers(roleId);
    }
  }, [roleId, getDetailSuppliers]);

  const editCustomer = async (formData) => {
    setIsFirstRender(false);
    try {
      setIsButtonDisabled(true);
      const urlApi = `/suppliers/edit-profile/${roleId}`;
      const resEdit = await axiosClient.patch(`${urlApi}`, formData);
      if (resEdit.data.payload) {
        showSuccess('Cập nhật thông tin nhà cung cấp thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.SUPPLIER_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Cập nhật thông tin nhà cung cấp thất bại');
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
          <Typography variant="h4">Thông tin nhà cung cấp</Typography>
        </Stack>
        <FormSupplier
          labelButton="Cập nhật thông tin khách hàng"
          isButtonDisabled={isButtonDisabled}
          onSubmit={editCustomer}
          isFirstRender={isFirstRender}
          initialValues={{
            name: details.name,
            email: details.email,
            phoneNumber: details.phoneNumber,
            address: details.address,
          }}
        />
      </Container>
    </>
  );
}

export default SupplierEdit;
