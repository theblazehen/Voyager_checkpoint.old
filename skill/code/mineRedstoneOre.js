async function mineRedstoneOre(bot) {
  // Find a redstone_ore block nearby or explore the surroundings to find one
  let redstoneOre = bot.findBlock({
    matching: mcData.blocksByName["redstone_ore"].id,
    maxDistance: 32
  });
  if (!redstoneOre) {
    redstoneOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      return bot.findBlock({
        matching: mcData.blocksByName["redstone_ore"].id,
        maxDistance: 32
      });
    });
  }

  // Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Mine the redstone_ore block using the iron_pickaxe
  await mineBlock(bot, "redstone_ore");

  // Report the completion of the task
  bot.chat("Task completed: Mined 1 redstone ore.");
}