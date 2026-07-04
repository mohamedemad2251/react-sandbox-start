import { useState } from "react";
import { useRef } from "react";
import Timer from "./components/Timer";

// Inputs & useRef() Example:
// function App() {
//   // Deep dive into useRef():
//   // useRef() = Creating a reference element in React that does NOT cause a re-render. It persists its data as long as the property ".current" is not changed. However, the reference itself is immutable.

//   // This is very useful in two particular scenarios:
//   // 1- Referencing a DOM element (i.e. like how document.querySelector() works)
//   // 2- Persisting data that won't cause a re-render (intentional)

//   // You might wonder why not just use document.querySelector() instead of referencing the element via useRef(). Here are the reasons:
//   // 1- querySelector() will force the code to look for the element you need in the entire document. That is done on the DOM level and that means you're not longer inside the component you're in. Meaning, you search the entire document which is inefficient. Meanwhile, searching on a local scope (i.e. an element in the component itself) is more efficient.
//   // 2- ref={} automatically makes React assign the element to the useRef() you want. This is very targetted and efficient. Even if the hierarchy of the components change (example: form -> modal becomes form -> something -> modal), there won't be any issues since it's local scope.
//   // 3- This will keep React in sync. Sure, it doesn't watch the element since it's useRef(), but it keeps tabs when it comes to how the reference becomes.

//   // useRef() elements are immutable. However, they are objects with a single property: current.
//   // It is important to note that ref.current is mutable (i.e. can be changed)
//   // The reason why .current was created is because React likes its states/refs immutable. However, for refs, we don't want to cause a re-render. React re-renders only when the component changes. In its eyes, the component object still references the same thing (even if content changes). Example, a variable named x is still the same x if the value is 1 or 2 or 5 or 1005, etc.

//   // Technically, we COULD change a state without causing a re-render if we have a state OBJECT and we change its properties.
//   // Example:
//   // const [user, setUser] = useState({name: "Mohamed"})
//   // user.name = "Hassan" (no re-render occurs)
//   // Although this is possible, it's not advised. It should use setState({name: "Hassan"}) because that would trigger a re-render.
//   // Cleanly, if you would need to persist a value or change it without re-rendering, useRef() instead.
//   const inputRef = useRef(null);
//   function submit() {
//     console.log(inputRef.current.value);
//     // We can now manipulate the DOM element "inputRef" via the reference:
//     inputRef.current.placeholder = "Updated..";
//     inputRef.current.focus();
//     inputRef.current.style.backgroundColor = "blue";
//     inputRef.current.style.color = "white";
//   }
//   return (
//     <main className="w-screen h-screen flex justify-center items-center">
//       <div className="w-100 flex flex-col items-center gap-5 p-5 bg-[#e0e0e0] rounded-3xl shadow-lg">
//         <h1 className="font-bold text-3xl text-center">useRef() Example</h1>
//         <input
//           ref={inputRef}
//           type="text"
//           className="w-full bg-white rounded-lg p-2"
//         />
//         <button
//           onClick={submit}
//           className="w-25 bg-blue-500 text-white rounded-lg py-2 px-4 cursor-pointer hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </div>
//     </main>
//   );
// }

// Timer App (Actual Project)
function App() {

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Timer/>
    </main>
  );
}

export default App;
