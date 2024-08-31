use axum::{response::Html, routing::get, Router};
use leptos::prelude::*;

#[tokio::main]
async fn main() {
    // build our application with a route
    let app = Router::new().route("/", get(handler));

    // run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Html<String> {
    let wrapper_width: f32 = 960.0;
    let wrapper_height: f32 = 720.0;
    let cell_size = 10.0;
    let center_x = wrapper_width / 2.0;
    let center_y = wrapper_height / 2.0;

    let mut angle: f32 = 0.0;
    let mut radius: f32 = 0.0;
    let mut tiles = Vec::with_capacity(2398);
    let step = cell_size;

    while radius < (wrapper_width.min(wrapper_height) / 2.0) {
        let x = center_x + angle.cos() * radius;
        let y = center_y + angle.sin() * radius;

        if x >= 0.0 && x <= wrapper_width - cell_size && y >= 0.0 && y <= wrapper_height - cell_size
        {
            tiles.push((x, y));
        }

        angle += 0.2;
        radius += step * 0.015;
    }

    let tiles = tiles.into_iter().map(|(x, y)| view! { <div class="tile" style=format!("left: {x:.2}px; top: {y:.2}px")></div> }).collect_view();
    let page = view! {
        <!DOCTYPE html> 
        <html>
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <style>
                    r#"body {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      background-color: #f0f0f0;
                      margin: 0;
                    }
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
                    }"#
                </style>
            </head>
            <body>
                <div id="root">
                    <div id="wrapper">{tiles}</div>
                </div>
            </body>
        </html>
    } as View<_>;

    Html(page.to_html())
}
