import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookDetails({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://localhost:7122/api/books/${id}`,  {
          headers: { Authorization: "Bearer " + token },
        });
        if (!res.ok) {
          setError("Book not found or access denied.");
          return;
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
        setError("Network error.");
      }
    };
    fetchBook();
  }, [id, token]);

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> {book.price} {book.currency}</p>
      <p><strong>Description:</strong></p>
      <p>{book.description}</p>
    </div>
  );
}