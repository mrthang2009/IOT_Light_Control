import { connect } from 'react-redux';

import { GET_COLUMN_LIST } from 'src/store/column/actionTypes';

import ColumnPage from './ColumnPage';

const mapStateToProps = (state) => ({
  loading: state.Column.loading,

  columnList: state.Column.columnList,
});

const mapDispatchToProps = (dispatch) => ({
  actionGetColumnList: (payload) =>
    dispatch({
      type: GET_COLUMN_LIST,
      payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnPage);
