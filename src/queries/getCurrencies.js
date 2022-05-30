import { Query } from '@tilework/opus';

export const getCurrencies = new Query('currencies', true).addFieldList(['label', 'symbol']);
