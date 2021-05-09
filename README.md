# Export Excel React

Esta libreria esta basada en [react-excel-workbook](https://github.com/ClearC2/react-excel-workbook) a la cual se le añadio una funcionalidad mas que es agrupar columnas bajo un titulo.

```javascript
const data = {
  title: "este es un titulo",
  dataArray: [
    {
      foo: "123",
      bar: "456",
      baz: "789",
    },
    {
      foo: "abc",
      bar: "dfg",
      baz: "hij",
    },
    {
      foo: "aaa",
      bar: "bbb",
      baz: "ccc",
    },
  ],
};
```

**Importaciones**

```javascript
import WorkBook from "./Components/WorkBook";
```

**Implementación**

```javascript
<WorkBook filename="prueba.xlsx">
  <WorkBook.Sheet name="hoja 123">
    <WorkBook.ColumnGroup title={data.title} data={data.dataArray}>
      <WorkBook.Column label="Foo" value="foo" />
      <WorkBook.Column label="Bar" value="bar" />
      <WorkBook.Column label="Baz" value="baz" />
    </WorkBook.ColumnGroup>
  </WorkBook.Sheet>
</WorkBook>
```

# API

## WorkBook

### props

- **filename** es el nombre del archivo que se esta exportando es de tipo **String** por defecto es _data.xlsx_.
- **element** componente de React que es renderizado para recibir el evento _onClick_ para proceder con la descarga del archivo.
- **children** necesita tener como hijo al componente ` <Sheet />` puede ser uno o varios.

## Sheet

### props

- **name** es el nombre de la hoja de excel

## ColumnGroup

### props

- **title** titulo de las columnas hijas
- **data** Array de datos a renderizar en el archivo
- **children** necesita tener como hijo `<Column />`

## Column

### props

- **label** titulo de la columna
- **value** valor o key del objeto de la data pasada a `<ColumnGroup />` puede ser un String o una función `row => row.key`
