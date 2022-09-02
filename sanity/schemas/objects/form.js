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
          { title: 'Intl Size Conversion', value: 'sizeConverter' },
          { title: 'VIP Signup Form', value: 'vipSignup' },
        ],
      },
    },
    {
      name: 'formTitle',
      title: 'Form Title (optional)',
      type: 'string',
      hidden: ({ parent }) => parent.formType !== 'sizeConverter',
    },
    {
      name: 'formSubtitle',
      title: 'Form Subtitle (optional)',
      type: 'string',
      hidden: ({ parent }) => parent.formType !== 'sizeConverter',
    },
  ],
}
