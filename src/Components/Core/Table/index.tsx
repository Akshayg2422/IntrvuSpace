
import React from 'react'
import { translate } from "@I18n";

interface TableProps {
  tableDataSet?: Array<{}>;
  displayDataSet: Array<{}>;
  tableOnClick?: (event: any, index: number, item: object) => void;
}

function Table({ tableDataSet, displayDataSet, tableOnClick }: TableProps) {

  const renderTableHeader = () => {
    if (displayDataSet) {
      const header = Object.keys(displayDataSet[0])
      return header.map(key => {
        return <th scope="col"  key={key}>{key}</th>
      })
    }
  }

  function renderTableValue(eachObject: object) {
    return Object.keys(eachObject).map((key: string) => {
      let value = eachObject[key as keyof object]
      return <td style={{ whiteSpace: 'pre-wrap' }} key={key} ><span>{value}</span></td>
    })
  }





  return (

    <table className="table align-items-center table-flush ">
      <thead className="thead-light ">
        <tr >
          {
            renderTableHeader()
          }
        </tr>
      </thead>
      <tbody>
        {displayDataSet && displayDataSet.length > 0 &&
          displayDataSet.map((each_table_obj: object, idx: number) => {
            return (
              <tr key={idx} onClick={(e) => {
                let selected = {};
                if (tableDataSet) {
                  selected = tableDataSet[idx]
                } else {
                  selected = each_table_obj
                }

                if (tableOnClick) {
                  e.preventDefault();
                  e.stopPropagation();
                  tableOnClick(e, idx, selected)
                }

              }}>
                {renderTableValue(each_table_obj)}
              </tr>)
          })
        }
      </tbody>
    </table>

  )

}

export { Table }