import { useState, useEffect } from "react";
import api from "../../api";
import "./Styles.css";

function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/pegar");
      setBooks(response.data[0]);
      console.log('vinicius')
      console.log(response)
    } catch (error) {
      console.error(`Erro ao buscar dados: ${error}`);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editing) {
        await api.put(`/updateItem/${editing.id}`, { title, author });

        setEditing(null);
      } else {
        await api.post("/insertItem", { title, author });

        setEditing(null);
      }

      setTitle("");
      setAuthor("");
      fetchBooks();
    } catch (error) {
      console.error("Erro ao inserir/atualizar dados: ", error);
    }
  }

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditing(book);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/deleteItem/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Erro ao excluir dados: ", error);
    }
  };

  return (
    <>
      <h1>{editing ? "Editar Item" : "Inserir Novo Item"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Livro:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Autor:</label>

          <input type="text" value={author}onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">{editing ? "Atualizar" : "Inserir"}</button>
        {editing && (
          <button type="button" onClick={() => setEditing(null)}>
            Cancelar
          </button>
        )}
      </form>
      <h1>Tabela de Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button onClick={() => handleEdit(book)}>Editar</button>
                                <button onClick={() => handleDelete(book.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </>
  );
}

export default Home;
