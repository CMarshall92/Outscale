export const SuccessResponse = ({
  message,
  data
}: {
  message?: string;
  data?: any;
}) => ({
  ok: true,
  message: message || null,
  data: data || null,
})