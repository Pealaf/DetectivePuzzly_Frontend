function Input({ type, name, label, value, setValue }) {
    return (
        <div>
            <label htmlFor={name}>{label} : </label>
            <input
                type={type}
                name={name}
                id={name.toLowerCase()}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
export default Input;