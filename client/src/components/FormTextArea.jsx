import React from "react";

const FormTextArea = (props) => {
  const { name, key, label, type, defaultValue, disabled, onChange, onClick } =
    props;
  return (
    <div className="w-full">
      <span className="mt-2 font-bold text-xs" htmlFor="input-field">
        {label}
      </span>
      <div className="flex items-center">
        <div className="mr-2">
          {onClick && (
            <input
              className="checkbox checkbox-xs checkbox-secondary"
              type="checkbox"
              name={name}
              onClick={onClick}
            />
          )}
        </div>
        <textarea
          className="textarea h-24 w-full"
          key={key}
          label={label}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={label}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormTextArea;
