const supabase = require('../config/supabaseClient');

exports.createStock = async (data) => {
    const { count, error: countError } = await supabase
        .from('user_stocks')
        .select('*', { count: 'exact', head: true }) 
        .eq('user_id', data.user_id)
        .eq('is_active', true);

    if (countError) throw new Error(countError.message);
    if (count >= 20) {
        throw new Error('Limit Reached: คุณติดตามได้สูงสุด 20 ตัวครับ');
    }
    const { error } = await supabase.from('user_stocks').insert([data]);
    if (error) throw new Error(error.message);
    return true;
};

exports.getUserStocks = async (userId) => {
    const { data, error } = await supabase
        .from('user_stocks')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true) 
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteStock = async (id) => {
    const { error } = await supabase
        .from('user_stocks')
        .delete()
        .eq('id', id);

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