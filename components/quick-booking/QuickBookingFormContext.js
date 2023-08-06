//This code exports a context object using the createContext method from the React library.
// It creates an empty context object which can be accessed by other components that import it.
// The context object will be used to share data between components in a React application.

import { createContext } from "react";

// Create a context object
const FormContext = createContext({});

// Export the context object as the default export of this module
export default FormContext;

// Export the Provider and Consumer components from the context object
export const { Provider, Consumer } = FormContext;

