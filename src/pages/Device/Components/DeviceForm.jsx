import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

const DeviceForm = ({ labelButton, isButtonDisabled, onSubmit, initialValues, isFirstRender }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const categorySchema = yup.object().shape({
    description: yup.string().max(500, 'Mô tả thiết bị không được vượt quá 500 kí tự'),
    name: yup
      .string()
      .required('Tên thiết bị không được để trống')
      .max(100, 'Tên thiết bị không được vượt quá 100 kí tự'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    if (initialValues && isFirstRender) {
      setValue('name', initialValues.name || '');
      setValue('description', initialValues.description || '');
    }
  }, [initialValues, isFirstRender, setValue]);
  console.log('««««« formData »»»»»', formData);
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(formData))}>
      <Card sx={{ padding: 3 }}>
        <Stack sx={{ marginBottom: 1 }} spacing={2}>
          <TextField
            name="name"
            label="Thiết bị *"
            type="string"
            InputLabelProps={{ shrink: true }}
            placeholder="Nhập tên thiết bị"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ width: '100%' }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            name="description"
            label="Mô tả thiết bị"
            type="string"
            InputLabelProps={{ shrink: true }}
            placeholder="Nhập mô tả thiết bị"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{ width: '100%' }}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Stack>
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
      </Card>
    </form>
  );
};

DeviceForm.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isFirstRender: PropTypes.bool,
};

export default DeviceForm;
