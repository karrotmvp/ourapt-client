const logger = {
  info: (message: string) => {
    // alert(message);
    console.log(message);
  },
};

export default function getLogger() {
  return logger;
}
