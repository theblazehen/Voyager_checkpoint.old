async function openAndCheckChest(bot) {
  // Move to the chest at (1156, 66, 707)
  const chestPosition = new Vec3(1156, 66, 707);
  await getItemFromChest(bot, chestPosition, {});

  // Open the chest and check its contents
  await checkItemInsideChest(bot, chestPosition);

  // Report the completion of the task
  bot.chat("Task completed: Opened and checked the chest at (1156, 66, 707).");
}