import React from "react";

function Button({ intitule, onClick }) {
    return (
        <button onClick={onClick}>{intitule}</button>
    );
}
export default Button;