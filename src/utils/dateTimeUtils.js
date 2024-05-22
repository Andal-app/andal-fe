import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDateTimeWIB = (dateTime) => {
  const date = new Date(dateTime);

  // Tambahkan 7 jam untuk konversi dari UTC ke GMT+7
  const offsetMilliseconds = 7 * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() + offsetMilliseconds);

  return format(localDate, 'EEEE, dd MMMM yyyy HH:mm', { locale: id });
};
