export const bambuserLiveSettings = {
  name: 'bambuserLiveSettings',
  title: 'Bambuser Live Settings',
  description: 'Add a start & end date to change the UI during a live show.',
  options: { collapsed: true, collapsible: true },
  type: 'object',
  fields: [
    {
      name: 'startDate',
      title: 'Start date & time',
      type: 'datetime',
      options: {
        timeStep: 15,
        timeFormat: 'h:mm',
      },
    },
    {
      name: 'endDate',
      title: 'End date & time',
      type: 'datetime',
      options: {
        timeStep: 15,
        timeFormat: 'h:mm',
      },
    },
    {
      name: 'liveCTALabel',
      title: 'Alternate CTA Label during live show',
      type: 'string',
    },
  ],
}

export const bambuserSettings = {
  name: 'bambuserSettings',
  title: 'Bambuser Settings',
  type: 'object',
  fields: [
    {
      name: 'slug',
      title: 'Bambuser show ID',
      description: 'The ID of the Bambuser video to launch',
      type: 'string',
    },
    {
      name: 'liveSettings',
      type: 'bambuserLiveSettings',
      title: 'Live Show settings',
    },
  ],
}
