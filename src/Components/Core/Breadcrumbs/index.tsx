import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div>
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
        return isLast ? (
          <span key={routeTo}>{capitalizedPath}</span>
        ) : (
          <Link key={routeTo} to={routeTo}>
            {capitalizedPath}
          </Link>
        );
      })}
    </div>
  );
};

export { Breadcrumbs };
