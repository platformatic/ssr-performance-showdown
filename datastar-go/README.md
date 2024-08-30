# Datastar SSR example

Per a [Twitter conversation](https://x.com/RyanCarniato/status/1828829970233471259) with [@RyanCarniato](https://x.com/RyanCarniato), I wanted to see how [Datastar](https://data-star.dev) would stack up.

## Autocannon Results

```bash
┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 0 ms │ 0 ms  │ 0 ms │ 0.01 ms │ 0.05 ms │ 10 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬───────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg       │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼─────────┼─────────┤
│ Req/Sec   │ 40,927  │ 40,927  │ 51,007  │ 51,775  │ 49,854.55 │ 2,970.4 │ 40,898  │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼─────────┼─────────┤
│ Bytes/Sec │ 35.2 MB │ 35.2 MB │ 43.9 MB │ 44.5 MB │ 42.9 MB   │ 2.56 MB │ 35.2 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴───────────┴─────────┴─────────┘
```

To run the server you'll need Go installed. Then you can run the following commands:

```bash
go run cmd/datastar_ssr/main.go
```
