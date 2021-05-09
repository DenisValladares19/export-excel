import logo from './logo.svg';
import './App.css';
import WorkBook from './Components/WorkBook';
const data = {
  title: 'este es un titulo',
  dataArray: [
    {
      foo: '123',
      bar: '456',
      baz: '789'
    },
    {
      foo: 'abc',
      bar: 'dfg',
      baz: 'hij'
    },
    {
      foo: 'aaa',
      bar: 'bbb',
      baz: 'ccc'
    }
  ]
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <WorkBook filename='prueba.xlsx'>
          <WorkBook.Sheet name='hoja 123' >
            <WorkBook.ColumnGroup title={data.title} data={data.dataArray}>
              <WorkBook.Column label='Foo' value='foo' />
              <WorkBook.Column label='Bar' value='bar' />
              <WorkBook.Column label='Baz' value='baz' />
            </WorkBook.ColumnGroup>
          </WorkBook.Sheet>
        </WorkBook>
      </header>
    </div>
  );
}

export default App;
