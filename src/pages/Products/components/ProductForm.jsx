import * as yup from 'yup';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { handleErrorResponse } from 'src/utils';

export default function ProductForm({
  typeForm,
  labelButton,
  isDisabled,
  onSubmit,
  isFirstRender = false,
  initialValues,
}) {
  // Schema để kiểm tra dữ liệu nhập vào form
  const productsSchema = yup.object().shape({
    ...((typeForm === 'create' || typeForm === 'edit') && {
      name: yup
        .string()
        .required('Tên sản phẩm: không được để trống')
        .max(100, 'Tên sản phẩm: không vượt quá 100 ký tự'),
      price: yup
        .number()
        .required('Giá sản phẩm: bắt buộc điền')
        .typeError('Giá sản phẩm phải là một số')
        .min(0, 'Giá sản phẩm: không thấp hơn 0'),
      discount: yup
        .number()
        .min(0, 'Giảm giá sản phẩm: không thấp hơn 0')
        .typeError('Giá giảm giá phải là một số')
        .max(100, 'Giảm giá sản phẩm: không vượt quá 100%'),
      stock: yup.number().typeError('Tồn kho phải là một số').min(0, 'Tồn kho: không thấp hơn 0'),
      description: yup.string().max(500, 'Mô tả sản phẩm: không vượt quá 00 ký tự'),
    }),
  });

  // Sử dụng useForm hook để quản lý form và kiểm tra dữ liệu
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(productsSchema),
  });

  const submitFormProduct = async (formData) => {
    try {
      if (typeForm === 'create') {
        await onSubmit(formData, reset);
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      handleErrorResponse(error, `Thao tác form nhân viên đang sai`);
    }
  };

  useEffect(() => {
    if (initialValues && isFirstRender && typeForm === 'edit') {
      setValue('name', initialValues.name || '');
      setValue('price', initialValues.price || '');
      setValue('discount', initialValues.discount || '');
      setValue('stock', initialValues.stock || '');
      setValue('description', initialValues.description);
    }
  }, [initialValues, isFirstRender, setValue]);

  return (
    <Card sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(submitFormProduct)}>
        <Grid container spacing={2}>
          {(typeForm === 'create' || typeForm === 'edit') && (
            <>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  label="Tên Sản phẩm"
                  type="string"
                  disabled={typeForm !== 'create'}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập tên sản phẩm"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="price"
                  label="giá"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập giá sản phẩm"
                  {...register('price')}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="discount"
                  label="Giảm giá"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập giảm giá"
                  {...register('discount')}
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="stock"
                  label="Tồn kho"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập tồn kho"
                  {...register('stock')}
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                  sx={{ width: '100%' }} // Thiết lập chiều rộng là 100%
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Mô tả sản phẩm"
                  type="string"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Nhập mô tả sản phẩm"
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
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

ProductForm.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  typeForm: PropTypes.string, // Thêm prop initialValues để truyền giá trị ban đầu
};
