package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

var (
	port    = flag.Int("port", 10000, "The server port")
	rootDir = flag.String("root-dir", "/html", "The directory to serve on /")
)

func main() {
	flag.Parse()
	addr := fmt.Sprintf("0.0.0.0:%d", *port)

	log.Print("Serving on http://", addr)
	http.ListenAndServe(addr, http.FileServer(http.Dir(*rootDir)))
}
