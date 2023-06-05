async function obtainFlint(bot) {
  // Check if the bot already has flint in the inventory
  const flintCount = bot.inventory.count(mcData.itemsByName.flint.id);
  if (flintCount > 0) {
    bot.chat("Task completed: Already have flint in the inventory.");
    return;
  }

  // Check if the bot has gravel in the inventory
  const gravelCount = bot.inventory.count(mcData.itemsByName.gravel.id);
  if (gravelCount === 0) {
    // Explore the surroundings to find gravel
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const gravel = bot.findBlock({
        matching: mcData.blocksByName["gravel"].id,
        maxDistance: 32
      });
      return gravel;
    });
  }

  // Mine gravel blocks until the bot obtains 1 flint
  let obtainedFlint = false;
  while (!obtainedFlint) {
    await mineBlock(bot, "gravel");
    // Check if the bot has flint in the inventory after mining the gravel block
    const newFlintCount = bot.inventory.count(mcData.itemsByName.flint.id);
    if (newFlintCount > flintCount) {
      obtainedFlint = true;
    }
  }

  // Report the completion of the task
  bot.chat("Task completed: Obtained 1 flint.");
}