import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const { goTo, goBack } = useNavigation();
  const { breadCrumb } = useSelector((state: any) => state.DashboardReducer)

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
      {/* {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1
        const capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
        return isLast ? (
          <span key={routeTo}>{capitalizedPath}</span>
        ) : (
          <Link key={routeTo} to={routeTo}>
            {capitalizedPath}
          </Link>
        );
      })} */}
      {breadCrumb && breadCrumb.length > 0 && breadCrumb.map((item: any, index: number) => {
        return (
          <div>
            {index === 0 ? <span className='mx-1 pointer' onClick={() => {
              // breadCrumb.pop()
            }}>{item.name}</span> : <span className='mx-1 pointer' onClick={() => {
              // breadCrumb.pop()
            }}>{separator + item.name}</span>}
          </div>
        )
      })}
    </div >
  );
};

export { Breadcrumbs };
