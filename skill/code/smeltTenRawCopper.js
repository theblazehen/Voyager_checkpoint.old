async function smeltTenRawCopper(bot) {
  // Check if there are 10 raw copper in the inventory
  const rawCopperCount = bot.inventory.count(mcData.itemsByName.raw_copper.id);
  if (rawCopperCount < 10) {
    await mineBlock(bot, "copper_ore", 10 - rawCopperCount);
  }

  // Check if there is a furnace in the inventory
  const furnaceCount = bot.inventory.count(mcData.itemsByName.furnace.id);
  if (furnaceCount < 1) {
    await craftItem(bot, "furnace");
  }

  // Find a suitable position to place the furnace without any obstruction
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

  // Smelt the 10 raw copper using the furnace and coal as fuel
  await smeltItem(bot, "raw_copper", "coal", 10);

  // Report the completion of the task
  bot.chat("Task completed: Smelted 10 raw copper into copper ingots.");
}