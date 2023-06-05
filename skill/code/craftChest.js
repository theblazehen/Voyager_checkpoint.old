async function craftChest(bot) {
  // Check if there is a chest in the inventory
  const chestCount = bot.inventory.count(mcData.itemsByName.chest.id);
  if (chestCount > 0) {
    bot.chat("Task completed: Already have a chest in the inventory.");
    return;
  }

  // Check if there are enough spruce_planks in the inventory
  const sprucePlankCount = bot.inventory.count(mcData.itemsByName.spruce_planks.id);
  if (sprucePlankCount < 8) {
    // Mine spruce_log if not enough in the inventory
    const spruceLogCount = bot.inventory.count(mcData.itemsByName.spruce_log.id);
    if (spruceLogCount < 2) {
      await mineBlock(bot, "spruce_log", 2 - spruceLogCount);
    }
    // Craft 4 spruce_planks using 2 spruce_log
    await craftItem(bot, "spruce_planks", 2);
  }

  // Place a crafting table if not already placed
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Craft the chest using 8 spruce_planks
  await craftItem(bot, "chest");

  // Report the completion of the task
  bot.chat("Task completed: Crafted a chest.");
}