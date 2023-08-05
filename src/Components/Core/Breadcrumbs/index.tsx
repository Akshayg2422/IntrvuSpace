import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const { goTo, goBack } = useNavigation();
  const { breadCrumb } = useSelector((state: any) => state.DashboardReducer)
  console.log('breadcrumbbbbbbbbbbbbbbbbbbbbbbbb------------------>', breadCrumb)

  const separator = " / ";

  return (
    <div className='row mx-1 my-2'>
      <span className='pointer ml-3 text-black h3 '
        onClick={() => {
          goBack()
          breadCrumb.pop()
        }}
      >
        <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder pr-1"></i>
      </span>
      <div className='col'>
        {breadCrumb && breadCrumb.length > 0 && breadCrumb.map((item: any, index: number) => {
          return (
            <div>
              <div  >
                <h6 className='h2  mb-0'>{item?.title}</h6>
                {index === 0
                  ?
                  <span className='mx-1'>{item.name}</span>
                  :
                  <span className='mx-1'>{separator + item.name}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div >
  );
};

export { Breadcrumbs };
