export interface SuccessResponseData<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Record<string, any>;
}

export const successResponse = <T>(
  statusCode: number,
  message: string,
  data: T,
  meta?: Record<string, any>
): SuccessResponseData<T> => {
  return {
    success: true,
    statusCode,
    message,
    data,
    ...(meta && { meta }),
  };
};
