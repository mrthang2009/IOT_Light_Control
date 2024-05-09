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

import RoleTableRow from './components/RoleTableRow';

function Roles() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selected, setSelected] = useState([]);
  const [dataPermissions, setDataPermissions] = useState([]);
  const [queryData, setQueryData] = useState({});

  const getData = useCallback(async (newQueryData) => {
    try {
      const queryString = getParamsFormObject(newQueryData);
      const urlAPI = `/roles/list${queryString}`;
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

  // Hàm lấy danh sách quyền từ API khi component được render
  useEffect(() => {
    const getPermissions = async () => {
      try {
        const resPermissions = await axiosClient.get(`/roles/permissions`);
        setDataPermissions(resPermissions.data.payload);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getPermissions();
  }, []);

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

  const handleDeleteRoles = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/roles/delete/`;
      const res = await axiosClient.patch(urlApi, { ids: selected });
      if (res.data.payload && res.data.payload.length > 0) {
        showSuccess('Xóa vai trò đã chọn thành công');
        setSelected([]);
        await getData();
      }
    } catch (error) {
      handleErrorResponse(error, 'Xóa vai trò đã chọn thất bại');
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { page, pageSize, ...valueQuery } = queryData;

  return (
    <Container>
      <PageHeader
        nameButtonCreate="Thêm vai trò mới"
        title="Vai trò"
        locationPageCreate={LOCATIONS.ROLE_CREATE}
      />
      {data.payload ? (
        <Card>
          <TableToolbar
            namePage="vai trò"
            valueQuery={valueQuery}
            locationPage={LOCATIONS.ROLE_LIST}
            placeholder={{ keyword: 'Tìm kiếm vai trò' }}
            numSelected={selected.length}
            isButtonDisabled={isButtonDisabled}
            handleSelectedDeletion={handleDeleteRoles}
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
                    { id: 'name', label: 'Tên vai trò' },
                    { id: 'description', label: 'Mô tả' },
                    { id: 'permission', label: 'Phân quyền' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {data.payload.length > 0 ? (
                    data.payload.map((row) => (
                      <RoleTableRow
                        key={row._id}
                        id={row._id}
                        name={row.name}
                        description={row.description}
                        permissions={row.permissions}
                        selected={selected.indexOf(row._id) !== -1}
                        handleClick={() => handleClick(row._id)}
                        dataPermissions={dataPermissions}
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
              locationPage={LOCATIONS.ROLE_LIST}
              pagination={queryData}
              total={data.total}
            />
          )}
        </Card>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Roles;
