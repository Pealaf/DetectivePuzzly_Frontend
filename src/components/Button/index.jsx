import React from "react";

function Button({intitule, onClick, disabled=false}) {
    return (
        <button className="bouton" role="button" onClick={onClick} disabled={disabled}>{intitule}</button>
    );
}
export default Button;