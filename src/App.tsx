import React from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Student Management System</h1>
      <StudentForm />
      <StudentList />
    </div>
  );
};

export default App;
