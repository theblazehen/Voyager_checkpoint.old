async function equipIronChestplate(bot) {
  // Check if the bot has an iron chestplate in its inventory
  const ironChestplate = bot.inventory.findInventoryItem(mcData.itemsByName.iron_chestplate.id);
  if (ironChestplate) {
    // Equip the iron chestplate
    await bot.equip(ironChestplate, "torso");
    bot.chat("Task completed: Equipped iron chestplate.");
  } else {
    bot.chat("Task failed: No iron chestplate in inventory.");
  }
}