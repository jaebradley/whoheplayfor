import * as React from 'react';
import * as PropTypes from 'prop-types';
import { InferProps } from 'prop-types';

function Header({ className }: InferProps<typeof Header.propTypes>): React.ReactElement {
  return <div className={className}>The Header</div>;
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

Header.defaultProps = {
  className: '',
};

export default Header;
