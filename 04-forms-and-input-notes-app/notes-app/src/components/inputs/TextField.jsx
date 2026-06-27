const TextField = ({ label, value, name, handleChange }) => {
  return (
    <>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        className="w-full block mt-1 border rounded-lg py-1 px-2"
        value={value}
        // METHOD 1:
        //   onChange={(e) => setTitle(e.target.value)}
        // METHOD 2:
        name={name}
        onChange={handleChange}
        type="text"
        id={name}
      />
    </>
  );
};

export default TextField;
