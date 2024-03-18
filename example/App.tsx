import { Helmet } from 'react-helmet';

import logo from '@/assets/logo.svg'

const App = () => {
  const gqlUrl = '/graphql';

  return (
    <>
      <Helmet>
        <link id="favicon" rel="icon" type="image/svg+xml" href={logo} />
      </Helmet>
    </>
  )
}


export default App;
