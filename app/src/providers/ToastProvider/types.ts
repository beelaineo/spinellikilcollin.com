export enum ToastType {
  Message = 'MESSAGE',
  Warning = 'WARNING',
  Error = 'Error',
}

export interface Toast {
  message: string
  dismissable: boolean
  type: ToastType
}

export interface NewToast {
  message: string
  dismissable?: boolean // defaults to false
  type?: ToastType // defaults to MESSAGE
}
