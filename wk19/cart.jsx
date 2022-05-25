// simulate getting products from DataBase
const products = [
  { name: 'Apples', country: 'Italy', cost: 3, instock: 10 },
  { name: 'Oranges', country: 'Spain', cost: 4, instock: 3 },
  { name: 'Beans', country: 'USA', cost: 2, instock: 5 },
  { name: 'Cabbage', country: 'USA', cost: 1, instock: 8 },
];
//=========Cart=============
const Cart = (props) => {
  const { Card, Accordion, Button } = ReactBootstrap;
  let data = props.location.data ? props.location.data : products;
  console.log(`data:${JSON.stringify(data)}`);

  return <Accordion defaultActiveKey="0">{list}</Accordion>;
};

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(`useDataApi called`);
  useEffect(() => {
    console.log('useEffect Called');
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);
        console.log('FETCH FROM URl');
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const Products = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [cartCounts, setCartCounts] = React.useState([]);
  const { Card, Accordion, Button, Container, Row, Col, Image, Input } =
    ReactBootstrap;
  //  Fetch Data
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState('http://localhost:1337/products');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'http://localhost:1337/products',
    {
      data: [],
    }
  );
  console.log(`Rendering Products ${JSON.stringify(data)}`);

  useEffect(() => {
    let cartList = {};
    cart.forEach(({ name: item }) => {
      if (!cartList[item] && cartList[item] !== 0) {
        cartList[item] = 1;
        return;
      }
      cartList[item] += 1;
    });
    setCartCounts(cartList);
  }, [cart]);

  // Fetch Data
  const addToCart = (e) => {
    let name = e.target.name;
    let item = items.filter((item) => item.name == name);
    console.log(`add to Cart ${JSON.stringify(item)}`);
    setCart([...cart, ...item]);
    doFetch(query);
  };
  const deleteCartItem = (name) => {
    const newCart = [...cart];
    newCart.splice(newCart.map((item) => item.name).lastIndexOf(name), 1);
    setCart(newCart);
  };
  let list = items.map((item, index) => {
    let n = index + 1049;
    let url = 'https://picsum.photos/id/' + n + '/50';

    return (
      <li key={index}>
        <Image src={url} width={70} roundedCircle></Image>
        <Button
          variant="primary"
          size="large"
          type="submit"
          name={item.name}
          onClick={addToCart}
          disabled={
            cartCounts[item.name] && cartCounts[item.name] >= item.instock
          }
        >
          ${item.cost} {item.name} (
          {cartCounts[item.name]
            ? item.instock - cartCounts[item.name]
            : item.instock}{' '}
          in stock)
        </Button>
      </li>
    );
  });
  let cartList = Object.entries(cartCounts).map(([name, count], index) => {
    const { cost, country } = products.find((product) => product.name === name);
    return (
      <Card key={index}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={1 + index}>
            {name} {count > 1 && `x${count}`}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={1 + index}>
          <Card.Body>
            ${cost} from {country} <br />
            <b
              className="text-danger"
              style={{
                textUnderlinePosition: 'auto',
                textUnderlineOffset: 'auto',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => deleteCartItem(name)}
            >
              Click to remove {count > 1 ? 'one of these items' : 'this item'}{' '}
              from your cart
            </b>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  });

  let finalList = () => {
    let total = checkOut();

    let final = Object.entries(cartCounts).map(
      ([itemName, itemCount], index) => {
        return (
          <div key={index} index={index}>
            {itemName}
            {itemCount && ` x${itemCount}`}
          </div>
        );
      }
    );
    return { final, total };
  };

  const checkOut = () => {
    let costs = cart.map((item) => item.cost);
    const reducer = (accum, current) => accum + current;
    let newTotal = costs.reduce(reducer, 0);
    console.log(`total updated to ${newTotal}`);
    return newTotal;
  };

  const restockProducts = (url) => {
    doFetch(url);
    let newItems = data.map(({ name, country, cost, instock }) => ({
      name,
      country,
      cost,
      instock,
    }));
    setItems((existingItems) =>
      newItems.map((item) => {
        const nameMap = existingItems.map((item) => item.name);
        if (nameMap.includes(item.name)) {
          return {
            ...item,
            instock:
              parseInt(item.instock) +
              parseInt(existingItems[nameMap.indexOf(item.name)].instock),
          };
        }
        return item;
      })
    );
  };

  return (
    <Container>
      <h1>React Shopping Cart</h1>
      <Row>
        <Col>
          <h1>Product List</h1>
          <ul style={{ listStyleType: 'none' }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <Accordion>{cartList}</Accordion>
        </Col>
        <Col>
          <h1>Checkout</h1>
          <Button onClick={checkOut}>Checkout ${finalList().total}</Button>
          <div> {finalList().total > 0 && finalList().final} </div>
        </Col>
      </Row>
      <Row>
        <form
          onSubmit={(event) => {
            restockProducts(query);
            console.log(`Restock called on ${query}`);
            event.preventDefault();
          }}
        >
          <input
            type="text"
            style={{
              width: '100%',
            }}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Re-stock Products</button>
        </form>
      </Row>
    </Container>
  );
};
// ========================================
ReactDOM.render(<Products />, document.getElementById('root'));
