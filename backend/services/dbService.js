// server/services/dbService.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.getActiveStocks = async () => {
    const { data, error } = await supabase
        .from('user_stocks')
        .select('*')
        .eq('is_active', true); 

    if (error) console.error('Supabase Read Error:', error.message);
    return data || [];
};

exports.deleteAlert = async (id) => {
    const { error } = await supabase
        .from('user_stocks')
        .delete() 
        .eq('id', id);
    
    if (error) throw new Error(error.message);
    return true;
};

exports.addStock = async (stockData) => {
    const { user_id, symbol, target_price, condition_type } = stockData;
    
    const { data, error } = await supabase
        .from('user_stocks')
        .insert([
            { user_id, symbol, target_price, condition_type }
        ])
        .select();

    if (error) throw new Error(error.message);
    return data;
};