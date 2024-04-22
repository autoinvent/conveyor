import { useConveyor } from '@/Conveyor';

export const Home = () => {
  const models = useConveyor((state) => state.models);
  return <div>Home sweet home!</div>;
};
