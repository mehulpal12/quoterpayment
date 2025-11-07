import { type SchemaTypeDefinition } from 'sanity'


import {authorType} from './authorType'
import feature from './feature'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ authorType,feature],
}
