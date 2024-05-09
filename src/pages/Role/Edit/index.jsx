import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showError, showSuccess, handleErrorResponse } from 'src/utils';

import FormRole from '../Components/FormRole';

function RoleEdit() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [details, setDetails] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navigate = useNavigate();
  const { id: roleId } = useParams();

  const getDetailRole = useCallback(
    async (id) => {
      try {
        const resDetailRole = await axiosClient.get(`/roles/detail/${roleId}`);
        setDetails(resDetailRole.data.payload);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết vai trò:', error);
      }
    },
    [roleId]
  );

  useEffect(() => {
    if (roleId) {
      getDetailRole(roleId);
    }
  }, [roleId, getDetailRole]);

  const editRole = async (formData) => {
    setIsFirstRender(false);
    try {
      setIsButtonDisabled(true);
      if (formData.permissions.length === 0) {
        showError(`Vui lòng chọn ít nhất 1 quyền truy cập cho vai trò ${details.name}`);
        setIsButtonDisabled(false);
        return;
      }
      const urlApi = `/roles/edit/${roleId}`;
      // Gửi dữ liệu cùng với các quyền đã chọn
      const resEditRole = await axiosClient.patch(`${urlApi}`, formData);
      if (resEditRole.data.payload) {
        showSuccess('cập nhật vai trò thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.ROLE_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Cập nhật vai trò thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title> Role | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin vai trò</Typography>
        </Stack>
        <FormRole
          labelButton="Cập nhật vai trò"
          isButtonDisabled={isButtonDisabled}
          onSubmit={editRole}
          isFirstRender={isFirstRender}
          initialValues={{
            name: details.name,
            description: details.description,
            selectedPermissions: details.permissions,
          }}
        />
      </Container>
    </>
  );
}

export default RoleEdit;
