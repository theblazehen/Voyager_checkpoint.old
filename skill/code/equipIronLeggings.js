async function equipIronLeggings(bot) {
  // Check if the bot has iron leggings in its inventory
  const ironLeggings = bot.inventory.findInventoryItem(mcData.itemsByName.iron_leggings.id);
  if (ironLeggings) {
    // Equip the iron leggings
    await bot.equip(ironLeggings, "legs");
    bot.chat("Task completed: Equipped iron leggings.");
  } else {
    bot.chat("Task failed: No iron leggings in inventory.");
  }
}