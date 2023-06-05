async function craftFishingRod(bot) {
  // Check if there is a crafting table nearby or in the inventory
  let craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTableCount = bot.inventory.count(mcData.itemsByName.crafting_table.id);
    if (craftingTableCount < 1) {
      // Craft a crafting table using spruce_planks
      await craftItem(bot, "crafting_table");
    }
    // Find a suitable position on a solid block to place the crafting table
    const suitablePosition = bot.entity.position.floored();
    for (let y = bot.entity.position.y - 1; y <= bot.entity.position.y + 1; y++) {
      for (let x = bot.entity.position.x - 1; x <= bot.entity.position.x + 1; x++) {
        for (let z = bot.entity.position.z - 1; z <= bot.entity.position.z + 1; z++) {
          const currentPosition = new Vec3(x, y, z);
          const currentBlock = bot.blockAt(currentPosition);
          const blockAbove = bot.blockAt(currentPosition.offset(0, 1, 0));
          if (currentBlock && currentBlock.boundingBox === "block" && blockAbove.name === "air") {
            suitablePosition.set(x, y + 1, z);
            break;
          }
        }
      }
    }
    await placeItem(bot, "crafting_table", suitablePosition);
    craftingTable = bot.blockAt(suitablePosition);
  }

  // Check if there are enough sticks and strings in the inventory
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  const stringCount = bot.inventory.count(mcData.itemsByName.string.id);
  if (stickCount < 3) {
    // Craft sticks using spruce_planks
    await craftItem(bot, "stick", 1);
  }
  if (stringCount < 2) {
    // Kill spiders to obtain more strings
    for (let i = 0; i < 2 - stringCount; i++) {
      await killMob(bot, "spider");
    }
  }

  // Craft the fishing rod using 3 sticks and 2 strings
  await craftItem(bot, "fishing_rod");

  // Report the completion of the task
  bot.chat("Task completed: Crafted a fishing rod.");
}