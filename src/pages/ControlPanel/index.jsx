import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import { axiosClient } from 'src/utils/axios';

import { LOCATIONS, DEFAULT_PAGINATION } from 'src/constants';
import { showSuccess, handleErrorResponse, getParamsFormObject } from 'src/utils';

import Loading from 'src/components/Loading';
import PageHeader from 'src/components/PageHeader';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import TableNoData from 'src/components/Table/TableNoData';
import TableToolbar from 'src/components/Table/TableToolbar';
import CustomTablePagination from 'src/components/CustomTablePagination';

import DeviceItem from './Components/DeviceItem';

function ControlPanel() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selected, setSelected] = useState([]);
  const [queryData, setQueryData] = useState({});

  const getData = useCallback(async (newQueryData) => {
    try {
      const queryString = getParamsFormObject(newQueryData);
      const urlAPI = `/devices/list${queryString}`;
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

  const handleDeleteMultiple = async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/devices/delete`;
      const res = await axiosClient.patch(urlApi, { ids: selected });
      if (res.data.payload && res.data.payload.length > 0) {
        showSuccess('Xóa thiết bị đã chọn thành công');
        setSelected([]);
        await getData();
      }
    } catch (error) {
      handleErrorResponse(error, 'Xóa thiết bị đã chọn thất bại');
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { page, pageSize, ...valueQuery } = queryData;

  return (
    <Container>
      <PageHeader title="Bảng điều khiển" locationPageCreate={LOCATIONS.DEVICE_CREATE} />
      {data.payload ? (
        <Card>
          <TableToolbar
            namePage="thiết bị"
            valueQuery={valueQuery}
            locationPage={LOCATIONS.DEVICE_LIST}
            placeholder={{ keyword: 'Tìm kiếm thiết bị' }}
            numSelected={selected.length}
            isButtonDisabled={isButtonDisabled}
            handleSelectedDeletion={handleDeleteMultiple}
          />
          <Scrollbar>
            {data.payload && data.payload.length > 0 ? (
              data.payload.map((item, index) => (
                <DeviceItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  status={item.status}
                  getData={() => getData(queryData)}
                />
              ))
            ) : (
              <TableNoData queryValue={valueQuery} />
            )}
          </Scrollbar>
          {data.payload && data.payload.length > 0 && (
            <CustomTablePagination
              locationPage={LOCATIONS.CATEGORY_LIST}
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

export default ControlPanel;
