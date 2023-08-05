import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = () => {
  const location = useLocation();
  const { goTo, goBack } = useNavigation();
  const { breadCrumb } = useSelector((state: any) => state.DashboardReducer)
  const [heading, setHeading] = useState('')
  var check
  console.log('breadcrumbbbbbbbbbbbbbbbbbbbbbbbb------------------>', breadCrumb)
  let heading2 = ''
  const separator = " / ";

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
          console.log("909090", item)
          return (
            <>
              <h4>{item?.title}</h4>
            </>
          )
        })}
        <Breadcrumb listClassName="breadcrumb-links" className='mt--1'>

          {breadCrumb && breadCrumb.length > 0 && breadCrumb.map((item: any, index: number) => {
            return (
              // <div>
              //   <div>
              //     <h6 className='h2 mb-0'>{item?.title}</h6>
              //     {index === 0
              //       ? <span style={{ display: 'inline-block' }} className='mx-1'>{item.name}</span>
              //       : <span style={{ display: 'inline-block' }} className='mx-1'>{separator + item.name}</span>}
              //   </div>
              // </div>
              <>
                <BreadcrumbItem>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {item?.name}
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
