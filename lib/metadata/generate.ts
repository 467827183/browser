import type { ApiData, Metadata } from './types';

import type { Route } from 'nextjs-routes';

import config from 'configs/app';
import getNetworkTitle from 'lib/networks/getNetworkTitle';

import compileValue from './compileValue';
import getPageOgType from './getPageOgType';
import * as templates from './templates';

export default function generate<R extends Route>(route: R, apiData?: ApiData<R>): Metadata {
  const params = {
    ...route.query,
    ...apiData,
    network_name: config.chain.name,
    network_title: getNetworkTitle(),
  };

  const compiledTitle = compileValue(templates.title.make(route.pathname), params);
  const title = compiledTitle ? compiledTitle + (config.meta.promoteBlockscoutInTitle ? ' | Blockscout' : '') : '';
  const description = compileValue(templates.description.make(route.pathname), params);

  const pageOgType = getPageOgType(route.pathname);

  return {
    title: 'Match Chain blockchain explorer',
    description: 'Match is an innovative Web3 social graph that operates on the Cosmos with a focus on decentralization and composability. It empowers users with data sovereignty and provides Web3 developers with infrastructure to build novel and user-friendly DApps permissionlessly.',
    opengraph: {
      title: 'Match Chain blockchain explorer',
      description: pageOgType !== 'Regular page' ? config.meta.og.description : '',
      imageUrl: pageOgType !== 'Regular page' ? config.meta.og.imageUrl : '',
    },
  };
}
