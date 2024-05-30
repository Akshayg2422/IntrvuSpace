import React from 'react';

type NoRecordsFoundProps = {
  text?: string
}

const NoRecordsFound = ({ text = 'No Record Found' }: NoRecordsFoundProps) => (
  <div className="text-muted text-center" ><small>{text}</small></div>
)

export { NoRecordsFound };