async function craftShears(bot) {
  // Check if there is a crafting table nearby
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // Place a crafting table if not already placed
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Craft the shears using 2 iron ingots
  await craftItem(bot, "shears");

  // Report the completion of the task
  bot.chat("Task completed: Crafted a pair of shears.");
}