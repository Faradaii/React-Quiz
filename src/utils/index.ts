function numToTime(num: number): string { 
  const minutes = Math.floor((num % 3600) / 60);
  const seconds = num % 60;

  let minutesStr: string = minutes.toString();
  let secondsStr: string = seconds.toString();

  if (minutesStr.length < 2) {
    minutesStr = '0' + minutesStr;
  }

  if (secondsStr.length < 2) {
    secondsStr = '0' + secondsStr;
  }

  return minutesStr + ":" + secondsStr;
}

function decodeBase64 (str: string) {
  try {
      return atob(str);
  } catch (e) {
      return str;
  }
}

function shuffleArray (array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export { numToTime, decodeBase64, shuffleArray }