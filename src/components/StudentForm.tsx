import React, { useState, useEffect } from 'react';
import { useStudentContext } from '../context/StudentContext';
import { Student } from '../context/StudentContext';

interface StudentFormProps {
  editingStudent?: Student;
  onSave: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ editingStudent, onSave }) => {
  const { addStudent } = useStudentContext();

  const [formData, setFormData] = useState<Student>({
    id: Date.now(),
    name: '',
    gender: '',
    dob: '',
    yearOfAdmission: '',
    course: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    contact: {
      phone: '',
      email: '',
    },
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [key, subKey] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key as keyof Student] as object),
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      onSave(formData);
    } else {
      addStudent({ ...formData, id: Date.now() });
    }
    setFormData({
      id: Date.now(),
      name: '',
      gender: '',
      dob: '',
      yearOfAdmission: '',
      course: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
      },
      contact: {
        phone: '',
        email: '',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="yearOfAdmission"
        placeholder="Year of Admission"
        value={formData.yearOfAdmission}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address.street"
        placeholder="Street"
        value={formData.address.street}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address.city"
        placeholder="City"
        value={formData.address.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address.state"
        placeholder="State"
        value={formData.address.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address.postalCode"
        placeholder="Postal Code"
        value={formData.address.postalCode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contact.phone"
        placeholder="Phone"
        value={formData.contact.phone}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="contact.email"
        placeholder="Email"
        value={formData.contact.email}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingStudent ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default StudentForm;
