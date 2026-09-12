import React, { useState, useEffect } from "react";
import "./UserDirectory.css";
import { getPeople, addPerson, removePerson } from "./DirectoryAPI.ts";
import type { Person, Role, Status } from "./DirectoryAPI.ts";

const FACULTIES = ["Mathematics", "Engineering", "Science", "Arts", "Environment", "Health"];

const STATUS_OPTIONS: Record<Role, Status[]> = {
  "Undergraduate Student": ["Study Term", "Co-op"],
  "Graduate Student": ["Study Term", "Co-op"],
  "Faculty Staff": ["Teaching", "Research"],
};

export default function UserDirectory() {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [newName, setNewName] = useState("");
  const [newFaculty, setNewFaculty] = useState(FACULTIES[0]);
  const [newRole, setNewRole] = useState<Role>("Undergraduate Student");
  const [newStatus, setNewStatus] = useState<Status>("Study Term");

  // Fetch from the "server" whenever the search query changes
  useEffect(() => {
    setLoading(true);
    getPeople(query).then((results) => {
      setPeople(results);
      setLoading(false);
    });
  }, [query]);

  // Keep a running summary of how many people are currently loaded
  useEffect(() => {
    setStatusMessage(
      `${people.length} ${people.length === 1 ? "person" : "people"} in the directory`
    );
  }, []);

  const handleRoleChange = (role: Role) => {
    setNewRole(role);
    setNewStatus(STATUS_OPTIONS[role][0]);
  };

  const handleAddPerson = () => {
    if (!newName.trim()) return;
    addPerson({
      watIAMId: newName.toLowerCase().replace(/\s+/g, "").slice(0, 6) + Math.floor(Math.random() * 90 + 10),
      name: newName.trim(),
      faculty: newFaculty,
      role: newRole,
      status: newStatus,
    }).then((created) => {
      setPeople([...people, created]);
      setNewName("");
    });
  };

  const handleRemovePerson = (id: number) => {
    removePerson(id).then(() => {
      const index = people.findIndex((p) => p.id === id);
      people.splice(index, 1);
      setPeople(people);
    });
  };

  return (
    <div className="directory">
      <header className="directory-header">
        <h1>CSC Directory</h1>
        <p className="subtitle">Search and manage the Waterloo CS roster</p>
      </header>

      <div className="controls">
        <input
          className="search-input"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPerson();
        }}
      >
        <input
          placeholder="Full name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <select value={newFaculty} onChange={(e) => setNewFaculty(e.target.value)}>
          {FACULTIES.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <select value={newRole} onChange={(e) => handleRoleChange(e.target.value as Role)}>
          {(Object.keys(STATUS_OPTIONS) as Role[]).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as Status)}>
          {STATUS_OPTIONS[newRole].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="submit">Add person</button>
      </form>

      {loading && <p className="loading">Searching…</p>}

      <table className="directory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>WatIAM</th>
            <th>Faculty</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr>
              <td>{person.name}</td>
              <td>{person.watIAMId}</td>
              <td>{person.faculty}</td>
              <td>
                <span className={`badge role-${person.role.split(" ")[0].toLowerCase()}`}>
                  {person.role}
                </span>
              </td>
              <td>
                <span className={`badge status-${person.status.toLowerCase().replace(" ", "-")}`}>
                  {person.status}
                </span>
              </td>
              <td>
                <button className="remove-btn" onClick={() => handleRemovePerson(person.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="status-message">{statusMessage}</p>
    </div>
  );
}