import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import DeviceForm from '../Components/DeviceForm';

function DeviceUpdate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [details, setDetails] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navigate = useNavigate();
  const { id: deviceId } = useParams();

  const getDetail = useCallback(
    async (id) => {
      try {
        const resDetail = await axiosClient.get(`/devices/detail/${deviceId}`);
        setDetails(resDetail.data.payload);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết thiết bị:', error);
      }
    },
    [deviceId]
  );

  useEffect(() => {
    if (deviceId) {
      getDetail(deviceId);
    }
  }, [deviceId, getDetail]);

  const update = async (data) => {
    setIsFirstRender(false);
    try {
      setIsButtonDisabled(true);
      const urlApi = `/devices/update-information/${deviceId}`;
      const resUpdate = await axiosClient.patch(`${urlApi}`, data);
      if (resUpdate.data.payload) {
        showSuccess('Cập nhật thông tin thiết bị thành công');
      }
      setIsButtonDisabled(false);
      navigate(LOCATIONS.DEVICE_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Cập nhật thông tin thiết bị thất bại');
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
          <Typography variant="h4">Thông tin thiết bị</Typography>
        </Stack>
        <DeviceForm
          labelButton="Cập nhật thông tin thiết bị"
          isButtonDisabled={isButtonDisabled}
          onSubmit={update}
          isFirstRender={isFirstRender}
          initialValues={{
            name: details.name,
            description: details.description,
          }}
        />
      </Container>
    </>
  );
}

export default DeviceUpdate;
