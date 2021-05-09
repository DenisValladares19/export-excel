import React from 'react';
import propTypes from 'prop-types';

const Column = ({ label, value }) => {
}

Column.propTypes = {
    label: propTypes.string.isRequired,
    value: propTypes.oneOfType([propTypes.string, propTypes.func]).isRequired
}

export default Column;