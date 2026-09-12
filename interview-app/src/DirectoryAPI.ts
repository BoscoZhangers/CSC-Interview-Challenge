// ############################ [ DO NOT MODIFY ] ############################

// A tiny in-memory "database" that behaves like a real backend: every
// operation returns a Promise and takes a random amount of time to
// resolve, the same way a real network request would. The component that
// uses this module should never touche `records` directly, it only calls these
// three functions and works with the Promises they return.

export type Role = "Undergraduate Student" | "Graduate Student" | "Faculty Staff";
export type StudentStatus = "Study Term" | "Co-op";
export type FacultyStatus = "Teaching" | "Research";
export type Status = StudentStatus | FacultyStatus;

export interface Person {
  id: number;
  watIAMId: number;
  name: string;
  faculty: string;
  role: Role;
  status: Status;
}

export type NewPerson = Omit<Person, "id">; // Person but without the "id" field.

// "Database" itself (module-private) 
let records: Person[] = [
  { id: 1, watIAMId: "achen21", name: "Alice Chen", faculty: "Mathematics", role: "Undergraduate Student", status: "Co-op" },
  { id: 2, watIAMId: "bkhan22", name: "Bilal Khan", faculty: "Engineering", role: "Undergraduate Student", status: "Study Term" },
  { id: 3, watIAMId: "cwei20g", name: "Chen Wei", faculty: "Mathematics", role: "Graduate Student", status: "Co-op" },
  { id: 4, watIAMId: "dosei23", name: "Diana Osei", faculty: "Science", role: "Graduate Student", status: "Study Term" },
  { id: 5, watIAMId: "epark", name: "Ethan Park", faculty: "Mathematics", role: "Faculty Staff", status: "Teaching" },
  { id: 6, watIAMId: "fahmed", name: "Fatima Ahmed", faculty: "Engineering", role: "Faculty Staff", status: "Research" },
  { id: 7, watIAMId: "gliu24", name: "Grace Liu", faculty: "Arts", role: "Undergraduate Student", status: "Study Term" },
  { id: 8, watIAMId: "hosei", name: "Henry Osei", faculty: "Science", role: "Faculty Staff", status: "Teaching" },
];

let nextId = records.length + 1;

// Template function wraps return value in a promise.
function networkDelay<T>(value: T): Promise<T> {
  const latency = Math.random() * 900 + 100; // 100–1000 ms delay using RNG
  return new Promise((resolve) => setTimeout(() => resolve(value), latency));
}

// ########################  MOCK API  ########################

/** GET /people?search=query */
export function getPeople(query: string = ""): Promise<Person[]> {
  const q = query.trim().toLowerCase();
  const results = records.filter((p) => p.name.toLowerCase().includes(q));
  return networkDelay(results);
}

/** POST /people */
export function addPerson(input: NewPerson): Promise<Person> {
  const person: Person = { ...input, id: nextId++ };
  records = [...records, person];
  return networkDelay(person);
}

/** DELETE /people/:id */
export function removePerson(id: number): Promise<void> {
  records = records.filter((p) => p.id !== id);
  return networkDelay(undefined);
}