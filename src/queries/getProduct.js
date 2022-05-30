import { Query, Field } from '@tilework/opus';

export const getProduct = (productId) => {
  return new Query('product')
    .addArgument('id', 'String!', productId)
    .addFieldList([
      'id',
      'brand',
      'name',
      'gallery',
      'description',
      'inStock',
      new Field('prices', true).addFieldList(['amount', new Field('currency').addFieldList(['label', 'symbol'])]),
      new Field('attributes', true).addFieldList([
        'id',
        'name',
        'type',
        new Field('items').addFieldList(['id', 'value', 'displayValue']),
      ]),
    ]);
};
