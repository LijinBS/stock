export const updateOneStock = (state, payload) => {
  const modifiedData = state.map((d) => {
    if (d.Symbol === payload.Symbol) {
      d.lastUpdated = payload.lastUpdated;
      d["Last Sale"] = payload["Last Sale"];
    }
    return d;
  });

  return modifiedData;
};

export const updateStockQty = (state, payload) => {
  const { Symbol, qty, lastUpdated } = payload;
  const modifiedData = state.map((d) => {
    if (d.Symbol === Symbol) {
      d.lastUpdated = lastUpdated;
      d.Volume = d.Volume - qty;
    }
    return d;
  });
  return modifiedData;
};
