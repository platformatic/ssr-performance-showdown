package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/platformatic/ssr-performance-showdown/dsssr"
)

const port = 3000

func main() {
	ctx := context.Background()

	if err := run(ctx); err != nil {
		log.Fatal(err)
	}
}

func run(ctx context.Context) error {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	log.Print("Running Datastar SSR Server")
	defer log.Print("Datastar SSR Server Stopped")

	// handle os signals
	ctx, cancel := context.WithCancel(ctx)

	go dsssr.RunWebServer(ctx, port)

	osSignals := make(chan os.Signal, 1)
	signal.Notify(osSignals, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-osSignals
		cancel()
	}()

	<-ctx.Done()

	return ctx.Err()

}
