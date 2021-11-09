const logger = {
  info: (message: string) => {
    console.log(message);
  },
};

export default function getLogger() {
  return logger;
}
