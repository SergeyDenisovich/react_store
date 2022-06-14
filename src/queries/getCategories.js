import { Query } from '@tilework/opus';

export const getCategories = new Query('categories', true).addField('name');
