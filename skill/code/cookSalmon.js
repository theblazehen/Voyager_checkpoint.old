async function cookSalmon(bot) {
  // 1) Check if there is a furnace in the inventory, if not, craft one
  const furnaceCount = bot.inventory.count(mcData.itemsByName.furnace.id);
  if (furnaceCount < 1) {
    await craftItem(bot, "furnace");
  }

  // 2) Find a suitable position to place the furnace and place it
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // 3) Check if there is enough coal in the inventory, if not, mine a coal_ore block
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 1) {
    await mineBlock(bot, "coal_ore");
  }

  // 4) Cook the salmon using the furnace and coal as fuel
  await smeltItem(bot, "salmon", "coal");

  // 5) Report the completion of the task
  bot.chat("Task completed: Cooked 1 salmon.");
}