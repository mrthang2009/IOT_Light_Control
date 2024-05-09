import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { fDateTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

export default function FormCustomer({
  typeForm,
  labelButton,
  isButtonDisabled,
  onSubmit,
  initialValues,
  isFirstRender,
}) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  // Schema để kiểm tra dữ liệu nhập vào form
  const customerSchema = yup.object().shape({
    address: yup
      .string()
      .max(500, 'Địa chỉ không vượt quá 500 ký tự')
      .required('Địa chỉ không được bỏ trống'),
    birthday: yup.date().test('birthday type', 'Ngày sinh không khả dụng', (value) => {
      if (value) {
        return value < Date.now();
      }
      return true;
    }),
    email: yup
      .string()
      .required('Email không được bỏ trống')
      .test('email type', 'Email không hợp lệ', (value) => {
        const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      }),
    firstName: yup
      .string()
      .required('Tên khách hàng không được bỏ trống')
      .max(50, (context) => {
        return `Tên khách hàng không vượt quá 50 ký tự, ${context.value} vượt quá rồi`;
      }),
    lastName: yup
      .string()
      .required('Họ khách hàng không được bỏ trống')
      .max(50, (context) => {
        return `Họ khách hàng không vượt quá 50 ký tự, ${context.value} vượt quá rồi`;
      }),
    phoneNumber: yup
      .string()
      .required('Số điện thoại không được bỏ trống')
      .test('Kiểu số điện thoại', 'Số điện thoại không hợp lệ', (value) => {
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneRegex.test(value);
      }),
    ...(typeForm === 'create' && {
      password: yup
        .string()
        .required('Mật khẩu không được bỏ trống')
        .test(
          'Kiểu mật khẩu',
          'Mật khẩu không hợp lệ, ít nhất 8 ký tự, viết hoa chữ cái đầu, có ký tự đặc biệt',
          (value) => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            return passwordRegex.test(value);
          }
        )
        .min(8)
        .max(20),
      confirmPassword: yup
        .string()
        .required('Xác nhận mật khẩu không được bỏ trống')
        .test(
          'confirmPassword type',
          'Nhâp lại mật khẩu: viết hoa ký tự đầu, mật khẩu ít nhất 8 ký tự, có ký tự đặc biệt',
          (value) => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            return passwordRegex.test(value);
          }
        )
        .test(
          'confirmPassword type',
          'Nhâp lại mật khẩu: không khớp với mật khẩu',
          (value, context) => {
            if (context.parent.password) {
              return value === context.parent.password;
            }
            return false;
          }
        )
        .min(8)
        .max(20),
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
    resolver: yupResolver(customerSchema),
  });

  useEffect(() => {
    if (initialValues && isFirstRender) {
      const formatDate = fDateTime(initialValues.birthday, 'yyyy-MM-dd');
      setValue('lastName', initialValues.lastName || '');
      setValue('firstName', initialValues.firstName || '');
      setValue('email', initialValues.email || '');
      setValue('phoneNumber', initialValues.phoneNumber || '');
      setValue('birthday', formatDate);
      setValue('address', initialValues.address || '');
    }
  }, [initialValues, isFirstRender, setValue]);

  return (
    <Card sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="firstName"
              label="Tên"
              type="string"
              InputLabelProps={{ shrink: true }}
              placeholder="Nhập tên khách hàng"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Họ"
              type="string"
              InputLabelProps={{ shrink: true }}
              placeholder="Nhập họ khách hàng"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
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
          {typeForm === 'create' && (
            <>
              <Grid item xs={6}>
                <TextField
                  name="password"
                  label="Mật khẩu"
                  type={showPassword.password ? 'text' : 'password'}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập mật khẩu"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              password: !showPassword.password,
                            }))
                          }
                          edge="end"
                        >
                          <Iconify
                            icon={showPassword.password ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Xác nhận mật khẩu"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              confirmPassword: !showPassword.confirmPassword,
                            }))
                          }
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showPassword.confirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <TextField
              name="birthday"
              label="Ngày sinh"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register('birthday')}
              error={!!errors.birthday}
              helperText={errors.birthday?.message}
              sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
            />
          </Grid>
          <Grid item xs={6}>
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

FormCustomer.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isFirstRender: PropTypes.bool,
  typeForm: PropTypes.string, // Thêm prop initialValues để truyền giá trị ban đầu
};
