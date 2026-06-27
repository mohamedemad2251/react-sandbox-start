import { useState } from "react";
import TextField from "./inputs/TextField";
import SelectField from "./inputs/SelectField";
import TextAreaField from "./inputs/TextAreaField";

function FormFieldWrapper({ children }) {
  return <div className="w-full mb-6">{children}</div>;
}

// We will create a form with "controlled" inputs.
// Controlled inputs = inputs that are handled/viewed/watched/changed by React.
// Uncontrolled inputs = inputs that are handled/viewed/watched/changed by the DOM.
// Controlling inputs have many benefits like:
// 1. Showing weak/medium/strong password states (interactive with your password)
// 2. Updating the DOM/other inputs depending on the controlled input
// 3. States will save the data even if the inputs unmount or something unexpected happen

// To control an input, you have to:
// METHOD 1:
// a. Create a state for it
// b. Put in the input field the value attribute, which sets a value. But be careful, if you didn't link the state to the value, the field becomes read-only because you forced a value and you left it as it is. React even tells you in the console's log that your field is unlinked
// c. Link the field with the state via onChange(e) => setState(e.target.value) (whenever the DOM fires that event, it should set the state)

// METHOD 2:
// a. Create a state of type object (typically named formData). That object will have every single form field/input (so one state with everchanging properties, each property would correspond to a single state in METHOD 1, check METHOD 1 to understand).
// b. Create a handleChange function (optional). That function takes the event object to set the state AGAIN (NOTE: states are immutable and cause re-rendering, that's why we set the form data again). Remember, we won't know the value of each and every property that was unchanged, so we can't hard-code it. To fix that, we'll use the rest operator (i.e. "...") to be able to "give whatever the rest of the properties were to the form data AGAIN".
// c. The only part left is that we cannot know what the "e" (i.e. event object) stand for, is it title? priority? To be able to tell, we have to set the attribute "name" per input to be able to use e.target.name which will be the linkage between the event coming from a specific input and the formData setting.

// NOTE: Both methods work and both are efficient. Because changing one individual state is the same as changing one property in a single state of type object. So it takes the same number of re-renders. Meaning: no optimization visible currently.
const NotesForm = ({ notes, setNotes }) => {
  // METHOD 1:
  //   const [title, setTitle] = useState("");
  //   const [priority, setPriority] = useState("Medium");
  //   const [category, setCategory] = useState("Work");
  //   const [description, setDescription] = useState("");

  // METHOD 2:
  const [formData, setFormData] = useState({
    title: "",
    priority: "Medium",
    category: "Work",
    description: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const priorityOptions = [
    {
      label: "🔴 High",
      value: "High",
    },
    {
      label: "🟡 Medium",
      value: "Medium",
    },
    {
      label: "🟢 Low",
      value: "Low",
    },
  ];

  const categoryOptions = [
    {
      label: "📂 Work",
      value: "Work",
    },
    {
      label: "🏠 Personal",
      value: "Personal",
    },
    {
      label: "💡 Ideas",
      value: "Ideas",
    },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Remember: The <button> is of type submit. Meaning, since it's in a form, it trigger's <form>'s onSubmit() function, which then passes control to our custom-function: handleSubmit()
  function handleSubmit(e) {
    // Prevent sending the data to the URL with parameters (default browser behavior)
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description) return;

    // Create a new note
    const newNote = {
      id: Date.now(),
      ...formData,
    };
    // Remember that we passed notes and setNotes() as callback in our props, so this will use setNotes() in the App() React Component and read notes state from that component as well.
    setNotes([newNote, ...notes]);

    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 3000);
  }

  return (
    <>
      {/* Expand/Collapse Button */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full border border-purple-200 rounded-lg p-3 cursor-pointer mb-5 hover:bg-purple-500 hover:text-white transition-[background-color_color] duration-300">
        {isExpanded ? "Close Form ❌" : "Add New Note ➕"}
      </button>
      {/* Form */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="mb-10">
          <FormFieldWrapper>
            {/* <label htmlFor="title" className="font-medium">
          Title
        </label>
        <input
          className="w-full block mt-1 border rounded-lg py-1 px-2"
          value={formData.title}
          // METHOD 1:
          //   onChange={(e) => setTitle(e.target.value)}
          // METHOD 2:
          name="title"
          onChange={handleChange}
          type="text"
          id="title"
        /> */}
            <TextField
              label={"Title"}
              name={"title"}
              value={formData.title}
              handleChange={handleChange}
            />
          </FormFieldWrapper>

          <FormFieldWrapper>
            {/* <label htmlFor="priority" className="font-medium">
          Priority
        </label>
        <select
          id="priority"
          value={formData.priority}
          // METHOD 1:
          // onChange={(e) => setPriority(e.target.value)}
          // METHOD 2:
          name="priority"
          onChange={handleChange}
          className="block w-full mt-1 border rounded-lg py-1 px-2"
        >
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select> */}
            <SelectField
              label="Priority"
              name="priority"
              value={formData.priority}
              handleChange={handleChange}
              options={priorityOptions}
            />
          </FormFieldWrapper>

          <FormFieldWrapper>
            {/* <label htmlFor="category" className="font-medium">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          // METHOD 1:
          // onChange={(e) => setCategory(e.target.value)}
          // METHOD 2:
          name="category"
          onChange={handleChange}
          className="block w-full mt-1 border rounded-lg py-1 px-2"
        >
          <option value="Work">📂 Work</option>
          <option value="Personal">🏠 Personal</option>
          <option value="Ideas">💡 Ideas</option>
        </select> */}
            <SelectField
              label="Category"
              name="category"
              value={formData.category}
              handleChange={handleChange}
              options={categoryOptions}
            />
          </FormFieldWrapper>

          <FormFieldWrapper>
            {/* <label htmlFor="description" className="font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          // METHOD 1:
          // onChange={(e) => setDescription(e.target.value)}
          // METHOD 2:
          name="description"
          onChange={handleChange}
          className="block w-full mt-1 border rounded-lg py-1 px-2"
        ></textarea> */}
            <TextAreaField
              label="Description"
              value={formData.description}
              name="description"
              handleChange={handleChange}
            />
          </FormFieldWrapper>

          <div className="w-full mt-5 flex justify-center">
            <button
              type="submit"
              className="w-[200px] text-white rounded-lg bg-purple-600 hover:bg-purple-700 p-3 cursor-pointer"
            >
              Add Note
            </button>
          </div>

          {isSubmitted && (
            <p className="mt-5 text-center text-green-600 ">
              Note added successfully!
            </p>
          )}
        </form>
      )}
    </>
  );
};

export default NotesForm;
