// [ DirectoryAPI.ts ]

// A tiny in-memory "database" that behaves like a real backend: every
// operation returns a Promise and takes a random amount of time to
// resolve, the same way a real network request would. The component that
// uses this module should never touche `records` directly, it only calls these
// three functions and works with the Promises they return.

export type Role = "Undergraduate Student" | "Graduate Student" | "Faculty Staff";
export type StudentStatus = "Study Term" | "Co-op";
export type FacultyStatus = "Teaching" | "Research";
export type Status = StudentStatus | FacultyStatus;

export const FACULTIES = ["Mathematics", "Engineering", "Science", "Arts", "Environment", "Health"] as const;
export type Faculty = typeof FACULTIES[number];

export const STATUS_OPTIONS: Record<Role, Status[]> = {
  "Undergraduate Student": ["Study Term", "Co-op"],
  "Graduate Student": ["Study Term", "Co-op"],
  "Faculty Staff": ["Teaching", "Research"],
};

export interface Person {
  id: number;
  watIAMId: number;
  name: string;
  faculty: Faculty;
  role: Role;
  status: Status;
}

export type NewPerson = Omit<Person, "id">; // Person but without the "id" field.

// "Database" itself (module-private) 
let records: Person[] = [
  { id: 21121001, watIAMId: "achen21", name: "Alice Chen", faculty: "Mathematics", role: "Undergraduate Student", status: "Co-op" },
  { id: 21121002, watIAMId: "bkhan22", name: "Bilal Khan", faculty: "Engineering", role: "Undergraduate Student", status: "Study Term" },
  { id: 21121003, watIAMId: "cwei20g", name: "Chen Wei", faculty: "Mathematics", role: "Graduate Student", status: "Co-op" },
  { id: 21121004, watIAMId: "dosei23", name: "Diana Osei", faculty: "Science", role: "Graduate Student", status: "Study Term" },
  { id: 21121005, watIAMId: "epark", name: "Ethan Park", faculty: "Mathematics", role: "Faculty Staff", status: "Teaching" },
  { id: 21121006, watIAMId: "fahmed", name: "Fatima Ahmed", faculty: "Engineering", role: "Faculty Staff", status: "Research" },
  { id: 21121007, watIAMId: "gliu24", name: "Grace Liu", faculty: "Arts", role: "Undergraduate Student", status: "Study Term" },
  { id: 21121008, watIAMId: "hosei", name: "Henry Osei", faculty: "Science", role: "Faculty Staff", status: "Teaching" },
];

let nextId = 21121000 + records.length + 1;

// Template function wraps return value in a promise.
function networkDelay<T>(value: T): Promise<T> {
  const latency = Math.random() * 900 + 100; // 100–1000 ms delay using RNG
  return new Promise((resolve) => setTimeout(() => resolve(value), latency));
}

// ########################  MOCK API  ########################

/** GET /people?search=query */
export async function getPeople(query: string = ""): Promise<Person[]> {
  // [ IMPLEMENTATION BELOW THIS LINE ]


  return networkDelay(/* [ FILL IN ] */);
}

/** POST /people */
export function addPerson(input: NewPerson): Promise<Person> {
  const person: Person = { ...input, id: nextId++ };
  records = [...records, person];
  return networkDelay(person);
}

/** DELETE /people/:id */
export function removePerson(id: number): Promise<void> {
  // [ IMPLEMENTATION BELOW THIS LINE ]


  return networkDelay(/* [ FILL IN ] */);
}