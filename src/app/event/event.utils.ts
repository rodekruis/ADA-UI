const RECENT_WINDOW = 365; // 60

export const isRecent = (date: string | number | Date) => {
  const today = new Date();
  const eventDate = new Date(date);

  const daysSince = Math.floor(
    (today.getTime() - eventDate.getTime()) / 1000 / 60 / 60 / 24
  );

  return daysSince < RECENT_WINDOW;
};

export default { isRecent };
