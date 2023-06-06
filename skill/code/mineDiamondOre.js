async function mineDiamondOre(bot) {
  // Check if the bot has an iron, diamond, or netherite pickaxe in the inventory
  const pickaxe = bot.inventory.items().find(item => {
    return item.name === "iron_pickaxe" || item.name === "diamond_pickaxe" || item.name === "netherite_pickaxe";
  });

  // If the bot doesn't have a suitable pickaxe, craft an iron pickaxe
  if (!pickaxe) {
    await craftIronPickaxe(bot);
  }

  // Go to level 11 (Y-coordinate) to start mining for diamonds
  const targetY = 11;
  const currentPosition = bot.entity.position;
  const targetPosition = new Vec3(currentPosition.x, targetY, currentPosition.z);
  await bot.pathfinder.goto(new GoalXZ(targetPosition.x, targetPosition.z));

  // Use the exploreUntil function to find a diamond_ore block
  const diamondOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    return bot.findBlock({
      matching: mcData.blocksByName["diamond_ore"].id,
      maxDistance: 32
    });
  });

  // Equip the suitable pickaxe and mine the diamond_ore block
  await bot.equip(pickaxe, "hand");
  await mineBlock(bot, "diamond_ore");

  // Report the completion of the task
  bot.chat("Task completed: Mined 1 diamond ore.");
}