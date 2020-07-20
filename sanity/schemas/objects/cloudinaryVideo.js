export const cloudinaryVideo = {
  type: 'object',
  name: 'cloudinaryVideo',
  title: 'Cloudinary Video',
  fields: [
    {
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
    },
    {
      name: 'enableAudio',
      title: 'Enable Audio',
      type: 'boolean',
    },
    {
      name: 'enableControls',
      title: 'Enable playback controls',
      type: 'boolean',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    },
  ],
}
