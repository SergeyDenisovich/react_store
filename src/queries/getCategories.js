import { Query, Field } from '@tilework/opus';

export const getCategories = new Query('categories', true)
  .addField('name')
  .addField(
    new Field('products', true).addFieldList([
      'id',
      'name',
      'inStock',
      'gallery',
      'brand',
      new Field('attributes', true).addFieldList([
        'id',
        'name',
        'type',
        new Field('items').addFieldList(['id', 'value', 'displayValue']),
      ]),
      new Field('prices', true).addFieldList(['amount', new Field('currency').addFieldList(['label', 'symbol'])]),
    ])
  );
