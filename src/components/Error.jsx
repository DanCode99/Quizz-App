// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

export default function Error(props) {
    return (
        <div className="error-container">
            <h1>
                It looks like we had a mistake<br/>try another combination of questions
            </h1>
            <div className="gears" id="two-gears">
                <div className="gears-container">
                    <div className="gear-rotate"></div>
                    <div className="gear-rotate-left"></div>
                </div>
            </div>
            <button onClick={props.handleReset}>Try again</button>
        </div>
    );
}

Error.propTypes = {
    handleReset: PropTypes.func.isRequired,
};

