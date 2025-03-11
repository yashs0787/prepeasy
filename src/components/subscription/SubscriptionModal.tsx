
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/App';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function SubscriptionModal() {
  const { showSubscribeModal, setShowSubscribeModal, refreshSubscription } = useSubscription();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      setShowSubscribeModal(false);
      return;
    }

    try {
      setIsProcessing(true);
      
      // In a real app, this is where you would integrate with a payment provider like Stripe
      // For this demo, we'll just directly update the subscription status
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          status: 'active',
          plan_type: 'premium'
        });

      if (error) throw error;

      await refreshSubscription();
      toast.success('Successfully subscribed!', {
        description: 'You now have full access to all features.'
      });
      
      setShowSubscribeModal(false);
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Subscription failed', {
        description: 'There was an issue processing your subscription. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock subscription plans
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$9.99',
      features: [
        'Unlimited resume downloads',
        'Access to all job listings',
        'AI-powered resume optimization',
        'Priority support'
      ]
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$99.99',
      features: [
        'All monthly features',
        '2 months free',
        'Resume review by experts',
        'Job application tracking'
      ],
      recommended: true
    }
  ];

  return (
    <Dialog open={showSubscribeModal} onOpenChange={setShowSubscribeModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upgrade to Premium</DialogTitle>
          <DialogDescription>
            Get full access to all features and maximize your job search success.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 relative ${
                plan.recommended ? 'border-primary ring-1 ring-primary' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Recommended
                </div>
              )}
              <h3 className="font-bold text-lg">{plan.name}</h3>
              <p className="text-2xl font-bold my-2">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handleSubscribe} 
                disabled={isProcessing}
                className={`w-full mt-4 ${plan.recommended ? 'bg-primary hover:bg-primary/90' : ''}`}
              >
                {isProcessing ? 'Processing...' : `Choose ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={() => setShowSubscribeModal(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
