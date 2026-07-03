# MoreJSEvents.villagerTrades

## Basic info

- Valid script types: [SERVER]

- Has result? ✘

- Event class: VillagerTradingEventJS (third-party)

### Available fields:

| Name | Type | Static? |
| ---- | ---- | ------- |

Note: Even if no fields are listed above, some methods are still available as fields through *beans*.

### Available methods:

| Name | Parameters | Return type | Static? |
| ---- | ---------- | ----------- | ------- |
| addCustomTrade | VillagerProfession, int, Transformer |  | void | ✘ |
| removeTrades | TradeFilter |  | void | ✘ |
| removeVanillaTrades |  |  | void | ✘ |
| removeVanillaTrades | VillagerProfession[], IntRange |  | void | ✘ |
| removeModdedTrades |  |  | void | ✘ |
| removeModdedTrades | VillagerProfession[], IntRange |  | void | ✘ |
| forEachTrades | ForEachCallback |  | void | ✘ |
| forEachTrades | VillagerProfession[], IntRange, Consumer<List<VillagerTrades$ItemListing>> |  | void | ✘ |
| addTrade | VillagerProfession, int, TradeItem[], TradeItem |  | SimpleTrade | ✘ |
| addTrade | VillagerProfession, int, T extends VillagerTrades$ItemListing |  | T extends VillagerTrades$ItemListing | ✘ |
| getTrades | VillagerProfession, int |  | List<VillagerTrades$ItemListing> | ✘ |
| exit | Object |  | Object | ✘ |
| exit |  |  | Object | ✘ |
| success | Object |  | Object | ✘ |
| success |  |  | Object | ✘ |
| cancel | Object |  | Object | ✘ |
| cancel |  |  | Object | ✘ |


### Documented members:

- `Object exit(Object var0)`

  Parameters:
  - var0: Object

```
Stops the event with the given exit value. Execution will be stopped **immediately**.

`exit` denotes a `default` outcome.
```

- `Object exit()`
```
Stops the event with default exit value. Execution will be stopped **immediately**.

`exit` denotes a `default` outcome.
```

- `Object success(Object var0)`

  Parameters:
  - var0: Object

```
Stops the event with the given exit value. Execution will be stopped **immediately**.

`success` denotes a `true` outcome.
```

- `Object success()`
```
Stops the event with default exit value. Execution will be stopped **immediately**.

`success` denotes a `true` outcome.
```

- `Object cancel(Object var0)`

  Parameters:
  - var0: Object

```
Cancels the event with the given exit value. Execution will be stopped **immediately**.

`cancel` denotes a `false` outcome.
```

- `Object cancel()`
```
Cancels the event with default exit value. Execution will be stopped **immediately**.

`cancel` denotes a `false` outcome.
```



### Example script:

```js
MoreJSEvents.villagerTrades((event) => {
	// This space (un)intentionally left blank
});
```

