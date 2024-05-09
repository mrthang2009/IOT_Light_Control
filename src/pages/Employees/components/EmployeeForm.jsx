import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { axiosClient } from 'src/utils/axios';
import { fDateTime } from 'src/utils/format-time';

import { handleErrorResponse } from 'src/utils';

import Iconify from 'src/components/iconify';

export default function EmployeeForm({
  typeForm,
  labelButton,
  isDisabled,
  onSubmit,
  isFirstRender = false,
  initialValues,
}) {
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    newPassword: false,
  });
  // Schema để kiểm tra dữ liệu nhập vào form
  const employeesSchema = yup.object().shape({
    ...((typeForm === 'create' || typeForm === 'edit') && {
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
      // birthday: yup
      // .mixed()
      // .nullable()
      // .test('birthday type', 'Ngày sinh không khả dụng', (value) => {
      //   if (value && value !== null) {
      //     return value < new Date();
      //   }
      //   return true;
      // }),
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
      roleId: yup.string().required('Vai trò của nhân viên không bỏ trống'),
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
    ...(typeForm === 'changePassword' && {
      confirmPassword: yup
        .string()
        .required('Nhập lại mật khẩu: không được bỏ trống')
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
          'Nhâp lại mật khẩu: không khớp với mật khẩu mới',
          (value, context) => {
            if (context.parent.newPassword) {
              return value === context.parent.newPassword;
            }
            return false;
          }
        )
        .min(8)
        .max(20),

      newPassword: yup
        .string()
        .required('Mật khẩu mới: không được để trống')
        .test('newPassword type', 'Mật khẩu mới: không hợp lệ', (value) => {
          const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

          return passwordRegex.test(value);
        })
        .test('newPassword type', 'Mật khẩu mới: không trùng với mật khẩu cũ', (value, context) => {
          if (context.parent.oldPassword) {
            return value !== context.parent.oldPassword;
          }
          return false; // hoặc giá trị mặc định khác tùy theo yêu cầu của bạn
        })
        .min(8)
        .max(20),

      oldPassword: yup
        .string()
        .required('Mật khẩu cũ: không được để trống')
        .test('oldPassword type', 'Mật khẩu cũ: không hợp lệ', (value) => {
          const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

          return passwordRegex.test(value);
        })
        .min(8)
        .max(20),
    }),
  });

  // Sử dụng useForm hook để quản lý form và kiểm tra dữ liệu
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(employeesSchema),
  });

  const submitFormEmployee = async (formData) => {
    try {
      if (typeForm === 'create' || typeForm === 'changePassword') {
        await onSubmit(formData, reset);
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      handleErrorResponse(error, `Thao tác form nhân viên đang sai`);
    }
  };

  const getRoles = useCallback(async () => {
    try {
      const urlApi = `/roles/all`;
      const resGet = await axiosClient.get(`${urlApi}`);
      setRoles(resGet.data.payload);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const findRoleById = (roleId) => {
    const role = roles.find((role) => role._id === roleId);
    return role;
  };

  useEffect(() => {
    if (initialValues && isFirstRender && typeForm === 'edit') {
      const formatDate = fDateTime(initialValues.birthday, 'yyyy-MM-dd');
      setValue('lastName', initialValues.lastName || '');
      setValue('firstName', initialValues.firstName || '');
      setValue('email', initialValues.email || '');
      setValue('phoneNumber', initialValues.phoneNumber || '');
      setValue('birthday', formatDate);
      setValue('address', initialValues.address || '');
      setValue('roleId', initialValues.roleId || '');
    }
  }, [initialValues, isFirstRender, setValue]);

  useEffect(() => {
    if (initialValues && isFirstRender && typeForm === 'edit') {
      getRoles();
    }
  }, [initialValues, isFirstRender]);

  return (
    <Card sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(submitFormEmployee)}>
        <Grid container spacing={2}>
          {(typeForm === 'create' || typeForm === 'edit') && (
            <>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Họ"
                  type="string"
                  // value = {getValues('lastName')}
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
            </>
          )}

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

          {(typeForm === 'create' || typeForm === 'edit') && (
            <>
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
              <Grid item xs={6}>
                <TextField
                  select
                  name="roleId"
                  type="string"
                  label="Vai trò"
                  onMouseUp={getRoles}
                  value={getValues('roleId') || ''}
                  fullWidth
                  sx={{ width: '100%' }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {((roles && roles.length === 0) || !getValues('roleId')) &&
                          'Vui lòng chọn vai trò'}
                      </InputAdornment>
                    ),
                  }}
                  {...register('roleId')}
                  error={!!errors.roleId}
                  helperText={errors.roleId?.message}
                >
                  {roles && roles.length > 0 ? (
                    roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      Vui lòng chờ tải vai trò nhân viên
                    </MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="roleId"
                  label="Quyền nhân viên"
                  type="string"
                  disabled={typeForm === 'create' || typeForm === 'edit'}
                  InputLabelProps={{ shrink: true }}
                  value={findRoleById(getValues('roleId'))?.permissions?.join(', ') || ''} // Sử dụng join để nối các giá trị trong mảng thành một chuỗi
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {((roles && roles.length === 0) || !getValues('roleId')) &&
                          'Vui lòng chọn vai trò trước'}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </>
          )}
          {typeForm === 'changePassword' && (
            <>
              <Grid item xs={12}>
                <TextField
                  name="oldPassword"
                  label="Mật khẩu cũ"
                  type={showPassword.password ? 'text' : 'password'}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập mật khẩu cũ"
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
                  {...register('oldPassword')}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="newPassword"
                  label="Mật khẩu mới"
                  type={showPassword.newPassword ? 'text' : 'password'}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập mật khẩu mới"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              newPassword: !showPassword.newPassword,
                            }))
                          }
                          edge="end"
                        >
                          <Iconify
                            icon={showPassword.newPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register('newPassword')}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  label="Xác nhận mật khẩu mới"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập mật khẩu mới"
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
        </Grid>
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

EmployeeForm.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  typeForm: PropTypes.string, // Thêm prop initialValues để truyền giá trị ban đầu
};
