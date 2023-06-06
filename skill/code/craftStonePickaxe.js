async function craftStonePickaxe(bot) {
  // Check if there is a stone pickaxe in the inventory
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);

  // If there is no stone pickaxe, craft one
  if (!stonePickaxe) {
    // Check if there are enough cobblestone and sticks in the inventory
    const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
    const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);

    // If there are not enough cobblestone, mine cobblestone
    if (cobblestoneCount < 3) {
      await mineBlock(bot, "stone", 3 - cobblestoneCount);
    }

    // If there are not enough sticks, craft sticks
    if (stickCount < 2) {
      await craftItem(bot, "stick", 1);
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

    // Craft the stone pickaxe using 3 cobblestone and 2 sticks
    await craftItem(bot, "stone_pickaxe");
  }

  // Report the completion of the task
  bot.chat("Task completed: Crafted a stone pickaxe.");
}