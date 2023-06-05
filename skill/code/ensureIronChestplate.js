async function ensureIronChestplate(bot) {
  // Check if the bot already has an iron chestplate in its inventory
  const ironChestplateCount = bot.inventory.count(mcData.itemsByName.iron_chestplate.id);
  if (ironChestplateCount > 0) {
    bot.chat("Task completed: Already have an iron chestplate in the inventory.");
    return;
  }

  // Craft an iron chestplate
  await craftIronChestplate(bot);
}