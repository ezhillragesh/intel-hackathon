'use client'
import React, { useState, useContext, createContext } from 'react';
import Courses from "../../comps/Courses";
// Create a new context
export const SelectedCourseContext = createContext();

function Page() {
  
  return(<>
  <Courses />
  </>)
}

export default Page;