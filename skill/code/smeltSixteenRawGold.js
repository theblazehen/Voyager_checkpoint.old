async function smeltSixteenRawGold(bot) {
  // Check if there are 16 raw gold in the inventory
  const rawGoldCount = bot.inventory.count(mcData.itemsByName.raw_gold.id);
  if (rawGoldCount < 16) {
    await mineBlock(bot, "gold_ore", 16 - rawGoldCount);
  }

  // Check if there is a furnace in the inventory
  const furnaceCount = bot.inventory.count(mcData.itemsByName.furnace.id);
  if (furnaceCount < 1) {
    await craftItem(bot, "furnace");
  }

  // Find a suitable position to place the furnace on an air block
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  let furnacePosition = null;
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const block = bot.blockAt(position);
    if (block.name === "air") {
      furnacePosition = position;
      break;
    }
  }

  // Place the furnace
  await placeItem(bot, "furnace", furnacePosition);

  // Check if there is enough coal in the inventory
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 2) {
    await mineBlock(bot, "coal_ore", 2 - coalCount);
  }

  // Smelt the 16 raw gold using the furnace and coal as fuel
  await smeltItem(bot, "raw_gold", "coal", 16);

  // Report the completion of the task
  bot.chat("Task completed: Smelted 16 raw gold into gold ingots.");
}