async function smeltSixRawIron(bot) {
  // Check if there is a furnace in the inventory
  const furnaceCount = bot.inventory.count(mcData.itemsByName.furnace.id);
  if (furnaceCount < 1) {
    await craftItem(bot, "furnace");
  }

  // Find a suitable position to place the furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);

  // Place the furnace
  await placeItem(bot, "furnace", furnacePosition);

  // Check if there is enough coal in the inventory. If not, mine a coal_ore block.
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 1) {
    await mineBlock(bot, "coal_ore");
  }

  // Smelt the 6 raw iron using coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 6);

  // Report the completion of the task
  bot.chat("Task completed: Smelted 6 raw iron into iron ingots.");
}