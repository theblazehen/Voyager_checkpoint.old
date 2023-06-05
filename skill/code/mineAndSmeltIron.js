async function mineAndSmeltIron(bot) {
  // Find 3 iron_ore blocks nearby or explore the surroundings to find them
  const ironOres = bot.findBlocks({
    matching: mcData.blocksByName["iron_ore"].id,
    maxDistance: 32,
    count: 3
  });
  if (ironOres.length < 3) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundIronOres = bot.findBlocks({
        matching: mcData.blocksByName["iron_ore"].id,
        maxDistance: 32,
        count: 3
      });
      return foundIronOres.length >= 3;
    });
  }

  // Mine the 3 iron_ore blocks using the stone_pickaxe
  await mineBlock(bot, "iron_ore", 3);

  // Place a furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt the 3 raw_iron into 3 iron_ingots using coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 3);

  // Report the completion of the task
  bot.chat("Task completed: Mined and smelted 3 iron ingots.");
}