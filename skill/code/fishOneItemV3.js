async function fishOneItem(bot) {
  // Check if there is a fishing rod in the inventory
  const fishingRod = bot.inventory.findInventoryItem(mcData.itemsByName.fishing_rod.id);
  if (!fishingRod) {
    bot.chat("I don't have a fishing rod.");
    return;
  }

  // Equip the fishing rod
  await bot.equip(fishingRod, "hand");

  // Find a body of water
  const waterBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const water = bot.findBlock({
      matching: mcData.blocksByName.water.id,
      maxDistance: 32
    });
    return water;
  });
  if (!waterBlock) {
    bot.chat("Could not find a body of water to fish in.");
    return;
  }

  // Go to the water block and look at the water
  await bot.pathfinder.goto(new GoalGetToBlock(waterBlock.position.x, waterBlock.position.y, waterBlock.position.z));
  await bot.lookAt(waterBlock.position);

  // Fish 1 item without moving or looking away
  await bot.fish();

  // Report the completion of the task
  bot.chat("Task completed: Fished 1 item.");
}