async function smeltThreeIronOres(bot) {
  // Check if there are 3 iron ores in the inventory
  const ironOreCount = bot.inventory.count(mcData.itemsByName.raw_iron.id);
  if (ironOreCount < 3) {
    await mineBlock(bot, "iron_ore", 3 - ironOreCount);
  }

  // Check if there is a furnace in the inventory
  const furnaceCount = bot.inventory.count(mcData.itemsByName.furnace.id);
  if (furnaceCount < 1) {
    await craftItem(bot, "furnace");
  }

  // Place the furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Check if there is enough coal in the inventory
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 1) {
    await mineBlock(bot, "coal_ore");
  }

  // Smelt the 3 iron ores using the furnace and coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 3);

  // Report the completion of the task
  bot.chat("Task completed: Smelted 3 iron ores into iron ingots.");
}