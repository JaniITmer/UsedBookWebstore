import { useEffect, useState } from "react";
import "./styles/Books.css"

function MyBooks({ token }) {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [formData, setFormData] = useState({ title: "", author: "" ,price:"" , currency:""});

  useEffect(() => {
    fetch("https://localhost:7122/api/books/mybooks", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, [token]);

  const startEditing = (book) => {
    setEditingBookId(book.id);
    setFormData({ title: book.title, author: book.author,price: book.price ,currency: book.currency  });
  };

   const cancelEditing = () => {
    setEditingBookId(null);
    setFormData({ title: "", author: "" ,price: "",currency: ""  });
  };

   const saveBook = async (id) => {
    try {
      const res = await fetch(`https://localhost:7122/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Szerkesztés sikertelen");

      const updatedBook = await res.json();

      setBooks(books.map(b => (b.id === id ? updatedBook : b)));
      setEditingBookId(null);
    } catch (err) {
      console.error(err);
    }
  };

   return (
   <div className="books-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          {editingBookId === book.id ? (
            <>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
             
                <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
             <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                required
              >
                <option value="EUR">EUR (€)</option>
                <option value="HUF">HUF (Ft)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>

              <div className="book-actions">
                <button onClick={() => saveBook(book.id)}>💾 Save</button>
                <button onClick={cancelEditing}>❌ Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>
  {book.price}{" "}
  {book.currency === "EUR" && "EUR (€)"}
  {book.currency === "HUF" && "HUF (Ft)"}
  {book.currency === "USD" && "USD ($)"}
  {book.currency === "GBP" && "GBP (£)"}
</p>
              <button onClick={() => startEditing(book)}>✏️ Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBooks;