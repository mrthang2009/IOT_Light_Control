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
import { applyFilter, getComparator } from 'src/utils/employee';

import { LOCATIONS } from 'src/constants';
// import TableNoData from 'src/pages/Employees/Components/TableNoData';
import EmployeeTableRow from 'src/pages/Employees/components/EmployeeTableRow';
import EmployeeTableHead from 'src/pages/Employees/components/EmployeeTableHead';
import { showSuccess, handleErrorResponse, getParamsFormObject } from 'src/utils';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/Table/TableNoData';
// import EmployeeTableToolbar from 'src/pages/Employees/Components/EmployeeToolbar';
import TableToolbar from 'src/components/Table/TableToolbar';
import CustomeTablePagination from 'src/components/CustomeTablePagination';

function Employees() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const pageSize = parseInt(searchParams.get('pageSize'), 10) || 5;
  const keyword = searchParams.get('keyword')
    ? decodeURIComponent(searchParams.get('keyword'))
    : '';

  const [employees, setEmployees] = useState({
    count: 0,
    payload: [],
  });

  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getFilterEmployee = useCallback(async () => {
    try {
      const params = {
        page,
        pageSize,
        keyword,
      };
      const queryParams = getParamsFormObject(params);
      const apiFilterEmployee = `/employees/search${queryParams}`;
      const resEmployee = await axiosClient.get(apiFilterEmployee);
      const dataSetEmployee = {
        payload: resEmployee.data.payload,
        count: resEmployee.data.total,
      };
      setEmployees((prev) => ({ ...prev, ...dataSetEmployee }));
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
      const allSelects = employees.payload.map((e) => e._id);
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

  const handleCreateEmployee = () => {
    navigate(LOCATIONS.EMPLOYEE_CREATE);
  };

  const handleDeleteSelected = (data) => async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/employees/deleteSoftEmployeeSelected`;
      const dataSelected = {
        idSelected: data,
      };
      const resDeleteSelected = await axiosClient.patch(urlApi, dataSelected);
      console.log(resDeleteSelected.data.payload);
      if (resDeleteSelected.data.payload) {
        showSuccess('Xóa nhân viên đã chọn thành công');
        if (selected.length >= employees.count % pageSize && page > 1) {
          if (
            selected.length === pageSize ||
            (selected.length < pageSize && Math.ceil(products.count / pageSize))
          ) {
            const params = {
              page: page - 1,
              pageSize,
              keyword,
            };
            const queryParams = getParamsFormObject(params);
            navigate(`${LOCATIONS.EMPLOYEE_LIST}${queryParams}`);
          }
        } else {
          await getFilterEmployee();
        }
      }
      setSelected([]);
      setIsButtonDisabled(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa nhân viên thất bại');
      setIsButtonDisabled(false);
    }
  };

  const dataFiltered = applyFilter({
    inputData: employees.payload,
    comparator: getComparator(order, orderBy),
  });

  const notFound = !dataFiltered.length;

  useEffect(() => {
    getFilterEmployee();
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title> Employee | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Nhân viên</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleCreateEmployee}
          >
            Thêm nhân viên
          </Button>
        </Stack>

        <Card>
          <TableToolbar
            // valueSearch={{keyword: keyword}}
            // locationPage={LOCATIONS.EMPLOYEE_LIST}
            // contentPlaceholder= {{keyword: "Tìm kiếm nhân viên"}}
            // numSelected={selected.length}
            // isButtonDisabled={isButtonDisabled}
            // handleDeleteSelected={handleDeleteSelected(selected)}
            // namePage="Nhân viên"
            // typePage="Employee"

            namePage="nhân viên"
            valueQuery={{ keyword }}
            locationPage={LOCATIONS.EMPLOYEE_LIST}
            numSelected={selected.length}
            placeholder={{ keyword: 'Tìm kiếm nhân viên' }}
            handleSelectedDeletion={handleDeleteSelected(selected)}
            isButtonDisabled={isButtonDisabled}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <EmployeeTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={employees.count}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'fullName', label: 'Tên' },
                    { id: 'email', label: 'Email' },
                    { id: 'phoneNumber', label: 'Số điện thoại' },
                    { id: 'birthday', label: 'Ngày sinh' },
                    { id: 'address', label: 'Địa chỉ' },
                    { id: 'roleName', label: 'Vai trò' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered && dataFiltered.length > 0
                    ? dataFiltered.map((row, index) => (
                        <EmployeeTableRow
                          key={row._id}
                          id={row._id}
                          name={row.fullName}
                          email={row.email}
                          phoneNumber={row.phoneNumber}
                          birthday={row.birthday}
                          address={row.address}
                          roleName={row.role?.name}
                          avatarUrl={`/assets/images/avatars/avatar_${index + 1}.jpg`}
                          isSelected={selected.indexOf(row._id) !== -1}
                          selected={selected}
                          setSelected={setSelected}
                          getFilterEmployee={getFilterEmployee}
                          handleClick={handleClick(row._id)}
                        />
                      ))
                    : notFound && <TableNoData queryValue={{ keyword }} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {employees.count > 0 && (
            <CustomeTablePagination
              // page={page}
              // pageSize={pageSize}
              // locationPage={LOCATIONS.EMPLOYEE_LIST}
              // total={employees.count}
              // valueSearch={{ keyword: keyword }}

              pagination={{ page, pageSize, keyword }}
              locationPage={LOCATIONS.EMPLOYEE_LIST}
              total={employees.count}
            />
          )}
        </Card>
      </Container>
    </>
  );
}

export default Employees;
