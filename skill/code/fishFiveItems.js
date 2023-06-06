async function fishFiveItems(bot) {
  // Check if there is a fishing rod in the inventory
  const fishingRod = bot.inventory.findInventoryItem(mcData.itemsByName.fishing_rod.id);
  if (!fishingRod) {
    // Craft a fishing rod
    await craftItem(bot, "fishing_rod");
  }

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

  // Equip the fishing rod
  await bot.equip(fishingRod, "hand");

  // Fish 5 items
  for (let i = 0; i < 5; i++) {
    await bot.pathfinder.goto(new GoalGetToBlock(waterBlock.position.x, waterBlock.position.y, waterBlock.position.z));
    await bot.fish();
    bot.chat(`Fished ${i + 1} item(s).`);
  }

  // Report the completion of the task
  bot.chat("Task completed: Fished 5 items.");
}