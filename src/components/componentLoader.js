
const componentLoader = (lazyComponent, attemptsLeft = 2) => new Promise((resolve, reject) => {
  lazyComponent()
    .then(resolve)
    .catch((error) => {
      setTimeout(() => {
        if (attemptsLeft === 1) {
          reject(error);
          return;
        }
        componentLoader(lazyComponent, attemptsLeft - 1)
          .then(resolve, reject);
      }, 1500);
    });
});

export default componentLoader;
