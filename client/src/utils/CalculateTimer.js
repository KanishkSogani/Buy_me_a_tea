export const calculateRemainingTime = (nextClaim) => {
  // Get the current date and time in UTC
  const now = new Date();

  let diff = nextClaim * 1000 - now.getTime();
  console.log(nextClaim);
  if (diff < 0) diff = 0;

  // Convert the difference to hours, minutes, and seconds
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  // Format the remaining time as a string in the "23:00:00" format
  const remainingTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return remainingTime;
};
