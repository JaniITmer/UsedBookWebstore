import { useEffect, useState } from "react";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

   useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const res = await fetch("https://localhost:7122/api/books", {
          headers: { Authorization: "Bearer " + token }
        });
        if (!res.ok) {
          setError("Access denied or somethign happpened");
          return;
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("Network error");
      }
    };
    fetchBooks();
  }, []);

  return <div>{data}</div>;
}