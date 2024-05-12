import React from "react";

function Button({intitule, classe="", onClick, disabled=false}) {
    return (
        <button className={"bouton " + classe} role="button" onClick={onClick} disabled={disabled}>{intitule}</button>
    );
}
export default Button;