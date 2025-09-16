import { useEffect, useState } from "react";
import "./styles/Books.css"

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
          setError("Access denied or something other happened.");
          return;
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("Network error.");
      }
    };
    fetchBooks();
  }, [token]);

  if (error) return <p>{error}</p>;
  if (books.length === 0) return <p>No books.</p>;

   return (
  <div className="books-grid">
  {books.map((book) => (
    <div key={book.id} className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.price} {book.currency}</p>
      
    </div>
  ))}
</div>
  );
}