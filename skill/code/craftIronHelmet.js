async function craftIronHelmet(bot) {
  // Check if there is a crafting table nearby
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // Place a crafting table if not already placed
  if (!craftingTable) {
    const craftingTableCount = bot.inventory.count(mcData.itemsByName.crafting_table.id);
    if (craftingTableCount < 1) {
      // Craft a crafting table using spruce_planks
      await craftItem(bot, "crafting_table");
    }
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Craft the iron helmet using 5 iron ingots
  await craftItem(bot, "iron_helmet");

  // Report the completion of the task
  bot.chat("Task completed: Crafted an iron helmet.");
}