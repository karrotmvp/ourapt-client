const logger =
  process.env.REACT_APP_ENV === "alpha" || process.env.REACT_APP_ENV === "MSW"
    ? {
        log: (message: string) => {
          console.log(message);
        },
        POP: (message: string) => {
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
    : {};

export default function getLogger() {
  return logger;
}
