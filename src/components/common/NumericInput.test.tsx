import { render, fireEvent } from "@testing-library/react";
import { NumericInput } from "./NumericInput";
import { useState } from "react";

describe("NumericInput", () => {
  it("renders with label and value", () => {
    const { getByLabelText } = render(
      <NumericInput
        id="test"
        name="test"
        label="Test"
        value={5}
        onChange={() => {}}
      />
    );
    expect(getByLabelText("Test")).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <NumericInput
        id="test"
        name="test"
        label="Test"
        value={5}
        onChange={handleChange}
      />
    );
    fireEvent.change(getByLabelText("Test"), { target: { value: "7" } });
    expect(handleChange).toHaveBeenCalledWith(7);
  });

  it("increments and decrements value with buttons", () => {
    function Wrapper() {
      const [value, setValue] = useState(5);
      return (
        <NumericInput
          id="test"
          name="test"
          label="Test"
          value={value}
          onChange={setValue}
        />
      );
    }
    const { getAllByRole, getByLabelText } = render(<Wrapper />);
    const [inc, dec] = getAllByRole("button");
    fireEvent.click(inc);
    expect((getByLabelText("Test") as HTMLInputElement).value).toBe("6");
    fireEvent.click(dec);
    expect((getByLabelText("Test") as HTMLInputElement).value).toBe("5");
  });

  it("respects min and max props", () => {
    function Wrapper() {
      const [value, setValue] = useState(1);
      return (
        <NumericInput
          id="test"
          name="test"
          label="Test"
          value={value}
          min={1}
          max={2}
          onChange={setValue}
        />
      );
    }
    const { getAllByRole, getByLabelText } = render(<Wrapper />);
    const [inc, dec] = getAllByRole("button");
    fireEvent.click(dec);
    expect((getByLabelText("Test") as HTMLInputElement).value).toBe("1");
    fireEvent.click(inc);
    expect((getByLabelText("Test") as HTMLInputElement).value).toBe("2");
    fireEvent.click(inc);
    expect((getByLabelText("Test") as HTMLInputElement).value).toBe("2");
  });
});
