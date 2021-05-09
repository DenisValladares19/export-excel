import React from 'react';
import propTypes from 'prop-types';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import Sheet from './Sheet';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const WorkBook = ({ filename, element, children }) => {
    const s2ab = (s) => {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
    }

    const datenum = (v, date1904) => {
        if (date1904) v += 1462
        var epoch = Date.parse(v)
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
    }

    /**
     * Funcion para construir las celdas del excel 
     * @param {Array} data 
     * @param {String} title 
     * @returns [ Object ws, end {Number} ]
     */
    const createDataSheetByColumnGroup = (data, title, start = 0) => {
        let ws = {};
        let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } }
        for (let R = (start + 1); R !== data[1].length + 1; ++R) {
            for (let C = 0; C !== (data[1][(R - 1)].length); ++C) {
                if (range.s.r > R) range.s.r = R
                if (range.s.c > C) range.s.c = C
                if (range.e.r < R) range.e.r = R
                if (range.e.c < C) range.e.c = C
                let cell;
                let cell_ref;
                if (start === (R - 1) && C === 0) {
                    cell = { v: data[0], t: 's' };
                    ws['!merges'] = [{ s: { c: start, r: (R - 1) }, e: { c: (data[1][R].length - 1), r: (R - 1) } }]
                    cell_ref = XLSX.utils.encode_cell({ c: start, r: (R - 1) });
                    ws[cell_ref] = cell;
                }

                cell = { v: data[1][(R - 1)][C] }
                if (cell.v == null) continue
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R })

                if (typeof cell.v === 'number') cell.t = 'n'
                else if (typeof cell.v === 'boolean') cell.t = 'b'
                else if (cell.v instanceof Date) {
                    cell.t = 'n'; cell.z = XLSX.SSF._table[14]
                    cell.v = datenum(cell.v)
                } else cell.t = 's'

                ws[cell_ref] = cell
            }
        }
        if (range.s.c < 10000000) {
            ws['!ref'] = XLSX.utils.encode_range(range)
        }
        return [ws, data[1][0].length];
    }

    const createSheetData = (sheet) => {
        const columnGroup = sheet.props.children;
        if (!Array.isArray(columnGroup)) {
            const sheetData = [React.Children.map(columnGroup.props.children, column => column.props.label)];
            let data = [];
            data.push(columnGroup.props.title);
            const dataProps = typeof (columnGroup.props.data) === 'function' ? columnGroup.props.data() : columnGroup.props.data;

            dataProps.forEach(row => {
                const sheetRow = []
                React.Children.forEach(columnGroup.props.children, column => {
                    const getValue = typeof (column.props.value) === 'function' ? column.props.value : row => row[column.props.value]
                    sheetRow.push(getValue(row) || '')
                })
                sheetData.push(sheetRow)
            })

            return [...data, sheetData]
        }
    }

    const onClickDownload = () => {
        const wb = {
            SheetNames: React.Children.map(children, sheet => sheet.props.name),
            Sheets: {}
        }
        let endColumnGroupPrevious = 0;
        React.Children.forEach(children, sheet => {
            let [ws, end] = createDataSheetByColumnGroup(createSheetData(sheet), 'titulo', endColumnGroupPrevious);
            endColumnGroupPrevious = end;
            wb.Sheets[sheet.props.name] = ws;
        })

        const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' })
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), filename || 'data.xlsx');
    }

    return (
        element ? element : <button onClick={() => onClickDownload()}>haz click</button>
    )
}

WorkBook.propTypes = {
    filename: propTypes.string,
    element: propTypes.any,
    children: function (props, propName, componentName) {
        React.Children.forEach(props[propName], child => {
            if (child.type !== Sheet) {
                throw new Error('<Workbook> necesita <Sheet /> como hijo.')
            }
        })
    }
}

WorkBook.Sheet = Sheet;
WorkBook.Column = Column;
WorkBook.ColumnGroup = ColumnGroup;

export default WorkBook;