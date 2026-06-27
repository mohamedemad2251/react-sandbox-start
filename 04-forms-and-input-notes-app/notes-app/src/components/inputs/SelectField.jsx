const SelectField = ({ label, value, name, handleChange, options }) => {
  return (
    <>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <select
        id={name}
        value={value}
        // METHOD 1:
        // onChange={(e) => setPriority(e.target.value)}
        // METHOD 2:
        name={name}
        onChange={handleChange}
        className="block w-full mt-1 border rounded-lg py-1 px-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectField;
