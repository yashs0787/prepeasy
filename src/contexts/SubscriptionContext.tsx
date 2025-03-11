
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/App';
import { supabase } from '@/lib/supabase';

type SubscriptionStatus = 'active' | 'inactive';

interface SubscriptionContextType {
  isSubscribed: boolean;
  isLoading: boolean;
  showSubscribeModal: boolean;
  setShowSubscribeModal: (show: boolean) => void;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  isLoading: true,
  showSubscribeModal: false,
  setShowSubscribeModal: () => {},
  refreshSubscription: async () => {},
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const fetchSubscriptionStatus = async () => {
    if (!user) {
      setIsSubscribed(false);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      }

      setIsSubscribed(data?.status === 'active');
    } catch (error) {
      console.error('Error checking subscription status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [user]);

  const refreshSubscription = async () => {
    await fetchSubscriptionStatus();
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        isLoading,
        showSubscribeModal,
        setShowSubscribeModal,
        refreshSubscription
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
