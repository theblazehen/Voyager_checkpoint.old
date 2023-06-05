async function mineCoalOre(bot) {
  // Check if the bot has a wooden_pickaxe in the inventory
  const woodenPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_pickaxe.id);

  // If the bot doesn't have a wooden_pickaxe, craft one
  if (!woodenPickaxe) {
    // Place a crafting table
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);

    // Craft a wooden_pickaxe
    await craftItem(bot, "wooden_pickaxe");
  }

  // Find a coal_ore block nearby
  let coalOre = bot.findBlock({
    matching: mcData.blocksByName["coal_ore"].id,
    maxDistance: 32
  });

  // If no coal_ore block is found, explore the surroundings to find one
  if (!coalOre) {
    coalOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      return bot.findBlock({
        matching: mcData.blocksByName["coal_ore"].id,
        maxDistance: 32
      });
    });
  }

  // Equip the wooden_pickaxe and mine the coal_ore block
  await bot.equip(mcData.itemsByName.wooden_pickaxe.id, "hand");
  await mineBlock(bot, "coal_ore");

  // Report the completion of the task
  bot.chat("Task completed: Mined 1 coal ore.");
}