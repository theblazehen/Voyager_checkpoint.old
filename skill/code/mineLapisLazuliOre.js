async function mineLapisLazuliOre(bot) {
  // Check if the bot has a stone, iron, diamond, or netherite pickaxe in the inventory
  const pickaxe = bot.inventory.items().find(item => {
    return item.name === "stone_pickaxe" || item.name === "iron_pickaxe" || item.name === "diamond_pickaxe" || item.name === "netherite_pickaxe";
  });

  // Equip the appropriate pickaxe
  if (pickaxe) {
    await bot.equip(pickaxe, "hand");
  } else {
    // Report the absence of an appropriate pickaxe and exit
    bot.chat("I don't have a suitable pickaxe to mine Lapis Lazuli ore.");
    return;
  }

  // Find a lapis_ore block nearby or explore the surroundings to find one
  let lapisOre = bot.findBlock({
    matching: mcData.blocksByName["lapis_ore"].id,
    maxDistance: 32
  });
  if (!lapisOre) {
    lapisOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      return bot.findBlock({
        matching: mcData.blocksByName["lapis_ore"].id,
        maxDistance: 32
      });
    });
  }

  // Mine the lapis_ore block using the equipped pickaxe
  await mineBlock(bot, "lapis_ore");

  // Report the completion of the task
  bot.chat("Task completed: Mined 1 Lapis Lazuli ore.");
}