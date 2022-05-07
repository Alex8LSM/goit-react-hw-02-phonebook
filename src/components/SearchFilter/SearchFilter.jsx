import PropTypes from 'prop-types';
import React from 'react';
import s from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <label className={s.label}>
    Find contact <input type="text" value={value} onChange={onChange} />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
