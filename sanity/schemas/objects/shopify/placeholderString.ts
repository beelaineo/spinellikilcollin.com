import {defineField, defineType} from 'sanity'
import PlaceholderStringInput from '../../../components/inputs/PlaceholderString'

export default defineField({
  name: 'placeholderString',
  title: 'Title',
  type: 'string',
  components: {
    input: PlaceholderStringInput,
  },
})
