async function eatCookedSalmonIfHungry(bot) {
  // Check if the bot's hunger is less than 20
  if (bot.food < 20) {
    // Call the eatCookedSalmon function to eat 1 cooked salmon
    await eatCookedSalmon(bot);
  } else {
    // Notify the user that the task is not necessary because the hunger is already full
    bot.chat("Task not necessary: Cannot eat cooked salmon because hunger is already full.");
  }
}