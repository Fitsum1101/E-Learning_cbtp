const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
  ...rest
}) => {
  const base =
    "px-4 py-2 rounded text-white font-semibold transition duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
    danger: "bg-red-600 hover:bg-red-700",
    outline:
      "bg-transparent border border-gray-300 text-black hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
