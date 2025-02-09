function Button({ type, onClick, children, disabled, className }) {
  return (
    <button
      className={`${className} ${type === "primary" && "rounded-md bg-blue-900 px-4 py-2 text-gray-800 uppercase hover:bg-blue-800"} ${type === "danger" && "flex items-center space-x-2 text-red-900"} ${type === "secondary" && "flex items-center space-x-2 text-blue-900"} cursor-pointer text-sm font-medium sm:text-lg`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
