async function moveToYLevel(bot, yLevel) {
  if (bot.entity.position.y !== yLevel) {
    const goal = new GoalNear(bot.entity.position.x, yLevel, bot.entity.position.z, 1);
    await bot.pathfinder.goto(goal);
  }
}

async function retrieveApples(bot) {
  // Move to the correct Y level (66)
  await moveToYLevel(bot, 66);

  // Move to the chest at (1156, 66, 707)
  const chestPosition = new Vec3(1156, 66, 707);
  await getItemFromChest(bot, chestPosition, {});

  // Retrieve 6 apples from the chest
  await getItemFromChest(bot, chestPosition, {
    "apple": 6
  });

  // Report the completion of the task
  bot.chat("Task completed: Retrieved 6 apples from the chest at (1156, 66, 707).");
}