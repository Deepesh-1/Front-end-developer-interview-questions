// We need to import useEffect to use it

import { useState, useEffect } from "react";

// useEffect runs on every render. 

  useEffect(() => {
    //Runs on every render
  });

// Runs only on the first render by passing an empty array:

  useEffect(() => {
    //Runs only on the first render
  }, []);

// Runs on the first render and any time any dependency value changes. Props or state values:

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
  }, [prop, state]);

// If there are multiple dependencies, they should be included in the useEffect dependency array.
