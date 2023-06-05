async function obtainString(bot) {
  // 1) Equip the wooden sword
  const woodenSword = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_sword.id);
  if (!woodenSword) {
    bot.chat("Wooden sword not found in inventory.");
    return;
  }
  await bot.equip(woodenSword, "hand");

  // 2) Explore the surroundings to find a spider
  const spider = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    return bot.nearestEntity(entity => {
      return entity.name === "spider" && entity.position.distanceTo(bot.entity.position) < 32;
    });
  });

  // 3) Kill the spider to obtain the string
  if (spider) {
    await killMob(bot, "spider");
    bot.chat("Task completed: Obtained 1 string.");
  } else {
    bot.chat("Task failed: Could not find a spider.");
  }
}