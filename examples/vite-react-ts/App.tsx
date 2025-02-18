

import { Helmet } from 'react-helmet';

import { Pagination } from '@autoinvent/conveyor';
import ConveyorLogo from '@autoinvent/conveyor/logo.svg';

const App = () => {
  return (
    <>
      <Helmet>
        <link
          id="favicon"
          rel="icon"
          type="image/svg+xml"
          href={ConveyorLogo}
        />
      </Helmet>
      <div className="flex flex-col">
        <img src={ConveyorLogo} alt="" className="h-8 w-8" />
        <Pagination className="hello" onPageChange={() => {}} />
      </div>
    </>
  );
};

export default App;
