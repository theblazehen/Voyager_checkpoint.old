async function mineDeepslateIronOre(bot) {
  // Find a deepslate_iron_ore block nearby or explore the surroundings to find one
  let deepslateIronOre = bot.findBlock({
    matching: mcData.blocksByName["deepslate_iron_ore"].id,
    maxDistance: 32
  });
  if (!deepslateIronOre) {
    deepslateIronOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      return bot.findBlock({
        matching: mcData.blocksByName["deepslate_iron_ore"].id,
        maxDistance: 32
      });
    });
  }

  // Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Mine the deepslate_iron_ore block using the iron_pickaxe
  await mineBlock(bot, "deepslate_iron_ore");

  // Report the completion of the task
  bot.chat("Task completed: Mined 1 deepslate iron ore.");
}