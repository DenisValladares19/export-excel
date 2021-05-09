import React from 'react';
import propTypes from 'prop-types';
import ColumnGroup from './ColumnGroup';

const Sheet = ({ name }) => {
}

Sheet.propTypes = {
    name: propTypes.string.isRequired,
    children: propTypes.oneOf([
      propTypes.arrayOf((propValue, key) => {
        const type = propValue[key].type
        if (type !== ColumnGroup) {
          throw new Error('<Sheet> necesita tener <ColumnGroup>como hijos')
        }
      }),
      propTypes.any
    ]).isRequired
}

export default Sheet;