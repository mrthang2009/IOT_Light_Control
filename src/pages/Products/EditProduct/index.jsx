import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { axiosClient } from 'src/utils/axios';

// import { LOCATIONS } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import ProductForm from '../components/ProductForm';

function EmployeeEdit() {
  const [isDisabled, setIsDisabled] = useState({
    edit: false,
    coverImageUrl: false,
  });
  const [details, setDetails] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { id: productId } = useParams();

  const getDetailProduct = useCallback(
    async (id) => {
      try {
        const resDetail = await axiosClient.get(`/products/${id}`);
        setDetails(resDetail.data.payload);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết thông tin khách hàng:', error);
      }
    },
    [productId]
  );

  const handleImageUpload = (event) => {
    try {
      setIsDisabled((prev) => ({ ...prev, coverImageUrl: true }));
      const file = event.target.files[0];
      if (file) {
        setCoverImageUrl(URL.createObjectURL(file));
      } else {
        setCoverImageUrl(null);
      }
      // Thực hiện các xử lý hình ảnh tại đây (nếu cần)
      setIsDisabled((prev) => ({ ...prev, coverImageUrl: false }));
    } catch (error) {
      setIsDisabled((prev) => ({ ...prev, coverImageUrl: false }));
      handleErrorResponse(error, 'Quá trình tải ảnh lên thất bại');
    }
  };

  const editProduct = async (formData) => {
    setIsFirstRender(false);
    try {
      setIsDisabled((prev) => ({ ...prev, edit: true }));
      const urlApi = `/products/${productId}`;
      const resEdit = await axiosClient.patch(`${urlApi}`, formData);
      if (resEdit.data.payload) {
        showSuccess('Cập nhật thông tin sản phẩm thành công');
      }
      setIsDisabled((prev) => ({ ...prev, edit: false }));
    } catch (error) {
      handleErrorResponse(error, 'Cập nhật thông tin sản phẩm thất bại');
      setIsDisabled((prev) => ({ ...prev, edit: false }));
    }
  };

  useEffect(() => {
    if (productId) {
      getDetailProduct(productId);
    }
  }, [productId]);

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
            <ProductForm
              labelButton="Cập nhật thông tin sản phẩm"
              isDisabled={isDisabled.edit}
              onSubmit={editProduct}
              isFirstRender={isFirstRender}
              initialValues={{
                name: details.name,
                price: details.price,
                discount: details.discount,
                phoneNumber: details.phoneNumber,
                stock: details.stock,
                description: details.description,
              }}
              typeForm="edit"
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <Card sx={{ padding: 3 }}>
                {coverImageUrl ? (
                  <CardMedia component="img" image={coverImageUrl} alt="Ảnh sản phẩm" />
                ) : (
                  <Box>
                    <Typography>Không có ảnh sản phẩm</Typography>
                  </Box>
                )}
              </Card>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                disabled={isDisabled.coverImageUrl}
                sx={{ width: '100%', marginTop: 2 }}
                onClick={() => {
                  document.getElementById('image-upload').click();
                }}
              >
                Chọn ảnh sản phẩm
              </LoadingButton>
              <input
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EmployeeEdit;
