export default function examineResBody({
  resBody,
  validator = () => true,
  onFailure = () => {},
}: {
  resBody: any;
  validator: (data: any) => boolean;
  onFailure: () => void;
}) {
  if (
    !resBody ||
    resBody.status !== "SUCCESS" ||
    !resBody.data ||
    !validator(resBody.data)
  ) {
    onFailure();
    return;
  }
  return resBody;
}
