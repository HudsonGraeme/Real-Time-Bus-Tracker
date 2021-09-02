function Todo({ todo, index, remove, updateQuantity }) {

  function deleteMe() {
    remove(index);
  }

  function copyMe() {
  navigator.clipboard.writeText(`${todo.quantity} - ${todo.text}`)
  }

  function increment() {
    updateQuantity(index, todo.quantity += 1);
  }

  function decrement() {
    if (todo.quantity <= 1) {
      deleteMe();
      return;
    }
    updateQuantity(index, todo.quantity -= 1);
  }

  return <div className="todo" onClick={ copyMe }>
    { todo.text }
    <div className="counter">
      <span className="small">Quantity</span>
      <button onClick={ decrement } className={ `crement ${todo.quantity <= 1 && 'redhover'}` }>
      { todo.quantity <= 1 ? '-' : '<' }
    </button>
      { todo.quantity }
    <button onClick={ increment } className="crement">
      &gt;
      </button>
      <button onClick={ deleteMe } className="delete redhover">
        -
      </button>
    </div>
  </div>
}
