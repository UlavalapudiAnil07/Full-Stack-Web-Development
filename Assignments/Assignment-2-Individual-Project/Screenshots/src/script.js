
const { useState, useMemo } = React;

const initialStudents = [
  {
    studentId: "STU001",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    department: "CSE",
    year: "3rd Year",
    status: "Active"
  },
  {
    studentId: "STU002",
    name: "Rahul Varma",
    email: "rahul.varma@example.com",
    department: "CSM",
    year: "3rd Year",
    status: "Active"
  },
  {
    studentId: "STU003",
    name: "Priya Reddy",
    email: "priya.reddy@example.com",
    department: "ECE",
    year: "2nd Year",
    status: "Active"
  },
  {
    studentId: "STU004",
    name: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    department: "IT",
    year: "4th Year",
    status: "Graduated"
  },
  {
    studentId: "STU005",
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    department: "CSE",
    year: "1st Year",
    status: "Active"
  },
  {
    studentId: "STU006",
    name: "Karthik Rao",
    email: "karthik.rao@example.com",
    department: "EEE",
    year: "2nd Year",
    status: "Inactive"
  },
  {
    studentId: "STU007",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    department: "CSM",
    year: "4th Year",
    status: "Active"
  },
  {
    studentId: "STU008",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    department: "Mechanical",
    year: "3rd Year",
    status: "Active"
  }
];

