import React from 'react';
import propTypes from 'prop-types';
import Column from './Column';

const ColumnGroup = ({ title, data, children }) => {
}

ColumnGroup.propTypes = {
    title: propTypes.string.isRequired,
    data: propTypes.array.isRequired,
    children: propTypes.arrayOf((propValue, key) => {
        const type = propValue[key];
        if (type !== Column) {
            //throw new Error('<ColumnGroup /> necesita tener componentes <Column /> como hijos')
        }
    }).isRequired
}

export default ColumnGroup;