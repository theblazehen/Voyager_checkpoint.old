async function openAndCheckChestAt1365(bot) {
  // Move to the chest at (1365, 11, 987)
  const chestPosition = new Vec3(1365, 11, 987);
  await getItemFromChest(bot, chestPosition, {});

  // Open the chest and check its contents
  await checkItemInsideChest(bot, chestPosition);

  // Report the completion of the task
  bot.chat("Task completed: Opened and checked the chest at (1365, 11, 987).");
}