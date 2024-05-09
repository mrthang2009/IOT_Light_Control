import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axios';

import OrderTableProduct from 'src/pages/Orders/components/OrderTableProduct';
import { showSuccess, handleErrorResponse, getParamsFormObject } from 'src/utils';

import OrderForm from '../components/OrderForm';

export default function OrderCreate() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const keyword = searchParams.get('keyword')
    ? decodeURIComponent(searchParams.get('keyword'))
    : '';

  const priceStart = parseFloat(searchParams.get('priceStart')) || '';
  const priceEnd = parseFloat(searchParams.get('priceEnd')) || '';

  const [products, setProducts] = useState({
    count: 0,
    payload: [],
  });

  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleIncreaseProduct = (idProduct) => async () => {
    const product = products.payload.find((item) => item._id === idProduct);
    if (product) {
      // Thêm sản phẩm vào mảng selectedProduct
      setSelectedProduct((prevSelected) => [...prevSelected, product]);
      // Giảm sản phẩm có id ra khỏi mảng products
      setProducts((prevProducts) => ({
        ...prevProducts,
        payload: prevProducts.payload.filter((item) => item._id !== idProduct),
        count: prevProducts.payload.filter((item) => item._id !== idProduct).length,
      }));
    }
  };

  const handleDecreaseProduct = (idProduct) => async () => {
    const product = selectedProduct.find((item) => item._id === idProduct);
    product.quantity = 1;
    if (product) {
      setSelectedProduct((prevSelected) => prevSelected.filter((item) => item._id !== idProduct));
      setProducts((prevProducts) => ({
        ...prevProducts,
        payload: [...prevProducts.payload, product],
        count: prevProducts.count + Object.values(product).length,
      }));
    }
  };

  const handleChange = async (idProduct, event) => {
    const { name, value } = event.target;
    setSelectedProduct((prev) => {
      const updateProduct = prev.map((product) => {
        if (product._id === idProduct) {
          return {
            ...product,
            [name]: value,
          };
        }
        return product;
      });
      return updateProduct;
    });
  };

  const getFilterProduct = useCallback(async () => {
    try {
      const params = {
        keyword,
        priceStart,
        priceEnd,
      };
      const queryParams = getParamsFormObject(params);
      const apiFilterProduct = `/products/all${queryParams}`;

      const resProduct = await axiosClient.get(apiFilterProduct);
      let dataSetProduct = {
        payload: resProduct.data.payload.map((item) => ({ ...item, quantity: 1 })),
        count: resProduct.data.total,
      };

      if (dataSetProduct && selectedProduct) {
        const dataFilterSelectProduct = dataSetProduct.payload.filter((product) => {
          const foundProduct = selectedProduct.find(
            (orderProduct) => orderProduct._id.toString() === product._id.toString()
          );
          return !foundProduct;
        });

        dataSetProduct = {
          payload: dataFilterSelectProduct,
          count: dataFilterSelectProduct.length,
        };
      }

      setProducts((prev) => ({ ...prev, ...dataSetProduct }));
    } catch (error) {
      console.error(error);
    }
  }, [location.search]);

  const createOrder = async (formData, reset, dataProduct) => {
    try {
      const orderDetail = dataProduct.map((productDetail) => {
        return {
          productId: productDetail._id,
          quantity: productDetail.quantity,
        };
      });
      const dataCreateOrder = {
        ...formData,
        orderDetail: [...orderDetail],
      };
      setIsButtonDisabled(true);
      const urlApi = `/orders/create`;
      const resCreate = await axiosClient.post(`${urlApi}`, dataCreateOrder);
      if (resCreate.data.payload) {
        showSuccess('Tạo đơn hàng thành công');
        reset({ shippedDate: '' });
        setSelectedProduct([]);
        await getFilterProduct();
      }
      setIsButtonDisabled(false);
      // navigate(LOCATIONS.ORDER_LIST);
    } catch (error) {
      handleErrorResponse(error, 'Tạo đơn hàng thất bại thất bại');
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    getFilterProduct();
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Tạo đơn hàng mới</title>
      </Helmet>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4">Thông tin đơn hàng</Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <OrderTableProduct
              valueQuery={{ keyword, priceStart, priceEnd }}
              data={products}
              typeComponent="orderCreate"
              onSelectedProduct={handleIncreaseProduct}
            />
          </Grid>
          <Grid item xs={5}>
            <OrderForm
              typeForm="create"
              labelButton="Tạo đơn hàng mới"
              isDisabled={isButtonDisabled}
              onSubmit={createOrder}
              onSelectedProduct={handleDecreaseProduct}
              headLabel={[
                { id: 'name', label: 'Tên sản phẩm' },
                { id: 'price', label: 'Giá mua sản phẩm' },
                { id: 'discount', label: 'Giảm giá' },
                { id: 'quantity', label: 'Số lượng' },
                { id: '' },
              ]}
              bodyLabel={selectedProduct}
              onChangeProduct={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
