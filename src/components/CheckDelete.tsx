//CheckDelete.tsx
import { GQLMutationAction, useGQLQuery } from '../hooks';
import { BaseProps } from '../types';

interface CheckDeleteProps extends BaseProps {
  modelName: string;
  check_delete_id: string;
}

const CheckDelete = ({ modelName, check_delete_id }: CheckDeleteProps) => {
  const action = GQLMutationAction.MODEL_DELETE;
  const document = `
    query check_delete($type: String!, $id: ID!) {
      check_delete(type: $type, id: $id) {
          affected {
            type
            id
            value
            extra
          }
          deleted {
            type
            id
            value
            extra
          }
          prevented {
            type
            id
            value
            extra
          }
        }
      } 
    `;

  const { data } = useGQLQuery({
    action,
    document,
    variables: { type: modelName, id: check_delete_id },
  });
  if (data?.check_delete) {
    if (data.check_delete?.affected.length > 0) {
      return 'affected';
    } else if (data.check_delete?.deleted.length > 0) {
      return 'deleted';
    } else if (data.check_delete?.prevented.length > 0) {
      return 'prevented';
    }
  }
};

export default CheckDelete;
