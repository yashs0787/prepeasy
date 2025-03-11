
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to send email alerts
async function sendEmailAlert(email: string, jobs: any[]) {
  try {
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
    
    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not found');
    }
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
            subject: `${jobs.length} New Job Opportunities Found For You`,
          },
        ],
        from: { email: 'alerts@applygo.app', name: 'ApplyGo Job Alerts' },
        content: [
          {
            type: 'text/html',
            value: generateJobAlertEmail(jobs),
          },
        ],
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`SendGrid API error: ${JSON.stringify(errorData)}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email alert:', error);
    throw error;
  }
}

// Generate HTML email content for job alerts
function generateJobAlertEmail(jobs: any[]) {
  const jobsHtml = jobs.map(job => `
    <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h3 style="margin-top: 0;">${job.title}</h3>
      <p><strong>${job.company}</strong> · ${job.location || 'Location not specified'}</p>
      <p>${job.description ? job.description.substring(0, 150) + '...' : 'No description available'}</p>
      <a href="${job.url}" style="display: inline-block; padding: 8px 15px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 4px;">View Job</a>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>New Job Alerts from ApplyGo</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; margin-bottom: 10px;">ApplyGo Job Alerts</h1>
        <p>We found ${jobs.length} new job opportunities that match your preferences</p>
      </div>
      
      <div>
        ${jobsHtml}
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;">
        <p>You're receiving this email because you set up job alerts on ApplyGo.</p>
        <p>To manage your notification preferences, <a href="https://applygo.app/settings" style="color: #7c3aed;">visit your account settings</a>.</p>
      </div>
    </body>
    </html>
  `;
}

// Main handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, email, alertType = 'daily' } = await req.json();
    
    if (!userId || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: userId and email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Create the Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    // Import Supabase client for Deno
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get user preferences
    const { data: userPreferences, error: preferencesError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (preferencesError) {
      throw new Error(`Error fetching user preferences: ${preferencesError.message}`);
    }
    
    // Get recent jobs based on user preferences
    // This is a simple example; in a real-world scenario, you'd have more complex filtering
    const timeAgo = alertType === 'daily' ? '1 day' : alertType === 'weekly' ? '7 days' : '1 day';
    
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .gte('created_at', new Date(Date.now() - 86400000).toISOString()) // Last 24 hours for daily alerts
      .order('created_at', { ascending: false })
      .limit(10);
      
    if (jobsError) {
      throw new Error(`Error fetching jobs: ${jobsError.message}`);
    }
    
    if (!jobs || jobs.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No new jobs found matching your criteria' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Send email alert
    await sendEmailAlert(email, jobs);
    
    // Update last alert timestamp
    await supabase
      .from('profiles')
      .update({ last_alert_sent: new Date().toISOString() })
      .eq('id', userId);
    
    return new Response(
      JSON.stringify({ 
        message: `Successfully sent ${alertType} job alert to ${email}`,
        jobCount: jobs.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in job alerts function:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
