const logOptions =
  process.env.REACT_APP_ENV === "alpha" || process.env.REACT_APP_ENV === "MSW";

const voidFC = (message: string) => {};

const logger = logOptions
  ? {
      log: (message: string) => {
        console.log(message);
      },
      alert: (message: string) => {
        alert(message);
      },
      data: (message: string) => {
        // alert(message);
        // console.info(message);
      },
      error: (message: string) => {
        console.error(message);
      },
    }
  : { log: voidFC, alert: voidFC, data: voidFC, error: voidFC };

export default function getLogger() {
  return logger;
}
