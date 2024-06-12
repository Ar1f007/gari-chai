import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { IS_CLIENT } from '@/lib/constants';
import { TCarCampaign, TCarCampaignComment } from '@/schema/campaign';

type TCampaignStore = {
  campaigns: TCarCampaign[];
  comments: TCarCampaignComment[];
};

const initialState: TCampaignStore = {
  campaigns: [],
  comments: [],
};

export const campaignStore = proxy<TCampaignStore>(initialState);

export const campaignActions = {
  setCampaigns() {},
  setComments(comments: TCarCampaignComment[]) {
    campaignStore.comments = comments;
  },
};

devtools(campaignStore, {
  name: 'campaign',
  enabled: IS_CLIENT,
});
