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
    title: 'Matchain Block Explorer',
    description: 'Matchain is the infrastructure for bringing AI models and dApps on chain by leveraging decentralised identity and data sovereignty',
    opengraph: {
      title: 'Matchain Block Explorer',
      description: pageOgType !== 'Regular page' ? config.meta.og.description : '',
      imageUrl: pageOgType !== 'Regular page' ? config.meta.og.imageUrl : '',
    },
  };
}
