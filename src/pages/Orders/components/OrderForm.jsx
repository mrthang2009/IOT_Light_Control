import * as yup from 'yup';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Avatar } from '@mui/material';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';

import { applyFilter, getComparator, visuallyHidden } from 'src/utils/product';

import { handleErrorResponse } from 'src/utils';
import { STATUS, PAYMENT_TYPE } from 'src/constants';

import Scrollbar from 'src/components/scrollbar';
import TemporaryAvatar from 'src/components/DefaultAvatar';

export default function OrderForm({
  typeForm,
  labelButton,
  isDisabled,
  onSubmit,
  isFirstRender,
  initialValues,
  headLabel,
  bodyLabel,
  onSelectedProduct,
  onChangeProduct,
}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const { REJECTED, ...STATUSCREATE } = STATUS.VALUE;
  // Schema để kiểm tra dữ liệu nhập vào form

  const ordersSchema = yup.object().shape({
    ...((typeForm === 'create' || typeForm === 'edit') && {
      createdDate: yup.date(),
      shippedDate: yup
        .date()
        .test(
          'check date',
          'shippedDate: không thấp hơn ngày tạo và ngày hiện tại',
          (value, context) => {
            if (!value) return true;

            if (value && context.parent.createdDate && value < context.parent.createdDate) {
              return false;
            }

            if (value < new Date()) {
              return false;
            }

            return true;
          }
        ),
      paymentType: yup
        .string()
        .required('Phương thức thanh toán: không được để trống')
        .oneOf(Object.values(PAYMENT_TYPE.VALUE), 'Loại thanh toán: không hợp lệ'),
      status: yup
        .string()
        .required('Trạng thái: không được để trống')
        .oneOf(Object.values(STATUSCREATE), 'Trạng thái đơn hàng: không hợp lệ'),
      isDelivery: yup.boolean(),
    }),
  });

  // Sử dụng useForm hook để quản lý form và kiểm tra dữ liệu
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ordersSchema),
  });

  const submitFormProduct = async (formData) => {
    try {
      if (typeForm === 'create') {
        await onSubmit(formData, reset, dataFiltered);
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      handleErrorResponse(error, `Thao tác form đặt đơn hàng sai`);
    }
  };

  const ORDER_SORT = {
    DESC: 'desc',
    ASC: 'asc',
  };

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const dataFiltered = applyFilter({
    inputData: bodyLabel,
    comparator: getComparator(order, orderBy),
  });

  useEffect(() => {
    if (initialValues && isFirstRender && typeForm === 'edit') {
      setValue('createdDate', initialValues.createdDate || '');
      setValue('shippedDate', initialValues.shippedDate || '');
      setValue('paymentType', initialValues.paymentType || '');
      setValue('status', initialValues.status || '');
      setValue('isDelivery', initialValues.isDelivery);
    }
    if (typeForm === 'create') {
      setValue('createdDate', new Date().toISOString().split('T')[0] || '');
    }
  }, [initialValues, isFirstRender, setValue, typeForm]);

  return (
    <Card sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(submitFormProduct)}>
        <Grid container spacing={2}>
          {(typeForm === 'create' || typeForm === 'edit') && (
            <>
              <Grid item xs={6}>
                <TextField
                  name="createdDate"
                  label="Ngày đặt hàng"
                  type="date"
                  disabled={typeForm === 'create' || typeForm === 'edit'}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Ngày tạo đơn hàng"
                  {...register('createdDate')}
                  error={!!errors.createdDate}
                  helperText={errors.createdDate?.message}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="shippedDate"
                  label="Ngày giao hàng"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Ngày giao hàng"
                  {...register('shippedDate')}
                  error={!!errors.shippedDate}
                  helperText={errors.shippedDate?.message}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  name="paymentType"
                  type="string"
                  label="Loại thanh toán"
                  {...register('paymentType')}
                  defaultValue={getValues('paymentType') || PAYMENT_TYPE.VALUE.CASH}
                  error={!!errors.paymentType}
                  helperText={errors.paymentType?.message}
                  sx={{ width: '100%' }}
                >
                  {Object.values(PAYMENT_TYPE.VALUE).map((item) => (
                    <MenuItem key={PAYMENT_TYPE.VALUE[item]} value={PAYMENT_TYPE.VALUE[item]}>
                      {PAYMENT_TYPE.CONVERT[item]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  name="status"
                  type="string"
                  label="Trạng thái đơn hàng"
                  {...register('status')}
                  defaultValue={getValues('status') || STATUS.VALUE.COMPLETED}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  sx={{ width: '100%' }}
                >
                  {Object.values(STATUSCREATE).map((item) => (
                    <MenuItem key={STATUSCREATE[item]} value={STATUSCREATE[item]}>
                      {STATUS.CONVERT[item]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </>
          )}
        </Grid>
        {typeForm === 'create' && (
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {headLabel.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.align || 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                          hideSortIcon
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : ORDER_SORT.ASC}
                          onClick={() => handleSort(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id && (
                            <Box sx={{ ...visuallyHidden }}>
                              {order === ORDER_SORT.DESC ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          )}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFiltered && dataFiltered.length > 0 ? (
                    dataFiltered.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          onClick={onSelectedProduct(row._id)}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {row.coverImageId && row.coverImageId !== null ? (
                              <Avatar alt={row.name} src={row.coverImageId} />
                            ) : (
                              <TemporaryAvatar textString={row.name} />
                            )}
                            <Typography variant="subtitle2" noWrap>
                              {row.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{`${numeral(row.price * row.quantity).format(
                          '0,0'
                        )} ₫`}</TableCell>
                        <TableCell>{row.discount}</TableCell>
                        <TableCell>
                          <TextField
                            name="quantity"
                            value={row.quantity}
                            type="number"
                            onChange={(e) => onChangeProduct(row._id, e)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Không có sản phẩm trong danh sách chọn
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        )}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={isDisabled}
          sx={{ width: '100%', marginTop: 2 }}
        >
          {labelButton}
        </LoadingButton>
      </form>
    </Card>
  );
}

OrderForm.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  bodyLabel: PropTypes.array,
  // Thêm prop initialValues để truyền giá trị ban đầu
  headLabel: PropTypes.array,
  initialValues: PropTypes.object,
  isFirstRender: PropTypes.bool,
  typeForm: PropTypes.string,
  onChangeProduct: PropTypes.func,
  onSelectedProduct: PropTypes.func,
};
