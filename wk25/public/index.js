function PlusMinus(props) {
  function handle(e) {
    if (e.target.id.includes('minus')) {
      props.handle({ name: props.section, value: -1 });
      return;
    }
    props.handle({ name: props.section, value: 1 });
  }
  return (
    <div className="button-container">
      <AddIcon id="plus" className="button" onClick={(e) => handle(e)} />
      <SubtractIcon id="minus" className="button" onClick={(e) => handle(e)} />
    </div>
  );
}

function Data({ data }) {
  return (
    <div>
      {Object.entries(data).map(
        ([k, v], i, arr) =>
          `${
            k.split(k.charAt(1))[0].toUpperCase() + k.split(k.charAt(0))[1]
          }: ${v}${i !== arr.length - 1 ? ',' : ''} `
      )}
    </div>
  );
}

function update(section, value) {
  return new Promise((resolve, reject) => {
    var url = `/update/${section}/${value}`;
    superagent.get(url).end(function (err, res) {
      err ? reject(null) : resolve(res.body);
    });
  });
}

function read() {
  return new Promise((resolve, reject) => {
    var url = '/data';
    superagent.get(url).end(function (err, res) {
      err ? reject(null) : resolve(res.body);
    });
  });
}

const sections = [Header, Left, Article, Right, Footer];

function App() {
  const [data, setData] = React.useState({
    header: 0,
    left: 0,
    article: 0,
    right: 0,
    footer: 0,
  });

  React.useEffect(() => {
    // read db data & update UI
    read().then((res) => {
      setData(res);
    });
  }, []);

  function handle(section) {
    // update db & local state
    update(section.name, section.value).then((res) => {
      setData(res);
    });
  }

  return (
    <>
      <div className="grid">
        {sections.map((Section, key) => (
          <Section handle={handle} data={data} key={`section-${key}`} />
        ))}
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
