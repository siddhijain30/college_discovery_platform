const supabase = require('../supabase/client');

exports.getColleges = async (req, res) => {
  try {
    // Accept both camelCase (FilterPanel/HomePage) and snake_case (FilterSidebar/Colleges)
    const {
      search,
      state,
      location,   // alias for state from FilterPanel
      type,
      min_fees,
      max_fees,
      minFees,    // camelCase alias from FilterPanel
      maxFees,    // camelCase alias from FilterPanel
      page = 1,
      limit = 9
    } = req.query;

    const stateFilter = state || location;
    const minFeesFilter = min_fees || minFees;
    const maxFeesFilter = max_fees || maxFees;

    let query = supabase.from('colleges').select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    if (stateFilter) {
      query = query.eq('state', stateFilter);
    }
    if (type) {
      query = query.eq('type', type);
    }
    if (minFeesFilter) {
      query = query.gte('fees_per_year', parseInt(minFeesFilter));
    }
    if (maxFeesFilter) {
      query = query.lte('fees_per_year', parseInt(maxFeesFilter));
    }

    const from = (page - 1) * limit;
    const to = from + parseInt(limit) - 1;
    query = query.range(from, to).order('ranking', { ascending: true, nullsFirst: false });

    const { data, count, error } = await query;

    if (error) throw error;

    res.json({
      data,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: college, error: collegeError } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', id)
      .single();

    // PGRST116 = no rows found in Supabase
    if (collegeError) {
      if (collegeError.code === 'PGRST116') {
        return res.status(404).json({ error: 'College not found' });
      }
      throw collegeError;
    }

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    const { data: reviews, error: reviewsError } = await supabase
      .from('college_reviews')
      .select('*')
      .eq('college_id', id);

    // Don't fail the whole request if reviews can't be fetched
    const safeReviews = reviewsError ? [] : (reviews || []);

    res.json({ ...college, reviews: safeReviews });
  } catch (error) {
    console.error('getCollegeById error:', error);
    res.status(500).json({ error: error.message });
  }
};
