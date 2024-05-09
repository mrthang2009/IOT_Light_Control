import React from 'react';
import { Link } from 'react-router-dom';

import { LOCATIONS } from 'src/constants';

import Meta from 'src/components/Meta';

function Pages404() {
  return (
    <div className="account-pages my-5 pt-5">
      <Meta name="404" />

      <div className="container">
        <h4 className="text-uppercase">Sorry, page not found</h4>

        <div className="mt-5 text-center">
          <Link className="btn btn-primary " to={LOCATIONS.DASHBOARD}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pages404;
