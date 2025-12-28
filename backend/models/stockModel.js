const supabase = require('../config/supabaseClient');

exports.createStock = async (data) => {
    const { error } = await supabase.from('user_stocks').insert([data]);
    if (error) throw new Error(error.message);
    return true;
};

exports.getActiveStocks = async () => {
    const { data, error } = await supabase
        .from('user_stocks')
        .select('*')
        .eq('is_active', true);
    
    if (error) throw new Error(error.message);
    return data;
};

exports.disableAlert = async (id) => {
    const { error } = await supabase
        .from('user_stocks')
        .update({ is_active: false })
        .eq('id', id);
    
    if (error) throw new Error(error.message);
    return true;
};