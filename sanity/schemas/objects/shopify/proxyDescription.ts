import {defineField, defineType} from 'sanity'

import ProxyDescriptionInput from '../../../components/inputs/ProxyDescription'

export default defineField({
  name: 'proxyDescription',
  title: 'Description',
  type: 'text',
  components: {
    input: ProxyDescriptionInput,
  },
})
