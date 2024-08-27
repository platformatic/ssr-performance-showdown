<template>
  <div id="wrapper">
    <div
      v-for="(tile, index) in tiles"
      :key="tile.id"
      class="tile"
      :style="{ left: tile.x + 'px', top: tile.y + 'px' }"
    ></div>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue'

const wrapperWidth = 960
const wrapperHeight = 720
const cellSize = 10
const centerX = wrapperWidth / 2
const centerY = wrapperHeight / 2

const tiles = shallowRef([])

let idCounter = 0
let angle = 0
let radius = 0
const step = cellSize;
const newTiles = [];

let x
let y
while (radius < Math.min(wrapperWidth, wrapperHeight) / 2) {
  x = centerX + Math.cos(angle) * radius
  y = centerY + Math.sin(angle) * radius

  if (x >= 0 && x <= wrapperWidth - cellSize && y >= 0 && y <= wrapperHeight - cellSize) {
    newTiles.push({ x, y, id: idCounter++ })
  }

  angle += 0.2
  radius += step * 0.015
}

tiles.value = newTiles
</script>
