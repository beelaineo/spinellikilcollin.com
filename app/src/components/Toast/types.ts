export interface Toast {
  message: string
  dismissable: boolean
  type: ToastType
}

export enum ToastType {
  Message = 'MESSAGE',
  Warning = 'WARNING',
  Error = 'Error',
  Currency = 'CURRENCY',
}

export enum ToastDivState {
  Init = 'INIT',
  Mounted = 'MOUNTED',
  Displayed = 'DISPLAYED',
  Hidden = 'HIDDEN',
}
