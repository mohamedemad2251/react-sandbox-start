const TextAreaField = ({ label, name, value, handleChange }) => {
  return (
    <>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <textarea
        id={name}
        value={value}
        // METHOD 1:
        // onChange={(e) => setDescription(e.target.value)}
        // METHOD 2:
        name={name}
        onChange={handleChange}
        className="block w-full mt-1 border rounded-lg py-1 px-2"
      ></textarea>
    </>
  );
};

export default TextAreaField;
