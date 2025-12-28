const supabase = require("../config/supabaseClient");

exports.getUserStocks = async (userId) => {
  const { data, error } = await supabase
    .from("user_stocks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

exports.createStock = async (stockData) => {
  const { user_id, symbol, target_price, condition_type } = stockData;

  const { data: existing } = await supabase
    .from("user_stocks")
    .select("id")
    .eq("user_id", user_id)
    .eq("symbol", symbol)
    .eq("target_price", target_price)
    .eq("condition_type", condition_type)
    .limit(1);

  if (existing && existing.length > 0)
    throw new Error("This alert already exists.");

  const { count } = await supabase
    .from("user_stocks")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user_id);

  if (count >= 20) throw new Error("You cannot add more than 20 symbols.");

  const { data: newData, error: insertError } = await supabase
    .from("user_stocks")
    .insert([stockData])
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);
  return newData;
};

exports.deleteStock = async (id, userId) => {
  const { error } = await supabase
    .from("user_stocks")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return true;
};

exports.getActiveStocks = async () => {
  const { data, error } = await supabase.from("user_stocks").select("*");
  if (error) throw new Error(error.message);
  return data;
};

exports.deleteAlert = async (id) => {
  const { error } = await supabase.from("user_stocks").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
};
