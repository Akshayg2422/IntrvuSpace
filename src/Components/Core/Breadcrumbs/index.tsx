import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  console.log('location---->', location)
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log('pathnames------->', pathnames)


  return (
    <div>
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={routeTo}>{path}</span>
        ) : (
          <Link key={routeTo} to={routeTo}>
            {path}
          </Link>
        );
      })}
    </div>
  );
};

export { Breadcrumbs };
