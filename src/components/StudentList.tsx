import React, { useState } from 'react';
import { useStudentContext } from '../context/StudentContext';
import { Student } from '../context/StudentContext';
import StudentForm from './StudentForm';

const StudentList: React.FC = () => {
  const { students, deleteStudent } = useStudentContext() as {
    students: Student[];
    deleteStudent: (id: number) => void;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'name' | 'course' | 'yearOfAdmission'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const studentsPerPage = 5;

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.yearOfAdmission.includes(searchTerm)
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const fieldA = a[sortField].toString().toLowerCase();
    const fieldB = b[sortField].toString().toLowerCase();

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="student-list">
      <h2>Student List</h2>

      {/* Search Input */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by Name, Course, or Year of Admission"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort Buttons */}
      <div className="sort-buttons">
        <button onClick={() => setSortField('name')}>Sort by Name</button>
        <button onClick={() => setSortField('course')}>Sort by Course</button>
        <button onClick={() => setSortField('yearOfAdmission')}>Sort by Year</button>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Toggle Order ({sortOrder})
        </button>
      </div>
    
      {/* Student List */}
      <ul className="student-list-container">
        {currentStudents.map((student) => (
          <li key={student.id}>
            <div>
              {student.name} - {student.course} ({student.yearOfAdmission})
            </div>
            <div className="action-buttons">
              <button onClick={() => setEditingStudent(student)}>Update</button>
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            disabled={i + 1 === currentPage}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Update Form */}
      {editingStudent && (
        <StudentForm
          editingStudent={editingStudent}
          onSave={(updatedStudent) => {
            setEditingStudent(null); // Close the form after updating
          }}
        />
      )}
    </div>
  );
};

export default StudentList;
