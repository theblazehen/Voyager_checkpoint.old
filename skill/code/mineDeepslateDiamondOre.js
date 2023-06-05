async function mineDeepslateDiamondOre(bot) {
  // Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Find a deepslate_diamond_ore block nearby or explore the surroundings to find one
  let deepslateDiamondOre = bot.findBlock({
    matching: mcData.blocksByName["deepslate_diamond_ore"].id,
    maxDistance: 32
  });
  if (!deepslateDiamondOre) {
    deepslateDiamondOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      return bot.findBlock({
        matching: mcData.blocksByName["deepslate_diamond_ore"].id,
        maxDistance: 32
      });
    });
  }

  // Mine the deepslate_diamond_ore block using the iron_pickaxe
  await mineBlock(bot, "deepslate_diamond_ore");

  // Report the completion of the task
  bot.chat("Task completed: Mined 1 deepslate diamond ore.");
}