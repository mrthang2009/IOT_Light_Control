import * as yup from 'yup';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FormSupplier({
  typeForm,
  labelButton,
  isButtonDisabled,
  onSubmit,
  initialValues,
  isFirstRender,
}) {
  // Schema để kiểm tra dữ liệu nhập vào form
  const suppliersSchema = yup.object().shape({
    address: yup
      .string()
      .max(500, 'Địa chỉ không vượt quá 500 ký tự')
      .required('Địa chỉ không được bỏ trống'),
    email: yup
      .string()
      .required('Email không được bỏ trống')
      .test('email type', 'Email không hợp lệ', (value) => {
        const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      }),
    name: yup
      .string()
      .required('Tên nhà cung cấp không thể bỏ trống')
      .max(100, 'Tên nhà cung cấp không vượt quá 100 ký tự'),

    phoneNumber: yup
      .string()
      .required('Số điện thoại không được bỏ trống')
      .test('Kiểu số điện thoại', 'Số điện thoại không hợp lệ', (value) => {
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneRegex.test(value);
      }),
  });

  // Sử dụng useForm hook để quản lý form và kiểm tra dữ liệu
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(suppliersSchema),
  });

  useEffect(() => {
    if (initialValues && isFirstRender) {
      setValue('name', initialValues.name || '');
      setValue('email', initialValues.email || '');
      setValue('phoneNumber', initialValues.phoneNumber || '');
      setValue('address', initialValues.address || '');
    }
  }, [initialValues, isFirstRender, setValue]);

  return (
    <Card sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Tên nhà cung cấp"
              type="string"
              InputLabelProps={{ shrink: true }}
              placeholder="Nhập tên nhà cung cấp"
              {...register('name')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              label="Email"
              type="email"
              disabled={typeForm !== 'create'}
              InputLabelProps={{ shrink: true }}
              placeholder="Nhập email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="phoneNumber"
              label="Số điện thoại"
              type="tel"
              InputLabelProps={{ shrink: true }}
              placeholder="Nhập số điện thoại"
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Địa chỉ"
              type="string"
              InputLabelProps={{ shrink: true }}
              placeholder="Nhập địa chỉ"
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
            />
          </Grid>
        </Grid>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={isButtonDisabled}
          sx={{ width: '100%', marginTop: 2 }}
        >
          {labelButton}
        </LoadingButton>
      </form>
    </Card>
  );
}

FormSupplier.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isFirstRender: PropTypes.bool,
  typeForm: PropTypes.string, // Thêm prop initialValues để truyền giá trị ban đầu
};
