async function placeChest(bot) {
  // Check if there is a chest in the inventory
  const chest = bot.inventory.findInventoryItem(mcData.itemsByName.chest.id);
  if (chest) {
    // Place the chest near the player
    const chestPosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "chest", chestPosition);
    bot.chat("Task completed: Placed a chest.");
  } else {
    bot.chat("Task failed: No chest in inventory.");
  }
}