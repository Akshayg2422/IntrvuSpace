import React from 'react';
import { Badge as RSBadge } from 'reactstrap';
import { BadgeProps } from './interfaces';

function Badge({ text, size = 'md', className, ...rest }: BadgeProps) {
  return (
    <RSBadge {...rest} className={`${className} ${size && `badge-${size}`}`}>
      {text}
    </RSBadge>
  )
}
export { Badge };

