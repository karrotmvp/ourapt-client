import getLogger from './logger';

export default function examineResBody({
  resBody,
  validator = () => true,
  onFailure = () => {},
}: {
  resBody: any;
  validator?: (data: any) => boolean;
  onFailure: () => void;
}) {
  if (
    !resBody ||
    resBody.status !== 'SUCCESS' ||
    !resBody.data ||
    !validator(resBody.data)
  ) {
    getLogger().info('responseBody: ' + JSON.stringify(resBody, null, 2));
    onFailure();
    return;
  }
  return resBody;
}
