import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS, DEFAULT_PAGINATION } from 'src/constants';
import { showSuccess, handleErrorResponse, getParamsFormObject } from 'src/utils';

import Loading from 'src/components/Loading';
import PageHeader from 'src/components/PageHeader';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import TableNoData from 'src/components/Table/TableNoData';
import TableHeader from 'src/components/Table/TableHeader';
import TableToolbar from 'src/components/Table/TableToolbar';
import CustomTablePagination from 'src/components/CustomTablePagination';

import CustomerTableRow from './Components/CustomerTableRow';

function Customers() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selected, setSelected] = useState([]);
  const [queryData, setQueryData] = useState({});

  const getData = useCallback(async (newQueryData) => {
    try {
      const queryString = getParamsFormObject(newQueryData);
      const urlAPI = `/customers/list${queryString}`;
      const res = await axiosClient.get(urlAPI);
      setData(res.data);
      setSelected([]);
    } catch (error) {
      console.log('««««« error »»»»»', error);
    }
  }, []);

  // Lấy các tham số từ URL sử dụng URLSearchParams
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page'), 10) || DEFAULT_PAGINATION.PAGE;
    const pageSize = parseInt(searchParams.get('pageSize'), 10) || DEFAULT_PAGINATION.PAGE_SIZE;
    const keyword = searchParams.get('keyword')
      ? decodeURIComponent(searchParams.get('keyword'))
      : '';

    const newQueryData = { page, pageSize, keyword };
    setQueryData(newQueryData);

    getData(newQueryData);
  }, [location.search, getData]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allSelecteds = data.payload.map((e) => e._id);
      setSelected(allSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_id) => {
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

  const handleDeleteCustomers = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/customers/delete/`;
      const res = await axiosClient.patch(urlApi, { ids: selected });
      if (res.data.payload && res.data.payload.length > 0) {
        showSuccess('Xóa khách hàng đã chọn thành công');
        setSelected([]);
        await getData();
      }
    } catch (error) {
      handleErrorResponse(error, 'Xóa khách hàng đã chọn thất bại');
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { page, pageSize, ...valueQuery } = queryData;

  return (
    <Container>
      <PageHeader
        nameButtonCreate="Thêm khách hàng mới"
        title="Khách hàng"
        locationPageCreate={LOCATIONS.CUSTOMER_CREATE}
      />
      {data.payload ? (
        <Card>
          <TableToolbar
            namePage="khách hàng"
            valueQuery={valueQuery}
            locationPage={LOCATIONS.CUSTOMER_LIST}
            placeholder={{ keyword: 'Tìm kiếm khách hàng' }}
            numSelected={selected.length}
            isButtonDisabled={isButtonDisabled}
            handleSelectedDeletion={handleDeleteCustomers}
          />
          <Scrollbar>
            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHeader
                  sx={{ minWidth: 2000 }}
                  rowCount={data.total}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'fullName', label: 'Họ tên' },
                    { id: 'email', label: 'Email' },
                    { id: 'phoneNumber', label: 'Số điện thoại' },
                    { id: 'birthday', label: 'Ngày sinh' },
                    { id: 'address', label: 'Địa chỉ' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {data.payload.length > 0 ? (
                    data.payload.map((row, index) => (
                      <CustomerTableRow
                        key={row._id}
                        id={row._id}
                        avatarUrl={row.avatarId}
                        name={row.fullName}
                        email={row.email}
                        phoneNumber={row.phoneNumber}
                        birthday={row.birthday}
                        address={row.address}
                        selected={selected.indexOf(row._id) !== -1}
                        handleClick={() => handleClick(row._id)}
                        getData={getData}
                      />
                    ))
                  ) : (
                    <TableNoData queryValue={valueQuery} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {data.payload.length > 0 && (
            <CustomTablePagination
              total={data.total}
              pagination={queryData}
              locationPage={LOCATIONS.CUSTOMER_LIST}
            />
          )}
        </Card>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Customers;
