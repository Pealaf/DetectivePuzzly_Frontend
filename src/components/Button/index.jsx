import React from "react";

function Button({ intitule, onClick }) {
    return (
        <button className="bouton" role="button" onClick={onClick}>{intitule}</button>
    );
}
export default Button;