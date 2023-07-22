import React from "react";
import { HomeContainerProps } from "./interfaces";
import { Card } from '@Components'

function HomeContainer({ children, title, className, type = 'default', style }: HomeContainerProps) {
  return (
    <>
      {type === 'default' && <div className={`${className}`} style={style}>{children}</div>}
      {type === 'card' &&
        <Card
          className={`${className}`}
          style={style}
          title={title}
        >
          {children}
        </Card>
      }
    </>
  );
}
export { HomeContainer };