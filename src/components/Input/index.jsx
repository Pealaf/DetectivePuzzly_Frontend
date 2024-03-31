function Input({ type, titre, value, setValue }) {
    return (
        <div>
            <label htmlFor={titre}>{titre} : </label>
            <input
                type={type}
                name={titre}
                id={titre.toLowerCase()}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
export default Input;