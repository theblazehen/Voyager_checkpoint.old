async function mineThreeGoldOres(bot) {
  // Check if the bot has an iron_pickaxe in the inventory
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);

  // If the bot doesn't have an iron_pickaxe, craft one
  if (!ironPickaxe) {
    // Place a crafting table
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);

    // Craft an iron_pickaxe
    await craftItem(bot, "iron_pickaxe");
  }

  // Explore the surroundings to find gold_ore blocks
  const goldOres = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const foundGoldOres = bot.findBlocks({
      matching: mcData.blocksByName["gold_ore"].id,
      maxDistance: 32,
      count: 3
    });
    return foundGoldOres.length >= 3;
  });

  // Mine the 3 gold_ore blocks using the iron_pickaxe
  await mineBlock(bot, "gold_ore", 3);

  // Place a furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt the 3 gold_ore into gold_ingots using coal as fuel
  await smeltItem(bot, "gold_ore", "coal", 3);

  // Report the completion of the task
  bot.chat("Task completed: Mined and smelted 3 gold ores into gold ingots.");
}