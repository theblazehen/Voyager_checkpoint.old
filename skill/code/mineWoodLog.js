async function mineWoodLog(bot) {
  const logNames = ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"];

  // Find a wood log block
  const logBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    return bot.findBlock({
      matching: block => logNames.includes(block.name),
      maxDistance: 32
    });
  });
  if (logBlock) {
    // Mine the wood log block
    await mineBlock(bot, logBlock.name);
    bot.chat("Wood log mined.");
  } else {
    bot.chat("Could not find a wood log.");
  }
}