// Data mutations are done through Route actions. When the action completes, all loader data on the page is revalidated to keep your UI in sync with the data without writing any code to do it.

import { Form } from "react-router";
import type { Route } from "./+types";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Route actions defined with action are only called on the server while actions defined with clientAction are run in the browser.

// 1. Client Actions
// Client actions only run in the browser and take priority over a server action when both are defined.

// 2. Server Actions
// Server actions only run on the server and are removed from client bundles.

// Same as loaders, you can use action() (request: Route.ActionArgs) (server-side) here for mutation (i.e. post, put & delete)
// For client-side, we use clientAction() (request: Route.ClientActionArgs)
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Record is a utility type that dictates the variable is an object holding as many properties as you want (not strict) BUT the keys (first generic type) must be string in our case and values must also be string.
  // Here, errors is empty first-hand but it will be populated with validations
  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Incorrect email format.";
  }
  if (!subject) errors.subject = "Subject is required.";
  if (!message) errors.message = "Message is required.";

  // Errors are sent first. Using Object's keys() method, it gets the keys as string[] to be able to get the length (because if the length = 0, no errors found, else, we will show the data object instead).
  if (Object.keys(errors).length > 0) return { errors };

  const data = {
    name,
    email,
    subject,
    message,
  };

  return { success: "Form submitted successfully", data };
}

// We can show the data we submitted here (using {actionData}: Route.ComponentProps)
const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData && actionData.errors ? actionData.errors : {};

  const success = actionData?.success;
  const data = actionData?.data;
  return (
    <section className="max-w-3xl bg-gray-900 rounded p-5 mx-auto">
      <h1 className="text-3xl font-bold text-center">📪 Contact</h1>
      {success && (
        <p className="bg-green-700 border border-green-500 text-green-100 shadow-md text-center rounded p-2 mt-4">
          {success}
        </p>
      )}
      <Form method="post" className="w-full flex flex-col gap-5 mt-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="bg-gray-800 border border-gray-600 rounded-lg p-2"
          />
          {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-800 border border-gray-600 rounded-lg p-2"
          />
          {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}

        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="bg-gray-800 border border-gray-600 rounded-lg p-2"
          />
          {errors.subject && <p className="text-sm text-red-400 mt-1">{errors.subject}</p>}

        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message</label>
          <textarea
            rows={4}
            name="message"
            id="message"
            className="bg-gray-800 border border-gray-600 rounded-lg p-2"
          />
          {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message}</p>}

        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors p-2"
        >
          Submit
        </button>
      </Form>
    </section>
  );
};

export default ContactPage;
