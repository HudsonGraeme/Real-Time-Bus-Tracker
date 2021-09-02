function App(){
  const [todos, setTodos] = React.useState([
    {
      text: 'Eggs',
      isCompleted: false,
      quantity: 1
    },
    {
      text: 'Walnuts',
      isCompleted: false,
      quantity: 1
    },
    {
      text: 'Apples',
      isCompleted: false,
      quantity: 2
    }
  ]);
  const [manualCopyText, setManualCopyText] = React.useState('');
  const [copyMessage, setCopyMessage] = React.useState('');
  const textAreaRef = React.useRef(null);

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false, quantity: 1 }];
    setTodos(newTodos);
  }
  const removeTodo = index => {
    let temp = [...todos];
    temp.splice(index, 1);
    setTodos(temp);
  }

  const updateTodoQuantity = (index, quantity) => {
    setTodos(todos.map((todo, i) => i === index ? { ...todo, quantity } : todo));
  }

  const copyList = () => {
    const text = todos.map(todo => `${todo.text} - ${todo.quantity}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('Successfully saved to your clipboard');
    }).catch(e => {
      setManualCopyText(text);
      setCopyMessage(`Failed to save your shopping list due to an error: ${e}`);
    }).finally(() => {
      setTimeout(() => setCopyMessage(''), 1000);
    }) ;
  }

  React.useEffect(() => {
    if (manualCopyText && textAreaRef.current) {
      textAreaRef.current.select();
      textAreaRef.current.focus();
    }
  }, [manualCopyText]);

  return(
    <div className="app">
      <h1>Yet Another Shopping List</h1>
      <h3>
        Press on an item in the list to copy it to your clipboard.
        Use the &lt; and &gt; arrows to increment or decrement item quantities and use the - to remove an item.<br/>
        Items will also be removed if the quantity is decremented to zero.
        You can use the button at the bottom of the list to copy the full list of items to your clipboard<br/>
      </h3>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list" >
        {todos.map((todo, i) => (
          <Todo key={ i } index={ i } todo={ todo } remove={ removeTodo } updateQuantity={ updateTodoQuantity }/>
        ))}
      </div>
      <button className="copy" onClick={ copyList }>
        Copy your shopping list {copyMessage && `- ${copyMessage}`}
      </button>
      <textarea ref={ textAreaRef } className={ (!manualCopyText) && 'hide' } value={ manualCopyText }>
      </textarea>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
