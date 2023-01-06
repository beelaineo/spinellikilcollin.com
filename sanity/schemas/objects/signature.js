export const signature = {
  name: 'signature',
  title: 'Signature',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string',
      rule: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      rule: (Rule) => Rule.required(),
    },
    {
      name: 'pronouns',
      title: 'Pronouns',
      description: 'e.g. "they/them," "he/him," "she/her"',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      rule: (Rule) =>
        Rule.custom((email) => {
          if (typeof email === 'undefined') {
            return true
          }
          const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
          if (regex.test(email)) {
            return true
          } else {
            return 'Not a valid email address'
          }
        }),
    },
    {
      name: 'location',
      title: 'Location',
      description: 'e.g. "California" or "New York"',
      type: 'string',
      initialValue: 'California',
    },
    {
      name: 'phone_label',
      title: 'Phone Number Label',
      description: 'defaults to "Office:"',
      initialValue: 'Office:',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      initialValue: '213 300 8443',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((phone) => {
          if (typeof phone === 'undefined') {
            return true
          }
          const regex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
          if (regex.test(phone)) {
            return true
          } else {
            return 'Not a valid phone number'
          }
        }),
    },
    {
      name: 'phone_label_2',
      title: 'Additional Phone Number Label (optional)',
      type: 'string',
    },
    {
      name: 'phone_2',
      title: 'Additional Phone Number (optional)',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((phone) => {
          if (typeof phone === 'undefined') {
            return true
          }
          const regex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
          if (regex.test(phone)) {
            return true
          } else {
            return 'Not a valid phone number'
          }
        }),
    },
    {
      name: 'additional_info',
      title: 'Additional Contact Info (optional)',
      description: 'e.g. "Working hours 9am-5pm PST"',
      type: 'string',
    },
  ],
}
