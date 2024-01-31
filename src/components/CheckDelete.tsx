import { GQLMutationAction, useGQLQuery } from '../hooks';
import { BaseProps } from '../types';

interface SearchResult {
  type: string;
  id: string;
  value: string;
  extra?: Record<string, any> | null;
}

interface CheckDeleteResult {
  affected: SearchResult;
  deleted: SearchResult;
  prevented: SearchResult;
}

const document = `
query check_delete($type: String!, $id: ID!) {
    check_delete(type: $type, id: $id) {
      affected
      deleted
      prevented
    }
  }
  `;

interface CheckDeleteProps extends BaseProps {
  modelName: string;
}

const CheckDelete = ({ modelName, id }: CheckDeleteProps) => {
  const action = GQLMutationAction.MODEL_DELETE;

  const { data, error } = useGQLQuery({
    action,
    document,
    variables: { modelName, id },
  });

  const modelData: CheckDeleteResult = data.response;

  return modelData;
};

export default CheckDelete;
