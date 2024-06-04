import { Helmet } from 'react-helmet';

import {
  ConveyorLogo,
  Conveyor,
  ModelIndex,
  ScalarTypes,
} from '@autoinvent/conveyor';

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
        <Conveyor
          valueOptions={{
            [ScalarTypes.STRING]: (value) => (
              <b className="text-green-700">{value}</b>
            ),
          }}
        >
          <ModelIndex
            model="DisneyCats"
            fields={[
              'id',
              'type',
              {
                name: 'name',
                type: ScalarTypes.STRING,
                editable: true,
                required: true,
              },
              { name: 'isHappy', type: ScalarTypes.BOOLEAN, editable: true },
              { name: 'released', type: ScalarTypes.DATETIME, editable: true },
              { name: 'bestBearFriend', type: 'DisneyBear', editable: true },
            ]}
            data={[
              {
                id: '1',
                type: 'Tiger',
                name: 'Tigger',
                isHappy: false,
                released: '1928-10-1',
                bestBearFriend: { id: '1' },
              },
              {
                id: '2',
                type: 'Cat',
                name: 'Duchess',
                isHappy: true,
                released: '1994-06-24',
                bestBearFriend: null,
              },
              {
                id: '3',
                type: 'Lion',
                name: 'Simba',
                isHappy: true,
                released: '1970-12-24',
                bestBearFriend: null,
              },
            ]}
          />
        </Conveyor>
      </div>
    </>
  );
};

export default App;
