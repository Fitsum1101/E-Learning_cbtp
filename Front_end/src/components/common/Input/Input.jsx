const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  className = "",
  ref,
  ...rest
}) => {
  return (
    <div className="w-full mb-3">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700 capitalize"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        ref={ref}
        className={`w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
