import { debounce } from 'lodash';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoClose } from 'react-icons/io5';
import React, { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';

import { axiosClient } from 'src/utils/axios';

import { getParamsFormObject } from 'src/utils';
import { DEFAULT_PAGINATION } from 'src/constants';

import Iconify from 'src/components/iconify';

const ItemMedia = ({ name, mediaUrl, onClickItemMedia, isSelected }) => (
  <div
    onClick={onClickItemMedia}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        onClickItemMedia();
      }
    }}
    role="button"
    tabIndex={0}
    style={{
      cursor: 'pointer',
      backgroundColor: isSelected ? '#D6EAFF' : 'transparent',
      padding: '10px',
      border: isSelected ? '1px solid #0861F2' : 'none',
    }}
  >
    <div style={{ width: '100%', height: '150px', position: 'relative', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        image={mediaUrl}
        alt={name}
        style={{ width: '100%', height: 'auto', position: 'absolute', bottom: 0, left: 0 }}
      />
    </div>
    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        variant="body2"
        color="initial"
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {name}
      </Typography>
    </CardContent>
  </div>
);

ItemMedia.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  mediaUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClickItemMedia: PropTypes.func.isRequired,
};

const MediaSelectionDialog = ({
  isButtonDisabled,
  isOpenMediaSelectionDialog,
  closeMediaSelectionDialog,
  handleSelection,
}) => {
  const [medias, setMedias] = useState([]);
  const [queryMedias, setQueryMedias] = useState({
    keyword: '',
    page: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
  });
  const [searchValue, setSearchValue] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const getMedias = useCallback(async () => {
    try {
      const queryString = getParamsFormObject(queryMedias);
      const urlAPI = `/medias/list${queryString}`;
      const res = await axiosClient.get(urlAPI);
      setMedias(res.data);
    } catch (error) {
      console.log('Error:', error);
    }
  }, [queryMedias]);

  useEffect(() => {
    const updateKeyword = debounce((value) => {
      setQueryMedias({
        keyword: value,
        page: DEFAULT_PAGINATION.PAGE,
        pageSize: 10,
      });
      setIsInitialLoad(true);
    }, 1000);
    updateKeyword(searchValue);
    return () => {
      updateKeyword.cancel();
    };
  }, [searchValue]);

  useEffect(() => {
    if (isOpenMediaSelectionDialog && isInitialLoad) {
      getMedias();
      setIsInitialLoad(false);
    }
  }, [isOpenMediaSelectionDialog, isInitialLoad, getMedias]);

  const handleChangePageMedias = (event, newPage) => {
    const nextPage = newPage + 1;
    setQueryMedias((prev) => ({
      ...prev,
      page: nextPage,
    }));
    setIsInitialLoad(true);
  };

  const handleFileUpload = (files) => {
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        setImageUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  let contentDialog;
  if (medias.payload && medias.payload.length === 0) {
    contentDialog = (
      <Typography variant="body1" color="text.secondary">
        Không tìm thấy hình ảnh
      </Typography>
    );
  } else {
    contentDialog = (
      <Grid container spacing={1}>
        {medias.payload &&
          medias.payload.map((media) => (
            <Grid item xs={2.4} key={media.id}>
              <ItemMedia
                name={media.name}
                mediaUrl={media.location}
                onClickItemMedia={() => setSelectedMedia(media._id)}
                isSelected={selectedMedia === media._id}
              />
            </Grid>
          ))}
      </Grid>
    );
  }

  const handleUploadButtonClick = () => {
    setSelectedMedia('');
    const uploadInput = document.getElementById('upload-image-input');
    if (uploadInput) {
      uploadInput.click();
    }
  };

  return (
    <Dialog
      open={isOpenMediaSelectionDialog}
      onClose={closeMediaSelectionDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Chọn hình ảnh
        <IconButton
          aria-label="close"
          onClick={closeMediaSelectionDialog}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <IoClose style={{ fontSize: '150%' }} />
        </IconButton>
      </DialogTitle>
      {selectedFile ? null : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <OutlinedInput
            sx={{ flex: 1, maxWidth: 500 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm hình ảnh của bạn"
          />
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleUploadButtonClick}
          >
            Tải ảnh lên
          </Button>
          <input
            type="file"
            id="upload-image-input"
            style={{ display: 'none' }}
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </Stack>
      )}

      <DialogContent>
        {selectedFile && (
          <div style={{ textAlign: 'center' }}>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </div>
        )}
        {selectedFile ? null : contentDialog}
      </DialogContent>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1 }}
      >
        {medias.payload && medias.payload.length > 0 && !selectedFile && (
          <TablePagination
            component="div"
            count={medias.total}
            page={queryMedias.page - 1}
            rowsPerPage={queryMedias.pageSize}
            labelDisplayedRows={({ from, to, count }) =>
              `Hiển thị từ ${from} đến ${to} trong tổng số ${count} ảnh`
            }
            labelRowsPerPage={null}
            rowsPerPageOptions={[]}
            onPageChange={handleChangePageMedias}
          />
        )}
        <DialogActions>
          <Button onClick={closeMediaSelectionDialog} variant="subtitle1">
            Hủy
          </Button>
          <Button
            disabled={isButtonDisabled}
            onClick={() => handleSelection(selectedMedia, selectedFile)}
            autoFocus
          >
            Chọn
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

MediaSelectionDialog.propTypes = {
  closeMediaSelectionDialog: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  isOpenMediaSelectionDialog: PropTypes.bool.isRequired,
};

export default MediaSelectionDialog;
