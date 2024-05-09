import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { axiosClient } from 'src/utils/axios';

import { STATUS, ISDELIVERING } from 'src/constants';
import { showSuccess, handleErrorResponse } from 'src/utils';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/MenuPopover';
import ConfirmDialog from 'src/components/ConfirmDialog';

export default function OrderTableRow({
  isSelected,
  id,
  status,
  orderDiscount,
  isDelivery,
  totalFee,
  selected,
  setSelected,
  getFilterOrder,
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

  const handleEdit = (idOrder) => () => {
    router.push(`/orders/edit/${idOrder}`);
  };

  const handleDeleteDetail = (idOrder) => async () => {
    try {
      setIsButtonDisabled(true);
      const urlApi = `/orders/rejectOrder/${idOrder}`;
      const resDeleteDetail = await axiosClient.patch(urlApi);
      if (resDeleteDetail.data.payload) {
        showSuccess('Hủy đơn hàng thành công');
        await getFilterOrder();
      }
      const filterSelected = selected.filter((item) => item !== idOrder);
      setSelected(filterSelected);
      setIsButtonDisabled(false);
      setIsOpenDialog(false);
      setIsOpenMenu(false);
    } catch (error) {
      handleErrorResponse(error, 'Hủy đơn hàng thất bại');
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={isSelected}>
        <TableCell padding="checkbox">
          {status !== STATUS.VALUE.REJECTED && (
            <Checkbox disableRipple checked={isSelected} onChange={handleClick} />
          )}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Link to={status !== STATUS.VALUE.REJECTED && `/orders/edit/${id}`}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle2" noWrap>
                {STATUS.CONVERT[status]}
              </Typography>
            </Stack>
          </Link>
        </TableCell>

        <TableCell>{`${numeral(orderDiscount).format('0,0')} ₫`}</TableCell>

        <TableCell>{ISDELIVERING.CONVERT[String(isDelivery)]}</TableCell>

        <TableCell>{`${numeral(totalFee).format('0,0')} ₫`}</TableCell>

        {status !== STATUS.VALUE.REJECTED ? (
          <TableCell align="right">
            <IconButton ref={anchorRef} onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell align="right" />
        )}
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
        question="Bạn xác nhận hủy đơn hàng ?"
      />
    </>
  );
}

OrderTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  isDelivery: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  orderDiscount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalFee: PropTypes.number.isRequired,
  getFilterOrder: PropTypes.func,
  handleClick: PropTypes.func,
  setSelected: PropTypes.func,
};
