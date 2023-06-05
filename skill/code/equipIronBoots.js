async function equipIronBoots(bot) {
  // Check if the bot has iron boots in its inventory
  const ironBoots = bot.inventory.findInventoryItem(mcData.itemsByName.iron_boots.id);
  if (ironBoots) {
    // Equip the iron boots
    await bot.equip(ironBoots, "feet");
    bot.chat("Task completed: Equipped iron boots.");
  } else {
    bot.chat("Task failed: No iron boots in inventory.");
  }
}