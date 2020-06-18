import { RiQuestionAnswerLine } from 'react-icons/ri'

export const form = {
  name: 'form',
  title: 'Embedded Form',
  type: 'object',
  icon: RiQuestionAnswerLine,
  fields: [
    {
      name: 'formType',
      title: 'Form Type',
      type: 'string',

      options: {
        list: [
          { title: 'Customization Inquiry', value: 'customizationInquiry' },
          { title: 'Ring Sizer', value: 'ringSizer' },
        ],
      },
    },
  ],
}
