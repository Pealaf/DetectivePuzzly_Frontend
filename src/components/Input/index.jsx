import '../../styles/input.css';

function Input({ type, name, placeholder, value, setValue }) {
    return (
        <div>
            <input
                type={type}
                name={name}
                id={name.toLowerCase()}
                value={value}
                placeholder={placeholder}
                className="input"
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
            />
        </div>
    );
}
export default Input;