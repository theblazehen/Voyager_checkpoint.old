async function craftFurnace(bot) {
  // Check if the bot has a furnace in its inventory
  const furnaceCount = bot.inventory.count(mcData.itemsByName.furnace.id);
  if (furnaceCount > 0) {
    bot.chat("Task completed: Already have a furnace in the inventory.");
    return;
  }

  // Mine 8 cobblestone blocks if not enough in the inventory
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (cobblestoneCount < 8) {
    await mineBlock(bot, "stone", 8 - cobblestoneCount);
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

  // Craft the furnace using 8 cobblestone blocks
  await craftItem(bot, "furnace");

  // Report the completion of the task
  bot.chat("Task completed: Crafted a furnace.");
}