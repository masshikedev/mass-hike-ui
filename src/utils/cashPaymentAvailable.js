export default (times, pickupStart) => {
  for (let i = 0; i < times.length; i++) {
    if (times[i].date > Date.now() && times[i].date < pickupStart) {
      return true;
    }
  }
  return false;
};
