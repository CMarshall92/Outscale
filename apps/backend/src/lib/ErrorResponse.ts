export const ErrorResponse = ({
  message,
}: {
  message: string;
}) => ({
  ok: false,
  message,
  data: null,
})