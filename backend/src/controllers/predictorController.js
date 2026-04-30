const supabase = require('../supabase/client');

exports.predictColleges = async (req, res) => {
  try {
    const { exam, rank } = req.body;
    
    if (!exam || !rank) {
      return res.status(400).json({ error: 'Please provide both exam and rank/percentile.' });
    }

    let query = supabase.from('colleges').select('*');

    if (exam === 'JEE Main' || exam === 'JEE Advanced') {
      // For JEE, a lower rank is better. So cutoff >= rank means the student is eligible.
      // E.g. cutoff = 1000, rank = 500 => eligible.
      // We will fetch colleges where jee_cutoff_rank is not null.
      query = query.not('jee_cutoff_rank', 'is', null);
    } else if (exam === 'CAT') {
      // For CAT, a higher percentile is better. So percentile <= student_percentile means eligible.
      query = query.not('cat_cutoff_percentile', 'is', null);
    } else {
      return res.status(400).json({ error: 'Unsupported exam type.' });
    }

    const { data, error } = await query;

    if (error) throw error;

    let eligible = [];
    let borderline = [];

    data.forEach(college => {
      if (exam === 'JEE Main' || exam === 'JEE Advanced') {
        const gap = college.jee_cutoff_rank - rank;
        if (gap >= 0) {
          eligible.push({ ...college, gap });
        } else if (gap >= -500) { // arbitrary borderline gap
          borderline.push({ ...college, gap });
        }
      } else if (exam === 'CAT') {
        const gap = rank - college.cat_cutoff_percentile;
        if (gap >= 0) {
          eligible.push({ ...college, gap });
        } else if (gap >= -2.0) { // 2 percentile gap
          borderline.push({ ...college, gap });
        }
      }
    });

    // Sort: for eligible, smaller gap is tighter fit but all are good. Let's sort by ranking.
    eligible.sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
    borderline.sort((a, b) => (a.ranking || 999) - (b.ranking || 999));

    res.json({
      eligible: eligible.slice(0, 10),
      borderline: borderline.slice(0, 10)
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
