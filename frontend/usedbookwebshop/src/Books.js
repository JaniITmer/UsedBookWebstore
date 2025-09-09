import { useEffect, useState } from "react";

export default function Books({ token }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://localhost:7122/api/books", {
          headers: { Authorization: "Bearer " + token }
        });
        if (!res.ok) {
          setError("Hozzáférés megtagadva vagy hiba történt.");
          return;
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("Hálózati hiba történt.");
      }
    };
    fetchBooks();
  }, [token]);

  if (error) return <p>{error}</p>;
  if (books.length === 0) return <p>No books.</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} – {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}