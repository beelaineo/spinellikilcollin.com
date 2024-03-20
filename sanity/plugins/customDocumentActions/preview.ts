import {PresentationIcon} from '@sanity/icons'
import {type DocumentActionProps, type DocumentActionDescription, type SanityDocument} from 'sanity'
import resolveProductionUrl from '../../resolveProductionUrl'

export default (props: DocumentActionProps): DocumentActionDescription | undefined => {
  const url = resolveProductionUrl(props)

  if (!url) {
    return
  }

  return {
    label: 'Preview in Browser',
    icon: PresentationIcon,
    onHandle: () => {
      url ? window.open(url) : void 'No URL'
    },
    shortcut: 'Ctrl+Alt+P',
  }
}
