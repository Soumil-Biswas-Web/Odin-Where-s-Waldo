interface timer {
  startTime: Date;
}

function timer(time: timer, setTime: Function): void {
  const start: Date = time.startTime;
  const now: Date = new Date();
  const escapedTime: number = now.valueOf() - start.valueOf();

  let min: number | string = Math.floor((escapedTime / (1000 * 60)) % 60);
  let sec: number | string = Math.floor((escapedTime / 1000) % 60);
  let mil: number | string = Math.floor((escapedTime % 1000) / 10);

  min <= 9 ? (min = `0` + min + `:`) : (min = min + `:`);
  min === `00:` ? (min = ``) : (min = min);
  sec <= 9 ? (sec = `0` + sec + `:`) : (sec = sec + `:`);
  mil <= 9 ? (mil = `0` + mil) : (mil = mil);

  setTime({
    ...time,
    currentTime: `${min}${sec}${mil}`,
  });
}

export default timer;
