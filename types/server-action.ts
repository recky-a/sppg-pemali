export interface ActionResponse<TData = void> {
  success: boolean;
  data?: TData | TData[];
  message?: string;
}
