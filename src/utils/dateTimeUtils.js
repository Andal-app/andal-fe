import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDateTime = (dateTime) => {
  return format(new Date(dateTime), 'EEEE, dd MMMM yyyy HH:mm', { locale: id });
};
