async function findSuitableBlock(bot) {
  const nearbyBlocks = bot.findBlocks({
    matching: block => {
      return block.name !== "air";
    },
    maxDistance: 32,
    count: 10
  });
  for (const blockPos of nearbyBlocks) {
    const block = bot.blockAt(blockPos);
    const aboveBlock = bot.blockAt(blockPos.offset(0, 1, 0));
    if (aboveBlock.name === "air") {
      return block;
    }
  }
  return null;
}

async function craftIronSword(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngotCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  if (ironIngotCount < 2) {
    // Mine more iron_ore if needed
    const ironOreCount = bot.inventory.count(mcData.itemsByName.raw_iron.id);
    if (ironOreCount < 2) {
      await mineBlock(bot, "iron_ore", 2 - ironOreCount);
    }

    // Smelt raw_iron to get more iron ingots
    await smeltItem(bot, "raw_iron", "coal", 2);
  }

  // Check if there is a stick in the inventory
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (stickCount < 1) {
    // Craft a stick using spruce_planks
    await craftItem(bot, "stick");
  }

  // Check if there is a crafting table nearby
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // Place a crafting table if not already placed
  if (!craftingTable) {
    const suitableBlock = await findSuitableBlock(bot);
    if (!suitableBlock) {
      bot.chat("No suitable block found to place the crafting table.");
      return;
    }
    const craftingTablePosition = suitableBlock.position.offset(0, 1, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Craft the iron sword using 2 iron ingots and 1 stick
  await craftItem(bot, "iron_sword");

  // Report the completion of the task
  bot.chat("Task completed: Crafted an iron sword.");
}