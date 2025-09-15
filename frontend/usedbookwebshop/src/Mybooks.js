import { useEffect, useState } from "react";
import "./styles/Books.css"

function MyBooks({ token }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7122/api/books/mybooks", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Hiba a lekérésnél");
        return res.json();
      })
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, [token]);

   return (
  <div className="books-grid">
  {books.map((book) => (
    <div key={book.id} className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  ))}
</div>
  );
}

export default MyBooks;