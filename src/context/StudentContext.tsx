import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define Address type
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

// Define Contact type
export interface Contact {
  phone: string;
  email: string;
}

// Define Student type
export interface Student {
  id: number;
  name: string;
  gender: string;
  dob: string;
  yearOfAdmission: string;
  course: string;
  address: Address;
  contact: Contact;
}

// Define the structure of the context
interface StudentContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: number) => void;
}

// Create the context with an undefined default value
const StudentContext = createContext<StudentContextType | undefined>(undefined);

// StudentProvider Component
export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);

  // Add a new student to the list
  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  // Update an existing student
  const updateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  // Delete a student by ID
  const deleteStudent = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the StudentContext
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};
