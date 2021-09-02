// user input - includes validation
function TodoForm({addTodo}){
  const [value,setValue] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new item to the shopping list..."
        onChange={e => setValue(e.target.value)} />
    </form>
  )
}