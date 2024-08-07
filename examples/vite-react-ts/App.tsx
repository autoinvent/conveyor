import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ConveyorLogo from '@autoinvent/conveyor/logo.svg';
import { Pagination } from '@autoinvent/conveyor';

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
        <Pagination className="hello" onPageChange={() => {}}/>
      </div>
    </>
  );
};

export default App;
