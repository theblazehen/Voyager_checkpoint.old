async function craftTorchesWithTable(bot) {
  // Check if there is a coal in the inventory. If not, mine a coal_ore block.
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 1) {
    await mineBlock(bot, "coal_ore");
  }

  // Check if there is a stick in the inventory. If not, craft a stick using spruce_planks.
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (stickCount < 1) {
    await craftItem(bot, "stick");
  }

  // Check if there is a crafting table nearby or in the inventory
  let craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTableCount = bot.inventory.count(mcData.itemsByName.crafting_table.id);
    if (craftingTableCount < 1) {
      // Craft a crafting table using spruce_planks
      await craftItem(bot, "crafting_table");
    }
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    craftingTable = bot.blockAt(craftingTablePosition);
  }

  // Craft 4 torches using 1 coal and 1 stick with a crafting table
  await craftItem(bot, "torch");

  // Report the completion of the task
  bot.chat("Task completed: Crafted 4 torches with a crafting table.");
}