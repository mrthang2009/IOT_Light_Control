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
import { applyFilter, getComparator } from 'src/utils/product';

import { LOCATIONS } from 'src/constants';
import ProductTableRow from 'src/pages/Products/components/ProductTableRow';
import ProductTableHead from 'src/pages/Products/components/ProductTableHead';
import { showSuccess, handleErrorResponse, getParamsFormObject } from 'src/utils';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/Table/TableNoData';
import TableToolbar from 'src/components/Table/TableToolbar';
import CustomeTablePagination from 'src/components/CustomeTablePagination';

function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const pageSize = parseInt(searchParams.get('pageSize'), 10) || 5;
  const keyword = searchParams.get('keyword')
    ? decodeURIComponent(searchParams.get('keyword'))
    : '';

  const priceStart = parseFloat(searchParams.get('priceStart')) || '';
  const priceEnd = parseFloat(searchParams.get('priceEnd')) || '';

  const [products, setProducts] = useState({
    count: 0,
    payload: [],
  });

  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getFilterProduct = useCallback(async () => {
    try {
      const params = {
        page,
        pageSize,
        keyword,
        priceStart,
        priceEnd,
      };
      const queryParams = getParamsFormObject(params);
      const apiFilterProduct = `/products/search${queryParams}`;

      const resProduct = await axiosClient.get(apiFilterProduct);
      const dataSetProduct = {
        payload: resProduct.data.payload,
        count: resProduct.data.total,
      };
      setProducts((prev) => ({ ...prev, ...dataSetProduct }));
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
      const allSelects = products.payload.map((e) => e._id);
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

  const handleCreateProduct = () => {
    navigate(LOCATIONS.PRODUCT_CREATE);
  };

  const handleDeleteSelected = (data) => async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/products/deleteSoftProductSelected`;
      const dataSelected = {
        idSelected: data,
      };
      const resDeleteSelected = await axiosClient.patch(urlApi, dataSelected);
      if (resDeleteSelected.data.payload) {
        showSuccess('Xóa sản phẩm đã chọn thành công');
        if (selected.length >= products.count % pageSize && page > 1) {
          if (
            selected.length === pageSize ||
            (selected.length < pageSize && Math.ceil(products.count / pageSize))
          ) {
            const params = {
              page: page - 1,
              pageSize,
              keyword,
              priceStart,
              priceEnd,
            };
            const queryParams = getParamsFormObject(params);
            navigate(`${LOCATIONS.PRODUCT_LIST}${queryParams}`);
          }
        } else {
          await getFilterProduct();
        }
      }
      setSelected([]);
      setIsButtonDisabled(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa sản phẩm thất bại');
      setIsButtonDisabled(false);
    }
  };

  const dataFiltered = applyFilter({
    inputData: products.payload,
    comparator: getComparator(order, orderBy),
  });

  const notFound = !dataFiltered.length;

  useEffect(() => {
    getFilterProduct();
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title> Sản phẩm | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Sản phẩm</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleCreateProduct}
          >
            Thêm sản phẩm
          </Button>
        </Stack>

        <Card>
          <TableToolbar
            // valueSearch={{keyword: keyword, priceStart: priceStart, priceEnd: priceEnd}}
            // locationPage={LOCATIONS.PRODUCT_LIST}
            // contentPlaceholder={{keyword: "Tìm kiếm sản phẩm", priceStart: "Giá bắt đầu", priceEnd: "Giá kết thúc"}}
            // numSelected={selected.length}
            // isButtonDisabled={isButtonDisabled}
            // handleDeleteSelected={handleDeleteSelected(selected)}
            // namePage="Sản phẩm"
            // typePage="product"

            namePage="sản phẩm"
            valueQuery={{ keyword, priceStart, priceEnd }}
            locationPage={LOCATIONS.PRODUCT_LIST}
            numSelected={selected.length}
            placeholder={{
              keyword: 'Tìm kiếm sản phẩm',
              priceStart: 'Giá bắt đầu',
              priceEnd: 'Giá kết thúc',
            }}
            handleSelectedDeletion={handleDeleteSelected(selected)}
            isButtonDisabled={isButtonDisabled}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <ProductTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={products.count}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Tên sản phẩm' },
                    { id: 'price', label: 'Giá sản phẩm' },
                    { id: 'discount', label: 'Giảm giá' },
                    { id: 'stock', label: 'Tồn kho' },
                    { id: 'description', label: 'Mô tả sản phẩm' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered && dataFiltered.length > 0
                    ? dataFiltered.map((row, index) => (
                        <ProductTableRow
                          key={row._id}
                          id={row._id}
                          name={row.name}
                          price={row.price}
                          discount={row.discount}
                          stock={row.stock}
                          description={row.description}
                          coverImageUrl={`/assets/images/avatars/avatar_${index + 1}.jpg`}
                          isSelected={selected.indexOf(row._id) !== -1}
                          selected={selected}
                          setSelected={setSelected}
                          getFilterProduct={getFilterProduct}
                          handleClick={handleClick(row._id)}
                        />
                      ))
                    : notFound && <TableNoData queryValue={{ keyword, priceStart, priceEnd }} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {products.count > 0 && (
            <CustomeTablePagination
              // page={page}
              // pageSize={pageSize}
              // locationPage={LOCATIONS.PRODUCT_LIST}
              // total={products.count}
              // valueSearch={{keyword: keyword, priceStart: priceStart, priceEnd: priceEnd}}
              pagination={{ page, pageSize, keyword, priceStart, priceEnd }}
              locationPage={LOCATIONS.PRODUCT_LIST}
              total={products.count}
            />
          )}
        </Card>
      </Container>
    </>
  );
}

export default Products;
