async function craftIronPickaxe(bot) {
  // Check if there is enough coal in the inventory. If not, mine a coal_ore block.
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 1) {
    await mineBlock(bot, "coal_ore");
  }

  // Check if there are enough iron ingots in the inventory
  const ironIngotCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  if (ironIngotCount < 3) {
    // Place a furnace if not already placed
    const furnace = bot.findBlock({
      matching: mcData.blocksByName.furnace.id,
      maxDistance: 32
    });
    if (!furnace) {
      const furnacePosition = bot.entity.position.offset(1, 0, 0);
      await placeItem(bot, "furnace", furnacePosition);
    }
    // Smelt raw_iron to get more iron ingots
    await smeltItem(bot, "raw_iron", "coal", 3 - ironIngotCount);
  }

  // Check if there are enough sticks in the inventory
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (stickCount < 2) {
    // Craft sticks using spruce_planks
    await craftItem(bot, "stick", 1);
  }

  // Place a crafting table if not already placed
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Craft the iron pickaxe using 3 iron ingots and 2 sticks
  await craftItem(bot, "iron_pickaxe");

  // Report the completion of the task
  bot.chat("Task completed: Crafted an iron pickaxe.");
}