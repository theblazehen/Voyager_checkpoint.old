async function craftShield(bot) {
  // Check if there is already a shield in the inventory
  if (bot.inventory.count(mcData.itemsByName.shield.id) > 0) {
    bot.chat("Task completed: Already have a shield in the inventory.");
    return;
  }

  // Check if there are enough spruce planks in the inventory
  let sprucePlankCount = bot.inventory.count(mcData.itemsByName.spruce_planks.id);
  if (sprucePlankCount < 6) {
    let spruceLogCount = bot.inventory.count(mcData.itemsByName.spruce_log.id);
    if (spruceLogCount < 2) {
      await mineBlock(bot, "spruce_log", 2 - spruceLogCount);
    }
    await craftItem(bot, "spruce_planks", 2);
  }

  // Check if there is an iron ingot in the inventory
  if (bot.inventory.count(mcData.itemsByName.iron_ingot.id) < 1) {
    const ironOreCount = bot.inventory.count(mcData.itemsByName.raw_iron.id);
    if (ironOreCount < 1) {
      await mineBlock(bot, "iron_ore");
    }
    await smeltItem(bot, "raw_iron", "coal");
  }

  // Find or place a crafting table
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Craft a shield using the spruce planks and iron ingot
  await craftItem(bot, "shield");

  // Report the completion of the task
  bot.chat("Task completed: Crafted a shield.");
}