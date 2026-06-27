const Note = ({ note, deleteNote }) => {
  return (
    <div className="relative flex flex-col gap-4 py-3 px-5 shadow-md bg-white border border-[#ccc]/40 rounded-2xl">
      <div
        className="absolute inset-0 w-2 h-full bg-red-400  rounded-l-2xl"
        style={{
          backgroundColor:
            note.priority === "Low"
              ? "oklch(72.3% 0.219 149.579)"
              : note.priority === "Medium"
                ? "oklch(85.2% 0.199 91.936)"
                : "oklch(70.4% 0.191 22.216)",
        }}
      />
      {/* Title */}
      <h3 className="font-semibold">{note.title}</h3>
      {/* Category + Priority */}
      <div className="flex flex-col">
        <p className="text-gray-500">
          <span className="font-semibold">Category:</span> {note.category}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Priority:</span> {note.priority}
        </p>
      </div>
      {/* Description */}
      <p>{note.description}</p>
      {/* Delete button */}
      <button
        onClick={() => {
          deleteNote(note);
        }}
        className="w-fit px-1 py-3 rounded-lg text-start text-red-500 cursor-pointer hover:bg-gray-300/40 transition-[background-color] duration-300"
      >
        🗑️ Delete
      </button>
    </div>
  );
};

export default Note;
