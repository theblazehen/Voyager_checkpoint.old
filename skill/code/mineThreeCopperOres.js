async function mineThreeCopperOres(bot) {
  // Check if the bot has a stone_pickaxe in the inventory
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);

  // If the bot doesn't have a stone_pickaxe, craft one
  if (!stonePickaxe) {
    // Place a crafting table
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);

    // Craft a stone_pickaxe
    await craftItem(bot, "stone_pickaxe");
  }

  // Mine 3 copper_ore blocks using the stone_pickaxe
  await mineBlock(bot, "copper_ore", 3);

  // Report the completion of the task
  bot.chat("Task completed: Mined 3 copper ores.");
}