const supabase = require('../config/database')

class Report {
  static async findAll(filters = {}) {
    try {
      let query = supabase
        .from('reports')
        .select('*')

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      if (filters.category) {
        query = query.eq('category', filters.category)
      }
      if (filters.limit) {
        query = query.limit(filters.limit)
      }
      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching reports:', error)
      throw error
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching report by ID:', error)
      throw error
    }
  }

  static async create(reportData) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          ...reportData,
          status: reportData.status || 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating report:', error)
      throw error
    }
  }

  static async update(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating report:', error)
      throw error
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting report:', error)
      throw error
    }
  }

  static async getStats() {
    try {
      const { data: totalReports, error: totalError } = await supabase
        .from('reports')
        .select('id', { count: 'exact', head: true })

      if (totalError) throw totalError

      const { data: resolvedReports, error: resolvedError } = await supabase
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'resolved')

      if (resolvedError) throw resolvedError

      const { data: pendingReports, error: pendingError } = await supabase
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending')

      if (pendingError) throw pendingError

      return {
        total: totalReports || 0,
        resolved: resolvedReports || 0,
        pending: pendingReports || 0
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      throw error
    }
  }
}

module.exports = Report
