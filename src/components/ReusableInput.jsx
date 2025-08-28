import React from "react";

const ReusableInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  variant = "default",
  size = "default",
  label,
  error,
  className = "",
  ...props
}) => {
  // Base classes
  const baseClasses =
    "input input-bordered w-full max-w-xs transition-all duration-200";

  // Variant classes
  const variantClasses = {
    default: "border-base-300 focus:border-primary",
    primary: "border-primary focus:border-primary-focus",
    success: "border-success bg-success/10",
    error: "border-error bg-error/10",
    disabled: "opacity-60 cursor-not-allowed bg-base-200",
  };

  // Size classes
  const sizeClasses = {
    small: "input-sm text-sm",
    default: "",
    large: "input-lg text-lg",
  };

  // Combine classes
  const inputClasses = [
    baseClasses,
    variantClasses[disabled ? "disabled" : error ? "error" : variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default ReusableInput;
