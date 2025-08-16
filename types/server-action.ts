export interface ActionResponse<TData = void> {
  success: boolean;
  data?: TData;
  message?: string;
}
