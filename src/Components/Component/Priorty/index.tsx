import React from 'react'
import { PRIORITY, getObjectFromArrayByKey } from "@Utils";
type priorityProps = {
  priority: any
}

function Priority({ priority }: priorityProps) {
  const color = getObjectFromArrayByKey(PRIORITY, 'id', priority).color
  return <div style={{
    height: 10, width: 10, borderRadius: 5, margin: "5px", background: color
  }}>
  </div>
}

export { Priority }
