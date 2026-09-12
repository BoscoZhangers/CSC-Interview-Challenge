import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  // (candidates: keep an eye on what fields actually get used below)
}

const MOCK_USERS = [
  { id: 1, name: "Java Script", email: "js982411@uwaterloo.ca" },
  { id: 2, name: "C Plus Plug", email: "cpp12345@uwaterloo.ca" },
  { id: 3, name: "Doctor Racket", email: "d123racket@uwaterloo.ca" },
  { id: 4, name: "Python", email: "py059167@uwaterloo.ca" },
  { id: 5, name: "Type Script", email: "ts923789@uwaterloo.ca" },
];

function fetchUsers(query: string): Promise<User[]> {
  const latency = Math.random() * 900 + 100; // simulate variable network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const matches = MOCK_USERS.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(matches);
    }, latency);
  });
}

export default function UserDirectory() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  // Re-fetch results whenever the search query changes
  useEffect(() => {
    setLoading(true);
    fetchUsers(query).then((results) => {
      setUsers(results);
      setLoading(false);
    });
  }, [query]);

  // Ticks up every 3s to show the directory connection is "live"
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount(refreshCount + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sortAlphabetically = () => {
    users.sort((a, b) => a.name.localeCompare(b.name));
    setUsers(users);
  };

  const addFavorite = (user: User) => {
    users.push({ ...user, name: `⭐ ${user.name}` });
    setUsers(users);
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif", maxWidth: 420 }}>
      <h2>CSC Waterloo — User Directory</h2>
      <p style={{ color: "#666" }}>Live ticks: {refreshCount}</p>

      <input
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 6, marginBottom: 8 }}
      />
      <button onClick={sortAlphabetically}>Sort A–Z</button>

      {loading && <p>Loading...</p>}

      <ul>
        {users.map((user) => (
          <li>
            {user.name} — {user.email}
            <button onClick={() => addFavorite(user)} style={{ marginLeft: 8 }}>
              ★ Favorite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("TypeScript is running!");
