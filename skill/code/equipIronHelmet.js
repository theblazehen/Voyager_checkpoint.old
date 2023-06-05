async function equipIronHelmet(bot) {
  // Check if the bot has an iron helmet in its inventory
  const ironHelmet = bot.inventory.findInventoryItem(mcData.itemsByName.iron_helmet.id);
  if (ironHelmet) {
    // Equip the iron helmet
    await bot.equip(ironHelmet, "head");
    bot.chat("Task completed: Equipped iron helmet.");
  } else {
    bot.chat("Task failed: No iron helmet in inventory.");
  }
}