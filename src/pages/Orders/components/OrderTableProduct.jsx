import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { applyFilter, getComparator } from 'src/utils/product';

import { LOCATIONS } from 'src/constants';
import ProductTableRow from 'src/pages/Products/components/ProductTableRow';
import ProductTableHead from 'src/pages/Products/components/ProductTableHead';

import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/Table/TableNoData';
import TableToolbar from 'src/components/Table/TableToolbar';

export default function OrderTableProduct({ valueQuery, data, typeComponent, onSelectedProduct }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const dataFiltered = applyFilter({
    inputData: data.payload,
    comparator: getComparator(order, orderBy),
  });

  const notFound = !dataFiltered.length;
  return (
    <Card>
      <TableToolbar
        namePage="sản phẩm"
        valueQuery={{
          keyword: valueQuery.keyword,
          priceStart: valueQuery.priceStart,
          priceEnd: valueQuery.priceEnd,
        }}
        locationPage={LOCATIONS.ORDER_CREATE}
        placeholder={{
          keyword: 'Tìm kiếm sản phẩm',
          priceStart: 'Giá bắt đầu',
          priceEnd: 'Giá kết thúc',
        }}
      />
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <ProductTableHead
              order={order}
              orderBy={orderBy}
              rowCount={data.count}
              onRequestSort={handleSort}
              headLabel={[
                { id: 'name', label: 'Tên sản phẩm' },
                { id: 'price', label: 'Giá sản phẩm' },
                { id: 'discount', label: 'Giảm giá' },
                { id: 'stock', label: 'Tồn kho' },
                { id: 'description', label: 'Mô tả sản phẩm' },
                { id: '' },
              ]}
              typeComponent={typeComponent}
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
                      typeComponent={typeComponent}
                      onSelectedProduct={onSelectedProduct}
                    />
                  ))
                : notFound && (
                    <TableNoData
                      queryValue={{
                        keyword: valueQuery.keyword,
                        priceStart: valueQuery.priceStart,
                        priceEnd: valueQuery.priceEnd,
                      }}
                    />
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}

OrderTableProduct.propTypes = {
  dataFiltered: PropTypes.array,
  typeComponent: PropTypes.string,
  valueQuery: PropTypes.object,
};
