export default function getLogger() {
  return {
    info: (message: string) => {
      console.log(message);
    },
  };
}
