import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { axiosClient } from 'src/utils/axios';

// import { isEmptyObject } from 'src/utils';

import UploadImage from 'src/components/UploadImage';
import MediaSelectionDialog from 'src/components/MediaSelectionDialog';

const FormCategory = ({
  labelButton,
  isButtonDisabled,
  onSubmit,
  initialValues,
  isFirstRender,
}) => {
  const [isOpenMediaSelectionDialog, setIsOpenMediaSelectionDialog] = useState(false);
  const [detailMedia, setDetailMedia] = useState({});
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });
  const [imageUrl, setImageUrl] = useState('');

  const categorySchema = yup.object().shape({
    description: yup.string().max(500, 'Mô tả danh mục không được vượt quá 500 kí tự'),
    name: yup
      .string()
      .required('Tên danh mục không được để trống')
      .max(100, 'Tên danh mục không được vượt quá 100 kí tự'),
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
      setImageUrl(initialValues.coverImage || '');
    }
  }, [initialValues, isFirstRender, setValue]);

  const handleSelectionMedia = (mediaId, file) => {
    setIsOpenMediaSelectionDialog(false);
    if (mediaId) {
      setFormData({ ...formData, coverImageId: mediaId });
      getDetailMedia(mediaId);
    }
    if (file) {
      setFormData({ ...formData, coverImageId: file });
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        setImageUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseSelectionMedia = () => {
    setIsOpenMediaSelectionDialog(false);
    setImageUrl('');
  };

  const getDetailMedia = async (mediaId) => {
    try {
      const res = await axiosClient.get(`/medias/detail/${mediaId}`);
      setDetailMedia(res.data.payload);
    } catch (error) {
      console.error('Error fetching media detail:', error);
    }
  };

  const handleRemoveImage = () => {
    setDetailMedia({});
    setImageUrl('');
    setFormData({ ...formData, coverImageId: '' });
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(formData))}>
      <Card sx={{ padding: 3 }}>
        <Stack sx={{ marginBottom: 1 }} spacing={2}>
          <TextField
            name="name"
            label="Danh mục"
            type="string"
            InputLabelProps={{ shrink: true }}
            placeholder="Nhập tên danh mục"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ width: '100%' }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            name="description"
            label="Mô tả danh mục"
            type="string"
            InputLabelProps={{ shrink: true }}
            placeholder="Nhập mô tả danh mục"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{ width: '100%' }}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Typography variant="body2">Ảnh bìa danh mục</Typography>
          <UploadImage
            name="image"
            onClickUploadImage={() => setIsOpenMediaSelectionDialog(true)}
            handleRemoveImage={handleRemoveImage}
            showImage={imageUrl || detailMedia.location}
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
      <MediaSelectionDialog
        closeMediaSelectionDialog={handleCloseSelectionMedia}
        handleSelection={handleSelectionMedia}
        isOpenMediaSelectionDialog={isOpenMediaSelectionDialog}
        isButtonDisabled={isButtonDisabled}
      />
    </form>
  );
};

FormCategory.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isFirstRender: PropTypes.bool,
};

export default FormCategory;
