import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoClose } from 'react-icons/io5';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdAddPhotoAlternate } from 'react-icons/md';

const UploadImage = ({ showImage, onClickUploadImage, handleRemoveImage }) => {
  return (
    <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
      <div
        style={{
          width: '255px',
          height: '150px',
          border: '2px dashed #c4c4c4',
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {!showImage ? (
          <div
            onClick={onClickUploadImage}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onClickUploadImage();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <MdAddPhotoAlternate
              style={{
                fontSize: '260%',
              }}
            />
            <div>Chọn hình ảnh</div>
          </div>
        ) : (
          <>
            <img
              src={showImage}
              alt="Uploaded"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <IoClose
              onClick={handleRemoveImage}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: 'white',
                color: 'red',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '140%',
              }}
            />
          </>
        )}
      </div>
    </label>
  );
};

UploadImage.propTypes = {
  handleRemoveImage: PropTypes.func.isRequired,
  onClickUploadImage: PropTypes.func.isRequired,
  showImage: PropTypes.string,
};

export default UploadImage;
