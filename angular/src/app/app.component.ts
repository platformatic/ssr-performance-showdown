import { Component } from '@angular/core';

type Shape = {
  x: number;
  y: number;
};

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div id="wrapper">
      @for (tile of this.tiles; track $index) {
        <div
          class="tile"
          [style]="{ left: tile.x.toFixed(2) + 'px', top: tile.y.toFixed(2) + 'px' }"
        ></div>
      }
    </div>
  `,
})
export class AppComponent {
  tiles: Shape[] = [];

  constructor() {
    const wrapperWidth = 960;
    const wrapperHeight = 720;
    const cellSize = 10;
    const centerX = wrapperWidth / 2;
    const centerY = wrapperHeight / 2;

    let angle = 0;
    let radius = 0;

    const step = cellSize;

    let x: number;
    let y: number;

    while (radius < Math.min(wrapperWidth, wrapperHeight) / 2) {
      x = centerX + Math.cos(angle) * radius;
      y = centerY + Math.sin(angle) * radius;

      if (x >= 0 && x <= wrapperWidth - cellSize && y >= 0 && y <= wrapperHeight - cellSize) {
        this.tiles.push({ x, y });
      }

      angle += 0.2;
      radius += step * 0.015;
    }
  }
}
