import React from 'react';
import PropTypes from 'prop-types';

const UnitSelect = (props) => {

    return(
        <div>
            <label>Change units:
            <select onChange={props.onChange}>
                <option defaultValue value="rem">rem</option>
                <option value="em">em</option>
                <option value="px">px</option>
                <option value="vw">vw</option>
            </select>
            </label>
        </div>
    );
}

UnitSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default UnitSelect;