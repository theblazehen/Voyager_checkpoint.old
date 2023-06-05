async function smeltCopperOre(bot) {
  // Check if there is enough coal in the inventory. If not, mine a coal_ore block.
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 1) {
    await mineBlock(bot, "coal_ore");
  }

  // Mine a copper_ore block
  await mineBlock(bot, "copper_ore");

  // Find a suitable position to place the furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);

  // Place the furnace
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt the copper ore using coal as fuel
  await smeltItem(bot, "copper_ore", "coal");

  // Report the completion of the task
  bot.chat("Task completed: Smelted 1 copper ore into a copper ingot.");
}