#![allow(non_snake_case)]

use std::rc::Rc;

use dioxus::prelude::*;

fn main() {
    launch(App);
}

fn App() -> Element {
    struct Tile {
        x: f32,
        y: f32,
        id: usize,
    }

    const WRAPPER_WIDTH: f32 = 960.;
    const WRAPPER_HEIGHT: f32 = 720.;
    const CELL_SIZE: f32 = 10.;
    const CENTER_X: f32 = WRAPPER_WIDTH / 2.;
    const CENTER_Y: f32 = WRAPPER_HEIGHT / 2.;

    let titles = use_hook(|| {
        let mut id_counter = 0;
        let mut angle = 0.0f32;
        let mut radius = 0.0;

        let mut titles = Vec::new();
        let step = CELL_SIZE;
        let mut x;
        let mut y;
        while radius < WRAPPER_WIDTH.min(WRAPPER_HEIGHT) / 2. {
            x = CENTER_X + angle.cos() * radius;
            y = CENTER_Y + angle.sin() * radius;
            if (0.0..=WRAPPER_WIDTH - CELL_SIZE).contains(&x)
                && (0.0..=WRAPPER_HEIGHT - CELL_SIZE).contains(&y)
            {
                titles.push(Tile {
                    x,
                    y,
                    id: id_counter,
                });
                id_counther += 1;
            }
            angle += 0.2;
            radius += step * 0.015;
        }
        Rc::new(titles)
    });

    rsx! {
        div {
            id: "wrapper",
            style: "width: {WRAPPER_WIDTH}px; height: {WRAPPER_HEIGHT}px; position: relative; background-color: white;",
            for title in titles.iter() {
                div {
                    key: "{title.id}",
                    class: "tile",
                    style: "left: {title.x}px; top: {title.y}px;",
                }
            }
        }
    }
}
