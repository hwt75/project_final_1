import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Attendacne</title>
      </Helmet>
      <div>
        <h1 style={{ textAlign: 'center' }}>Page not Found</h1>
      </div>
    </>
  );
}
