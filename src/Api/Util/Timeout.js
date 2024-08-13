export function callWithTimeout(promise, ms) {
    if (ms === undefined) {ms = defaultTimeoutMs;}

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("Could not connect to server"))
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    })
}

export const defaultTimeoutMs = 8000;