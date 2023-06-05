async function equipIronSword(bot) {
  // Check if the bot has an iron sword in its inventory
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  if (ironSword) {
    // Equip the iron sword
    await bot.equip(ironSword, "hand");
    bot.chat("Task completed: Equipped iron sword.");
  } else {
    bot.chat("Task failed: No iron sword in inventory.");
  }
}