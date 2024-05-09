import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';

const DefaultAvatar = ({ textString }) => {
  return (
    <Avatar alt={textString} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
      {
        textString
          .split(' ') // Tách chuỗi thành một mảng các từ
          .slice(0, 2) // Chỉ lấy hai từ đầu tiên
          .map((word) => word[0]) // Lấy chữ cái đầu tiên của mỗi từ
          .join('') // Kết hợp các chữ cái lại với nhau
          .toUpperCase() // Chuyển thành chữ in hoa
      }
    </Avatar>
  );
};
DefaultAvatar.propTypes = {
  textString: PropTypes.string.isRequired,
};
export default DefaultAvatar;

// import React from 'react';
// import PropTypes from 'prop-types';

// import Avatar from 'react-avatar';

// const DefaultAvatar = ({ textString }) => {
//   return (
//     <Avatar
//       name={textString}
//       maxInitials={2}
//       size="40" // Kích thước của avatar
//       round="50%" // Bo tròn avatar
//       color="#1976d2" // Màu nền của avatar
//       textSizeRatio={2} // Tỉ lệ kích thước văn bản
//     />
//   );
// };

// DefaultAvatar.propTypes = {
//   textString: PropTypes.string.isRequired,
// };

// export default DefaultAvatar;

// import React from 'react';
// import PropTypes from 'prop-types';

// import Identicon from 'react-identicon';

// const DefaultAvatar = ({ textString }) => {
//   return <Identicon string={textString} size={40} />;
// };

// DefaultAvatar.propTypes = {
//   textString: PropTypes.string.isRequired,
// };

// export default DefaultAvatar;
