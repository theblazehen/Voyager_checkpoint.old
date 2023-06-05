async function killSalmonForRawFish(bot) {
  // 1) Check if there is a wooden sword in the inventory, if not, craft one
  let woodenSword = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_sword.id);
  if (!woodenSword) {
    await craftItem(bot, "wooden_sword");
    woodenSword = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_sword.id);
  }

  // 2) Equip the wooden sword
  await bot.equip(woodenSword, "hand");

  // 3) Explore the surroundings to find a salmon
  const salmon = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    return bot.nearestEntity(entity => {
      return entity.name === "salmon" && entity.position.distanceTo(bot.entity.position) < 32;
    });
  });

  // 4) Kill the salmon to obtain the raw fish
  if (salmon) {
    await killMob(bot, "salmon");
    bot.chat("Task completed: Killed 1 salmon for raw fish.");
  } else {
    bot.chat("Task failed: Could not find a salmon.");
  }
}