import React from 'react'
import { STATUS_LIST, getObjectFromArrayByKey } from "@Utils";
type statusProps = {
  status: any
}
function Status({ status }: statusProps) {
  const color = getObjectFromArrayByKey(STATUS_LIST, 'id', status)?.color
  return <div className="row mb-0 align-items-center">
    <div style={{ height: 10, width: 10, borderRadius: 5, background: color, color: color }}> </div>
    <span className="ml-2">{getObjectFromArrayByKey(STATUS_LIST, 'id', status)?.text} </span>
  </div>
}
export { Status }
