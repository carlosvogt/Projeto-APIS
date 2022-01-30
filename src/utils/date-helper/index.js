import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import i18n from '../../i18n';

dayjs.locale(i18n.language);

export default dayjs;
