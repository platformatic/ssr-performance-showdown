export function createHtmlFunction (app) {
  return (inner) => {
    return app.html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
        <style>
        body {
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
        }
        </style>
        </head>
        <body>
          !${inner}
        </body>
      </html>
    `
  }
}