package dsssr

import (
	"context"
	"embed"
	"fmt"
	"log"
	"net/http"

	"github.com/benbjohnson/hashfs"
	"github.com/chewxy/math32"
	"github.com/delaneyj/datastar"
	"github.com/go-chi/chi/v5"
)

//go:embed static/*
var staticFS embed.FS

var staticSys = hashfs.NewFS(staticFS)

func staticPath(path string) string {
	return staticSys.HashName("/static/" + path)
}

const (
	wrapperWidth  = 960
	wrapperHeight = 720
	cellSize      = 10
	centerX       = wrapperWidth / 2
	centerY       = wrapperHeight / 2
)

type Tile struct {
	X, Y float32
}

func RunWebServer(ctx context.Context, port int) error {
	r := chi.NewRouter()

	var angle, radius, step float32
	step = float32(cellSize)

	w, h := float32(wrapperWidth-cellSize), float32(wrapperHeight-cellSize)

	tiles := make([]Tile, 0, 2400)
	for radius < float32(min(wrapperWidth, wrapperHeight)/2) {
		x := centerX + math32.Cos(angle)*radius
		y := centerY + math32.Sin(angle)*radius

		if x >= 0 && x <= w && y >= 0 && y <= h {
			tiles = append(tiles, Tile{X: x, Y: y})
		}

		angle += 0.2
		radius += step * 0.015
	}
	log.Printf("Generated %d tiles", len(tiles))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		InitialPage(tiles).Render(r.Context(), w)
	})

	r.Get("/hydrate", func(w http.ResponseWriter, r *http.Request) {
		sse := datastar.NewSSE(w, r)
		datastar.RenderFragmentTempl(sse, App(tiles))
	})

	r.Handle("/static/*", hashfs.FileServer(staticSys))

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: r,
	}

	go func() {
		<-ctx.Done()
		srv.Shutdown(context.Background())
	}()

	log.Printf("Server started at http://localhost:%d", port)
	return srv.ListenAndServe()
}
