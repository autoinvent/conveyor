import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ConveyorLogo from '@autoinvent/conveyor/logo.svg';
import { Conveyor, ModelIndex, ScalarTypes, type TableView } from '@autoinvent/conveyor';

const App = () => {
  const [tableView, onTableViewChange] = useState<TableView>({});
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
          typeOptions={{
            [ScalarTypes.STRING]: {
              valueRenderFn: ({value}) => (
                <b className="text-green-700">{value}</b>
              ),
            } 
          }}
        >
          <ModelIndex
                title='Disney Cats'
                fields={ [
                  'id',
                  'type',
                  {
                    name: 'name',
                    type: ScalarTypes.STRING,
                    editable: true,
                    rules: { required: 'Name is required.' },
                  },
                  {
                    name: 'isHappy',
                    type: ScalarTypes.BOOLEAN,
                    editable: true,
                  },
                  { name: 'released', type: ScalarTypes.DATETIME, editable: true },
                  {
                    name: 'bestBearFriend',
                    type: 'DisneyBear',
                    editable: true,
                    sortable: false,
                  },
                ]}
                data={[
                  {
                    id: '1',
                    type: 'Tiger',
                    name: 'Tigger',
                    isHappy: false,
                    released: null,
                    bestBearFriend: { id: '1' },
                  },
                  {
                    id: '2',
                    type: 'Cat',
                    name: 'Duchess',
                    isHappy: true,
                    released: '1994-06-24T01:56:34.926365',
                    bestBearFriend: null,
                  },
                  {
                    id: '3',
                    type: 'Lion',
                    name: 'Simba',
                    isHappy: true,
                    released: '1970-12-24T01:56:34.926365',
                    bestBearFriend: null,
                  }
                ]}
                onCreate={() => new Promise((resolve) => setTimeout(resolve, 3000))}
                onUpdate={() => new Promise((resolve) => setTimeout(resolve, 3000))}
                onDelete={() => new Promise((resolve) => setTimeout(resolve, 3000))}
                paginationOptions={{
                  totalDataLength: 514,
                }}
                tableViewOptions={{
                  tableView,
                  onTableViewChange
                }}
          />
        </Conveyor>
      </div>
    </>
  );
};

export default App;
