import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-subtitle">Page Not Found</p>
      <p className="not-found-text">
        It seems like this page is lost in the cherry blossoms.
      </p>
      <Link to="/" className="home-link">
        Go to Home
      </Link>
      <div className="sakura-container">
        <div className="sakura"></div>
        <div className="sakura"></div>
        <div className="sakura"></div>
        <div className="sakura"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
