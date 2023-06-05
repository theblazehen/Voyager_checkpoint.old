async function craftBow(bot) {
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

  // Check if there are enough sticks and strings in the inventory
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  const stringCount = bot.inventory.count(mcData.itemsByName.string.id);
  if (stickCount < 3) {
    // Craft sticks using spruce_planks
    await craftItem(bot, "stick", 1);
  }
  if (stringCount < 3) {
    // Kill spiders to obtain more strings
    for (let i = 0; i < 3 - stringCount; i++) {
      await killMob(bot, "spider");
    }
  }

  // Craft the bow using 3 sticks and 3 strings
  await craftItem(bot, "bow");

  // Report the completion of the task
  bot.chat("Task completed: Crafted a bow.");
}