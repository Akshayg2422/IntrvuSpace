import React from 'react';
import { Badge as RSBadge } from 'reactstrap';
import { BadgeProps } from './interfaces';

function Badge({ text, size = 'md', pill, className, color = 'primary', ...rest }: BadgeProps) {
  return (
    <RSBadge {...rest} pill={pill} color={color} className={`${size && `badge-${size}`}  ${className}`}>
      {text}
    </RSBadge>
  )
}
export { Badge };

