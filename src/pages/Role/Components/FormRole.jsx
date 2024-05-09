import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { axiosClient } from 'src/utils/axios';

export default function FormRole({
  labelButton,
  isButtonDisabled,
  onSubmit,
  initialValues,
  isFirstRender,
}) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  // Hàm lấy danh sách quyền từ API khi component được render
  useEffect(() => {
    const getPermissions = async () => {
      try {
        const resPermissions = await axiosClient.get(`/roles/permissions`);
        setPermissions(resPermissions.data.payload);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    getPermissions();
  }, []); // Chỉ chạy một lần khi component được render

  // Schema để kiểm tra dữ liệu nhập vào form
  const RolesSchema = yup.object().shape({
    description: yup.string().max(100, 'Mô tả vai trò không vượt quá 100 ký tự'),
    name: yup
      .string()
      .required('Tên vai trò không thể bỏ trống')
      .max(50, 'Tên vai trò không vượt quá 50 ký tự'),
    selectedPermissions: yup.array().min(1, 'Ít nhất phải chọn một quyền'),
  });

  // Sử dụng useForm hook để quản lý form và kiểm tra dữ liệu
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RolesSchema),
  });

  useEffect(() => {
    if (initialValues && isFirstRender) {
      setValue('name', initialValues.name || '');
      setValue('description', initialValues.description || '');
      setSelectedPermissions(initialValues.selectedPermissions || []);
    }
  }, [initialValues, isFirstRender, setValue]);

  // Hàm xử lý khi checkbox quyền thay đổi
  const onChangePermissions = (permissionName) => {
    const isChecked = selectedPermissions.includes(permissionName);
    if (isChecked) {
      setSelectedPermissions((prevSelectedPermissions) =>
        prevSelectedPermissions.filter((name) => name !== permissionName)
      );
    } else {
      setSelectedPermissions((prevSelectedPermissions) => [
        ...prevSelectedPermissions,
        permissionName,
      ]);
    }
  };

  const submitForm = (data) => {
    const formData = {
      ...data,
      permissions: selectedPermissions,
    };
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Card sx={{ padding: 3 }}>
        <Stack sx={{ marginBottom: 1 }} spacing={2}>
          <TextField
            name="name"
            label="Vai trò"
            type="string"
            InputLabelProps={{ shrink: true }}
            placeholder="Nhập tên vai trò"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ width: '100%', marginBottom: 3 }} // Thiết lập chiều rộng là 100%
          />
          <TextField
            name="description"
            label="Mô tả vai trò"
            type="string"
            InputLabelProps={{ shrink: true }}
            placeholder="Nhập mô tả vai trò"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
          />
        </Stack>
        <Grid name="selectedPermissions" container spacing={2} sx={{ marginBottom: 2 }}>
          {permissions.map((group) => (
            <Grid item xs={12} md={4} key={group.groupName}>
              <div>
                <h4>{group.groupName}</h4>
                <ul style={{ listStyle: 'none' }}>
                  {group.permissions.map((permission) => (
                    <li key={permission.name}>
                      <label htmlFor={permission.name} style={{ cursor: 'pointer' }}>
                        <input
                          id={permission.name}
                          type="checkbox"
                          value={permission.name}
                          // Trạng thái checked dựa trên việc quyền có trong danh sách quyền đã chọn hay không
                          checked={
                            selectedPermissions && selectedPermissions.includes(permission.name)
                          }
                          // Khi checkbox thay đổi trạng thái, gọi hàm xử lý để cập nhật danh sách quyền đã chọn
                          onChange={() => onChangePermissions(permission.name)}
                          style={{ marginRight: '6px', transform: 'scale(1.2)' }}
                        />
                        {permission.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          ))}
        </Grid>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          disabled={isButtonDisabled}
          sx={{ width: '100%', marginTop: 1 }}
        >
          {labelButton}
        </LoadingButton>
      </Card>
    </form>
  );
}

FormRole.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isFirstRender: PropTypes.bool, // Thêm prop initialValues để truyền giá trị ban đầu
};
