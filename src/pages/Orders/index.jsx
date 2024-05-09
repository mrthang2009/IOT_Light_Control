import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { axiosClient } from 'src/utils/axios';
import { applyFilter, getComparator } from 'src/utils/order';

import { STATUS, LOCATIONS } from 'src/constants';
import OrderTableRow from 'src/pages/Orders/components/OrderTableRow';
import OrderTableHead from 'src/pages/Orders/components/OrderTableHead';
import { showSuccess, handleErrorResponse, getParamsFormObject } from 'src/utils';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/Table/TableNoData';
import TableToolbar from 'src/components/Table/TableToolbar';
import CustomeTablePagination from 'src/components/CustomeTablePagination';

function Orders() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const pageSize = parseInt(searchParams.get('pageSize'), 10) || 5;
  const keyword = searchParams.get('keyword')
    ? decodeURIComponent(searchParams.get('keyword'))
    : '';
  const status = searchParams.get('status') ? decodeURIComponent(searchParams.get('status')) : '';

  const createdDate = searchParams.get('createdDate')
    ? decodeURIComponent(searchParams.get('createdDate'))
    : '';

  const shippedDate = searchParams.get('shippedDate')
    ? decodeURIComponent(searchParams.get('shippedDate'))
    : '';

  const isDelivery = searchParams.get('isDelivery')
    ? decodeURIComponent(searchParams.get('isDelivery'))
    : '';

  const [orders, setOrders] = useState({
    count: 0,
    payload: [],
  });

  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getFilterOrder = useCallback(async () => {
    try {
      const params = {
        page,
        pageSize,
        keyword,
        status,
        createdDate,
        shippedDate,
        isDelivery,
      };
      const queryParams = getParamsFormObject(params);
      const apiFilterOrder = `/orders/search${queryParams}`;

      const resOrder = await axiosClient.get(apiFilterOrder);
      const dataSetOrder = {
        payload: resOrder.data.payload,
        count: resOrder.data.total,
      };
      setOrders((prev) => ({ ...prev, ...dataSetOrder }));
      setSelected([]);
    } catch (error) {
      console.error(error);
    }
  }, [location.search]);

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allSelects = orders.payload
        .filter((e) => e.status !== STATUS.VALUE.REJECTED)
        .map((e) => e._id);
      setSelected(allSelects);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_id) => () => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleCreateOrder = () => {
    navigate(LOCATIONS.ORDER_CREATE);
  };

  const handleDeleteSelected = (data) => async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/orders/rejectOrderSelected`;
      const dataSelected = {
        idSelected: data,
      };
      // const resDeleteSelected = await axiosClient.patch(urlApi, dataSelected);
      // if (resDeleteSelected.data.payload) {
      //     showSuccess('Hủy đơn hàng thành công');
      //     if ((selected.length > (orders.count % pageSize))) {
      //         if (((selected.length === pageSize || ((selected.length <= pageSize) && (page === Math.ceil(orders.count / pageSize)))) && page > 1)) {
      //             const params = {
      //                 page: page - 1,
      //                 pageSize,
      //                 keyword,
      //                 status,
      //                 createdDate,
      //                 shippedDate,
      //                 isDelivery,
      //             };
      //             const queryParams = getParamsFormObject(params);
      //             navigate(`${LOCATIONS.ORDER_LIST}${queryParams}`);
      //         }
      //     } else {
      //         await getFilterOrder();
      //     }
      // }
      // setSelected([]);
      // setIsButtonDisabled(false);

      const resDeleteSelected = await axiosClient.patch(urlApi, dataSelected);
      if (resDeleteSelected.data.payload) {
        showSuccess('Hủy đơn hàng thành công');
        if (selected.length >= orders.count % pageSize) {
          if (
            selected.length === pageSize ||
            (selected.length >= orders.count % pageSize &&
              page === Math.ceil(orders.count / pageSize) &&
              page > 1)
          ) {
            const params = {
              page: page > 1 ? page - 1 : 1,
              pageSize,
              keyword,
              status,
              createdDate,
              shippedDate,
              isDelivery,
            };
            const queryParams = getParamsFormObject(params);
            navigate(`${LOCATIONS.ORDER_LIST}${queryParams}`);
            setSelected([]);
            setIsButtonDisabled(false);
            return;
          }
        }
        await getFilterOrder();
      }

      setSelected([]);
      setIsButtonDisabled(false);
    } catch (error) {
      handleErrorResponse(error, 'Hủy đơn hàng thất bại');
      setIsButtonDisabled(false);
    }
  };

  const dataFiltered = applyFilter({
    inputData: orders.payload,
    comparator: getComparator(order, orderBy),
  });

  const notFound = !dataFiltered.length;

  useEffect(() => {
    getFilterOrder();
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title> Đơn hàng | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Đơn hàng</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleCreateOrder}
          >
            Thêm đơn hàng
          </Button>
        </Stack>

        <Card>
          <TableToolbar
            namePage="đơn hàng"
            valueQuery={{
              keyword,
              status,
              createdDate,
              shippedDate,
              isDelivery,
            }}
            locationPage={LOCATIONS.ORDER_LIST}
            numSelected={selected.length}
            placeholder={{
              keyword: 'Tìm kiếm sản phẩm',
              status: 'Trạng thái đơn hàng',
              createdDate: 'Ngày tao tạo đơn hàng',
              shippedDate: 'Ngày giao hàng đơn hàng',
              isDelivery: 'Loại giao hàng',
            }}
            handleSelectedDeletion={handleDeleteSelected(selected)}
            isButtonDisabled={isButtonDisabled}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <OrderTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={orders.count}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'status', label: 'Trạng thái' },
                    { id: 'orderDiscount', label: 'Giảm giá đơn hàng' },
                    { id: 'isDelivery', label: 'Loại giao hàng' },
                    { id: 'totalFee', label: 'Tổng phí giao hàng' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered && dataFiltered.length > 0
                    ? dataFiltered.map((row, index) => (
                        <OrderTableRow
                          key={row._id}
                          id={row._id}
                          status={row.status}
                          orderDiscount={row.orderDiscount}
                          isDelivery={row.isDelivery}
                          totalFee={row.totalFee}
                          isSelected={selected.indexOf(row._id) !== -1}
                          selected={selected}
                          setSelected={setSelected}
                          getFilterOrder={getFilterOrder}
                          handleClick={handleClick(row._id)}
                        />
                      ))
                    : notFound && (
                        <TableNoData
                          queryValue={{
                            keyword,
                            status,
                            createdDate,
                            shippedDate,
                            isDelivery,
                          }}
                        />
                      )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {orders.count > 0 && (
            <CustomeTablePagination
              pagination={{
                page,
                pageSize,
                keyword,
                status,
                createdDate,
                shippedDate,
                isDelivery,
              }}
              locationPage={LOCATIONS.ORDER_LIST}
              total={orders.count}
            />
          )}
        </Card>
      </Container>
    </>
  );
}

export default Orders;
