import { useState } from "react";

function AddBook({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://localhost:7122/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, author ,price, currency})
    });

    if (res.ok) {
      const addedBook = await res.json();
      alert(`New book added successful: ${addedBook.title}`);
      setTitle("");
      setAuthor("");
      setPrice("");
      setCurrency("");
    } else {
      alert("Something wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new book for sale</h2>
      <div>
      <input 
        type="text" 
        placeholder="Book title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      </div>
      <div>
      <input 
        type="text" 
        placeholder="Book language" 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)} 
        required 
      />
      </div>
      <div>
      <input 
        type="text" 
        placeholder="Author of the book" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
        required 
      />
      </div>
       <div>
     <textarea id="description" name="description" rows="4" cols="50">Description</textarea>
      </div>
      <div>
      <input 
        type="number" 
        step="0.01"
        placeholder="Price of the book" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        required 
      />
      
      <select 
        value={currency} 
        onChange={(e) => setCurrency(e.target.value)}
        required
      >
        
        <option value="EUR">EUR (€)</option>
        <option value="HUF">HUF (Ft)</option>
        <option value="USD">USD ($)</option>
        <option value="GBP">GBP (£)</option>
      </select>
      </div>
      
      
      <button type="submit">Sell</button>

      
    </form>
  );
}

export default AddBook;
