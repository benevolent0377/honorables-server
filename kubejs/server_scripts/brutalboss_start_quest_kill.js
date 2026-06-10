EntityEvents.death(event => {
  const entity = event.entity
  const source = event.source
  const server = event.server

  // The thing that killed the mob
  const killer = source.actual

  // Only count player kills
  if (!killer || !killer.player) {
    return
  }

  const nbt = entity.nbt

  // Safety check
  if (!nbt || !nbt.ForgeCaps) {
    return
  }

  const bossCap = nbt.ForgeCaps["brutalbosses:bosscap"]

  // Only continue if this is a BrutalBosses boss
  if (!bossCap) {
    return
  }

  // Optional filters based on your screenshot
  if (bossCap.bbossltk !== "dungeoncrawl") {
    return
  }

  if (bossCap.bbossltn !== "chests/stage_3") {
    return
  }

  // Replace this with your real FTB quest ID
  const questId = "40A455A72CABA1AC"

  server.runCommandSilent(
    `ftbquests change_progress ${killer.username} complete ${questId}`
  )
})