export default {
  name: 'feature',
  title: 'Features',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Feature ID',
      type: 'string'
    },
    {
      name: 'name',
      title: 'Feature Name',
      type: 'string'
    },
    {
      name: 'price',
      title: 'Price (in ₹)',
      type: 'number'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
