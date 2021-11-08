export default function examineResBody(resBody: any, context: string) {
  // console.log(`resBody ${resBody}`);
  // console.log(`resBody.status ${resBody.status}`);
  // console.log(`resBody.data ${resBody.data}`);
  // console.log(`resBody.data ${JSON.stringify(resBody)}`);

  if (!resBody || resBody.status !== "SUCCESS" || !resBody.data) {
    alert(`${context} 실패`);
    throw new Error(`${context} 실패`);
  }
  return resBody;
}
