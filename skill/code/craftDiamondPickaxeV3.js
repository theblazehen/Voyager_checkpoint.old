async function craftDiamondPickaxeV3(bot) {
  // Check if there are enough diamonds in the inventory
  const diamondCount = bot.inventory.count(mcData.itemsByName.diamond.id);
  if (diamondCount < 3) {
    // Explore the surroundings to find diamond_ore
    let diamondOre = null;
    while (!diamondOre) {
      diamondOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
        return bot.findBlock({
          matching: mcData.blocksByName["diamond_ore"].id,
          maxDistance: 32
        });
      });
    }

    // Mine diamond ores using the iron pickaxe
    await mineBlock(bot, "diamond_ore", 3 - diamondCount);
  }

  // Check if there are enough sticks in the inventory
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (stickCount < 2) {
    // Craft sticks using spruce_planks
    await craftItem(bot, "stick", 1);
  }

  // Check if there is a crafting table nearby
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // Place a crafting table if not already placed
  if (!craftingTable) {
    const suitableBlock = await findSuitableBlock(bot);
    if (!suitableBlock) {
      bot.chat("No suitable block found to place the crafting table.");
      return;
    }
    const craftingTablePosition = suitableBlock.position.offset(0, 1, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Craft the diamond pickaxe using 3 diamonds and 2 sticks
  await craftItem(bot, "diamond_pickaxe");

  // Report the completion of the task
  bot.chat("Task completed: Crafted a diamond pickaxe.");
}