const emptyForm = {
  name: "",
  email: "",
  department: "CSE",
  year: "3rd Year",
  status: "Active"
};

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const activeCount = students.filter(
    s => s.status === "Active"
  ).length;

  const graduatedCount = students.filter(
    s => s.status === "Graduated"
  ).length;

  const departments = [
    ...new Set(students.map(s => s.department))
  ].sort();

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase();

    return students.filter(student => {
      const matchesSearch = [
        student.studentId,
        student.name,
        student.email,
        student.department
      ].some(value =>
        value.toLowerCase().includes(query)
      );

      const matchesDepartment =
        department === "All Departments" ||
        student.department === department;

      const matchesStatus =
        status === "All Status" ||
        student.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [students, search, department, status]);

  function notify(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  }

  function openAddForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  }

  function openEditForm(student) {
    setEditingId(student.studentId);
    setForm({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      status: student.status
    });
    setShowForm(true);
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingId) {
      setStudents(previous =>
        previous.map(student =>
          student.studentId === editingId
            ? { ...student, ...form }
            : student
        )
      );

      notify("Student updated successfully!");
    } else {
      const maxId = Math.max(
        0,
        ...students.map(student =>
          Number(student.studentId.replace(/\D/g, "")) || 0
        )
      );

      const newStudent = {
        ...form,
        studentId: "STU" + String(maxId + 1).padStart(3, "0")
      };

      setStudents(previous => [
        ...previous,
        newStudent
      ]);

      notify("Student added successfully!");
    }

    setShowForm(false);
    setForm({ ...emptyForm });
  }

  function deleteStudent(studentId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    setStudents(previous =>
      previous.filter(student =>
        student.studentId !== studentId
      )
    );

    notify("Student deleted successfully!");
  }

  function initials(name) {
    return name
      .split(" ")
      .map(word => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  const colors = [
    ["#e8efff", "#4263eb"],
    ["#ffe9e2", "#d66a45"],
    ["#e3f7ef", "#168568"],
    ["#f6e8ff", "#8b4bc2"],
    ["#fff1cf", "#b7791f"]
  ];

  function getColor(studentId) {
    const number = Number(
      studentId.replace(/\D/g, "")
    ) || 1;

    return colors[number % colors.length];
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✦</span>
          <span>Campus<span className="blue">Desk</span></span>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <button className="nav-item active">
          <span>▦</span> Dashboard
        </button>

        <button
          className="nav-item"
          onClick={() => {
            setSearch("");
            setDepartment("All Departments");
            setStatus("All Status");
          }}
        >
          <span>♙</span> Students
        </button>

        <button
          className="nav-item"
          onClick={() => setDepartment("All Departments")}
        >
          <span>▤</span> Departments
        </button>

        <div className="sidebar-bottom">
          <strong>CampusDesk Demo</strong>
          <p>Student records made simple.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">OVERVIEW / STUDENTS</p>
            <h1>Student Management</h1>
            <p className="subtitle">
              Manage your students and records in one place.
            </p>
          </div>

          <div className="profile">
            <div className="admin-avatar">AD</div>
            <div>
              <strong>Admin User</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-label">Total Students</div>
            <div className="stat-icon purple">♙</div>
            <h2>{students.length}</h2>
            <p>All student records</p>
          </div>

          <div className="stat-card">
            <div className="stat-label">Active Students</div>
            <div className="stat-icon green">✓</div>
            <h2>{activeCount}</h2>
            <p>Currently active</p>
          </div>

          <div className="stat-card">
            <div className="stat-label">Departments</div>
            <div className="stat-icon orange">▤</div>
            <h2>{departments.length}</h2>
            <p>Academic departments</p>
          </div>

          <div className="stat-card">
            <div className="stat-label">Graduated</div>
            <div className="stat-icon pink">✧</div>
            <h2>{graduatedCount}</h2>
            <p>Completed studies</p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>All Students</h2>
              <p>View and manage student records</p>
            </div>

            <button className="primary-btn" onClick={openAddForm}>
              + Add Student
            </button>
          </div>

          <div className="toolbar">
            <input
              className="search"
              type="search"
              placeholder="Search name, email, ID..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />

            <select
              value={department}
              onChange={event => setDepartment(event.target.value)}
            >
              <option>All Departments</option>
              {departments.map(dept => (
                <option key={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Graduated</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map(student => {
                  const color = getColor(student.studentId);

                  return (
                    <tr key={student.studentId}>
                      <td>
                        <div className="student-info">
                          <div
                            className="student-avatar"
                            style={{
                              background: color[0],
                              color: color[1]
                            }}
                          >
                            {initials(student.name)}
                          </div>

                          <div>
                            <strong>{student.name}</strong>
                            <small>{student.email}</small>
                          </div>
                        </div>
                      </td>

                      <td className="student-id">
                        {student.studentId}
                      </td>

                      <td>
                        <span className="department-tag">
                          {student.department}
                        </span>
                      </td>

                      <td>{student.year}</td>

                      <td>
                        <span className={
                          "status " + student.status
                        }>
                          {student.status}
                        </span>
                      </td>

                      <td>
                        <div className="actions">
                          <button
                            className="icon-btn"
                            title="Edit"
                            onClick={() => openEditForm(student)}
                          >
                            ✎
                          </button>

                          <button
                            className="icon-btn delete-btn"
                            title="Delete"
                            onClick={() =>
                              deleteStudent(student.studentId)
                            }
                          >
                            ⌫
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty">
                      No students found. Try another search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Showing {filteredStudents.length} of {students.length} students
            <span>Sample data</span>
          </div>
        </section>
      </main>

      {showForm && (
        <div
          className="overlay"
          onMouseDown={event => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2>
                {editingId ? "Edit Student" : "Add New Student"}
              </h2>
              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field full">
                  <label>Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                  />
                </div>

                <div className="field full">
                  <label>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    required
                  />
                </div>

                <div className="field">
                  <label>Department</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    {[
                      "CSE", "CSM", "IT", "ECE",
                      "EEE", "Mechanical", "Civil"
                    ].map(dept => (
                      <option key={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Academic Year</label>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                  >
                    {[
                      "1st Year", "2nd Year",
                      "3rd Year", "4th Year", "Alumni"
                    ].map(year => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="field full">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Graduated</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {editingId ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {message && <div className="toast">{message}</div>}
    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(<App />);

