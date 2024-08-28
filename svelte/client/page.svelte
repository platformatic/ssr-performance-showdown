<script>
  const wrapperWidth = 960
  const wrapperHeight = 720
  const cellSize = 10
  const centerX = wrapperWidth / 2
  const centerY = wrapperHeight / 2

  let angle = 0
  let radius = 0

  let tiles = []
  const step = cellSize

  while (radius < Math.min(wrapperWidth, wrapperHeight) / 2) {
    let x = centerX + Math.cos(angle) * radius
    let y = centerY + Math.sin(angle) * radius

    if (x >= 0 && x <= wrapperWidth - cellSize && y >= 0 && y <= wrapperHeight - cellSize) {
      tiles.push({ x, y })
    }

    angle += 0.2
    radius += step * 0.015
  }
</script>

<style>
  #wrapper {
    width: 960px;
    height: 720px;
    position: relative;
    background-color: white;
  }
  .tile {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #333;
  }
</style>

<div id="wrapper">
  {#each tiles as { x, y }}
    <div
      class="tile"
      style="left: {x}px; top: {y}px;"
    ></div>
  {/each}
</div>
