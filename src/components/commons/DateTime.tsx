import { BaseProps } from '../../types';
import moment from 'moment';

interface DateTimeProps extends BaseProps {
  date?: Date;
}

const DateTime = ({ date }: DateTimeProps) => {
  // Process the date as needed
  return moment(date).format('MM / DD / YYYY hh:mm:ss A');
};

export default DateTime;
