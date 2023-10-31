import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = () => {
  const location = useLocation();
  const { goBack } = useNavigation();
  const { breadCrumb } = useSelector((state: any) => state.DashboardReducer)


  return (
    <div className='row mx-1 my-2'>
      <span className='pointer ml-3 text-black h3' onClick={() => {
        goBack();
        breadCrumb.pop();
      }}>
        <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder pr-1"></i>
      </span>
      <div className='ml-2'>
        {breadCrumb && breadCrumb.length > 0 && breadCrumb.map((item: any, index: number) => {
          const capitalizedTitle = item && item?.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : '';

          return (
            <h4 key={index}>
              {capitalizedTitle}
            </h4>
          );
        })}

        <Breadcrumb listClassName="breadcrumb-links" className='mt--1'>

          {breadCrumb && breadCrumb.length > 0 && breadCrumb.map((item: any, index: number) => {
            const lowerCaseName = item && item?.name ? item.name.charAt(0).toLowerCase() + item.name.slice(1) : '';
            return (
              <>
                <BreadcrumbItem
                  style={{
                    pointerEvents: 'none'
                  }}
                >
                  <a href="" onClick={e => e.preventDefault()}>
                    {lowerCaseName}
                  </a>
                </BreadcrumbItem>
              </>
            )
          })}
        </Breadcrumb>
      </div>


    </div>


  );
};

export { Breadcrumbs };
