import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

// Get environment variables with proper Vite prefix
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have placeholder values or empty values
const hasPlaceholderValues = 
  !supabaseUrl || 
  !supabaseAnonKey || 
  supabaseUrl === 'your_supabase_project_url' ||
  supabaseAnonKey === 'your_supabase_anon_key' ||
  supabaseUrl.includes('your_supabase') ||
  supabaseAnonKey.includes('your_supabase');

// Validate environment variables
if (hasPlaceholderValues) {
  console.warn('Supabase environment variables are not configured properly. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment with your actual Supabase project credentials.');
}

// Only create client if we have valid values
export const supabase = !hasPlaceholderValues && supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Contact service for handling form submissions
export const contactService = {
  // Test connection to Supabase
  async testConnection() {
    if (!supabase) {
      throw new Error('Supabase client is not initialized. Please check your environment variables.');
    }

    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('count', { count: 'exact', head: true });

      if (error) {
        throw new Error(`Database connection failed: ${error.message}`);
      }

      console.log('✅ Supabase connection successful');
      return true;
    } catch (error) {
      console.error('❌ Supabase connection failed:', error);
      throw error;
    }
  },

  // Create a new contact submission
  async createContactSubmission(submissionData: Database['public']['Tables']['contact_submissions']['Insert']) {
    if (!supabase) {
      throw new Error('Supabase client is not initialized. Please check your environment variables.');
    }

    try {
      console.log('📝 Creating contact submission:', submissionData);

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submissionData])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating contact submission:', error);
        throw new Error(`Failed to submit contact form: ${error.message}`);
      }

      console.log('✅ Contact submission created successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Contact submission error:', error);
      throw error;
    }
  },

  // Get contact submission statistics
  async getContactSubmissionStats() {
    if (!supabase) {
      throw new Error('Supabase client is not initialized. Please check your environment variables.');
    }

    try {
      const [totalResult, recentResult, newsletterResult] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true })
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true })
          .eq('newsletter_subscription', true)
      ]);

      return {
        total: totalResult.count || 0,
        recentSubmissions: recentResult.count || 0,
        newsletterSubscribers: newsletterResult.count || 0
      };
    } catch (error) {
      console.error('❌ Error getting contact submission stats:', error);
      throw error;
    }
  }
};

// Legacy exports for backward compatibility
export interface ContactSubmission {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  newsletter_subscription: boolean;
  created_at?: string;
}