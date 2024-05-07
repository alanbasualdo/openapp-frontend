import moment from "moment";

export const useLastSeenFormat = (lastSeen) => {
    if (!lastSeen || !moment(lastSeen).isValid()) {
        return '';
    }
    const today = moment().startOf('day');
    const lastSeenDate = moment(lastSeen);
    if (lastSeenDate.isSame(today, 'day')) {
        return `Hoy ${lastSeenDate.format('HH:mm')}`;
    } else if (lastSeenDate.isSame(today.clone().subtract(1, 'day'), 'day')) {
        return `Ayer ${lastSeenDate.format('HH:mm')}`;
    } else if (lastSeenDate.isSame(today, 'month')) {
        return `${lastSeenDate.format('HH:mm DD/MM')}`;
    } else {
        return lastSeenDate.format('DD/MM/YY');
    }
}