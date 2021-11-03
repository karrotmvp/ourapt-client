export default function examineResBody(resBody: any, context: string) {
  if (!resBody || resBody.status !== "SUCCESS" || !resBody.data) {
    alert(`${context} 실패`);
    throw new Error(`${context} 실패`);
  }
  return;
}
