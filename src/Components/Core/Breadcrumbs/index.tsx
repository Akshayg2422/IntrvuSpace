import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { BreadcrumbsProps, BreadCrumbItem } from './interfaces';

function Breadcrumbs({ defaultSelected, items, ...rest }: BreadcrumbsProps) {
  return (
    <Breadcrumb {...rest}>
      {
        items?.map((breadCrumbItem: BreadCrumbItem) => {
          const isSelected = defaultSelected?.id === breadCrumbItem.id
          return (
            <>{isSelected ?
              <BreadcrumbItem key={breadCrumbItem.id} className={'active'}>
                {breadCrumbItem.title}
              </BreadcrumbItem>
              :
              <BreadcrumbItem key={breadCrumbItem.id}>
                <a href={'/'} >
                  {breadCrumbItem.title}
                </a>
              </BreadcrumbItem>
            }
            </>
          )
        })


      }
    </Breadcrumb >
  )
}
export { Breadcrumbs };
