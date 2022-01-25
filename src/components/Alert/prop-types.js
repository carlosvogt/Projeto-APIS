import PropTypes from 'prop-types';

export const defaultAlertProps = {
  autoHide: true,
  visible: true,
  onHide: () => {},
};

export default {
  message: PropTypes.string.isRequired,
  autoHide: PropTypes.bool,
  visible: PropTypes.bool,
  iconName: PropTypes.string,
  onHide: PropTypes.func,
};
