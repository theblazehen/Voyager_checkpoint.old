async function mineFiveIronOres(bot) {
  // Find 5 iron_ore blocks nearby or explore the surroundings to find them
  const ironOres = bot.findBlocks({
    matching: mcData.blocksByName["iron_ore"].id,
    maxDistance: 32,
    count: 5
  });
  if (ironOres.length < 5) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundIronOres = bot.findBlocks({
        matching: mcData.blocksByName["iron_ore"].id,
        maxDistance: 32,
        count: 5
      });
      return foundIronOres.length >= 5;
    });
  }

  // Mine the 5 iron_ore blocks using the stone_pickaxe or higher-tier pickaxe
  await mineBlock(bot, "iron_ore", 5);

  // Report the completion of the task
  bot.chat("Task completed: Mined 5 iron ores.");
}