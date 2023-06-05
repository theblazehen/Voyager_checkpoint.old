async function craftMoreSnowBlocks(bot) {
  // Check if there are at least 16 snowballs in the inventory
  const snowballCount = bot.inventory.count(mcData.itemsByName.snowball.id);
  if (snowballCount < 16) {
    // Collect 8 more snowballs
    await mineBlock(bot, "snow", 8);
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

  // Craft 4 snow blocks using 16 snowballs
  await craftItem(bot, "snow_block", 4);

  // Report the completion of the task
  bot.chat("Task completed: Crafted 4 snow blocks.");
}