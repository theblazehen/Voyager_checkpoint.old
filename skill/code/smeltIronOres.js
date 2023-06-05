async function smeltIronOres(bot) {
  // Check if there is enough coal in the inventory. If not, mine a coal_ore block.
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 1) {
    await mineBlock(bot, "coal_ore");
  }

  // Find a suitable position to place the furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);

  // Place the furnace
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt the 3 iron ores using coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 3);

  // Report the completion of the task
  bot.chat("Task completed: Smelted 3 iron ores into iron ingots.");
}