const supabase = require('../supabase/client');

exports.compareColleges = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of college ids.' });
    }

    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .in('id', ids);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
