async function eatCookedSalmon(bot) {
  // Check if the bot's health is greater than 0
  if (bot.health > 0) {
    // Check if the bot's hunger is less than 20
    if (bot.food < 20) {
      // Equip the cooked salmon to the bot's hand
      const cookedSalmon = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_salmon.id);
      await bot.equip(cookedSalmon, "hand");

      // Consume the cooked salmon
      await bot.consume();

      // Report the completion of the task
      bot.chat("Task completed: Ate 1 cooked salmon.");
    } else {
      // Notify the user that the task is not necessary because the hunger is already full
      bot.chat("Task not necessary: Cannot eat cooked salmon because hunger is already full.");
    }
  } else {
    // Notify the user that the task cannot be completed due to low health
    bot.chat("Task failed: Cannot eat cooked salmon due to low health.");
  }
}