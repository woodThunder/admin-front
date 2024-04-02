import { AxiosRequestConfig } from 'axios'
export interface AxiosRequestConfigMerge extends AxiosRequestConfig {
  showLoading?: boolean
  showSuccessToast?: boolean
  showFailToast?: boolean
  isUser?: boolean
}
export interface BaseConfig {
  method: string
  url: string
  params?: object | null
  data?: object | null
}
export interface UeConfig {
  showLoading?: boolean
  showSuccessToast?: boolean
  showFailToast?: boolean
  isUser?: boolean
}
