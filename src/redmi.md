function App() {
  const [work, setWork] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (work.length > 0) {
      const newTodos = [...todos];
      setTodos([...newTodos, work]);
      setWork("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleAdd();
    }
  };
  // console.log(todos);
  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={work}
          onChange={(e) => {
            setWork(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        <h3>Content</h3>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}