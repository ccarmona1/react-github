import type { FC } from "react";
import { DynamicIcon } from "./DynamicIcon";

type NumericInputProps = {
  id: string;
  name: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  ariaLabel?: string;
};

export const NumericInput: FC<NumericInputProps> = ({
  id,
  name,
  label,
  value,
  min = 1,
  max,
  step = 1,
  onChange,
  className = "",
  labelClassName = "label-base",
  inputClassName = "input-base pr-6",
  ariaLabel,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      onChange(val);
    }
  };

  const handleStep = (direction: 1 | -1) => {
    let newValue = value + direction * step;
    if (min !== undefined) newValue = Math.max(min, newValue);
    if (max !== undefined) newValue = Math.min(max, newValue);
    onChange(newValue);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type="number"
          min={min}
          max={max}
          step={step}
          aria-label={ariaLabel || label}
          value={value}
          onChange={handleInputChange}
          className={`${inputClassName} hide-number-spin`}
        />
        <div className="numericinput-arrow-group">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Increment"
            onClick={() => handleStep(1)}
            className="numericinput-arrow-btn"
          >
            <DynamicIcon
              lib="go"
              icon="GoChevronUp"
              className="numericinput-arrow"
            />
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Decrement"
            onClick={() => handleStep(-1)}
            className="numericinput-arrow-btn"
          >
            <DynamicIcon
              lib="go"
              icon="GoChevronDown"
              className="numericinput-arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
