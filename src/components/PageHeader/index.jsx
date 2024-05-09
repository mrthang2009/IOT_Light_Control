import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

const PageHeader = ({ title, locationPageCreate, nameButtonCreate }) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{title}</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate(locationPageCreate)}
        >
          {nameButtonCreate}
        </Button>
      </Stack>
    </>
  );
};
PageHeader.propTypes = {
  locationPageCreate: PropTypes.string.isRequired,
  nameButtonCreate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default PageHeader;
