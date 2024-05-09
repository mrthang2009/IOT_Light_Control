import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { axiosClient } from 'src/utils/axios';

import { showSuccess, handleErrorResponse } from 'src/utils';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/MenuPopover';
import ConfirmDialog from 'src/components/ConfirmDialog';
import TemporaryAvatar from 'src/components/DefaultAvatar';

export default function ProductTableRow({
  isSelected,
  id,
  name,
  price,
  discount,
  stock,
  description,
  coverImageUrl,
  selected,
  setSelected,
  getFilterProduct,
  handleClick,
}) {
  const router = useRouter();
  const anchorRef = useRef(null);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleOpenMenu = (event) => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const handleEdit = (idProduct) => () => {
    router.push(`/products/edit/${idProduct}`);
  };

  const handleDeleteDetail = (idProduct) => async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/products/deleteSoftProduct/${idProduct}`;
      const resDeleteDetail = await axiosClient.patch(urlApi);
      if (resDeleteDetail.data.payload) {
        showSuccess('Xóa sản phẩm thành công');
        await getFilterProduct();
      }
      const filterSelected = selected.filter((item) => item !== idProduct);
      setSelected(filterSelected);
      setIsButtonDisabled(false);
      setIsOpenDialog(false);
      setIsOpenMenu(false);
    } catch (error) {
      handleErrorResponse(error, 'Xóa sản phẩm thất bại');
      setIsButtonDisabled(false);
    }
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={isSelected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Link to={`/products/edit/${id}`}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {coverImageUrl && coverImageUrl !== null ? (
                <Avatar alt={name} src={coverImageUrl} />
              ) : (
                <TemporaryAvatar textString={name} />
              )}
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            </Stack>
          </Link>
        </TableCell>

        <TableCell>{`${numeral(price).format('0,0')} ₫`}</TableCell>

        <TableCell>{discount}</TableCell>

        <TableCell>{stock}</TableCell>

        <TableCell>{description}</TableCell>

        <TableCell align="right">
          <IconButton ref={anchorRef} onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        isOpenMenu={isOpenMenu}
        handleCloseMenu={handleCloseMenu}
        handleEdit={handleEdit(id)}
        isButtonDisabled={isButtonDisabled}
        handleDelete={() => setIsOpenDialog(true)}
        anchorEl={() => anchorRef.current}
      />

      <ConfirmDialog
        closeDialog={() => {
          setIsOpenDialog(false);
        }}
        handleAgree={handleDeleteDetail(id)}
        isOpenDialog={isOpenDialog}
        isButtonDisabled={isButtonDisabled}
        question={`Bạn xác nhận xóa sản phẩm ${name}?`}
      />
    </>
  );
}

ProductTableRow.propTypes = {
  coverImageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  getFilterProduct: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  stock: PropTypes.number.isRequired,
};
