export default async function examineResponse(response: any) {
  if (response.raw.ok) {
    return await response.raw.json();
  }
}
