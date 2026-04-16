import { handleFindLastIndexPolyfill } from './array-find-last-index-polyfill';
import { initialize as initializeViewportUnits } from './large-small-dynamic-viewport-units-polyfill';

handleFindLastIndexPolyfill();
initializeViewportUnits();
if (typeof window !== 'undefined') {
  import('mdn-polyfills/Node.prototype.replaceWith')
    .then(() => {
      if (import.meta.env.DEV) {
        console.log('Node.prototype.replaceWith polyfill loaded');
      }
    })
    .catch((error) => {
      if (import.meta.env.DEV) {
        console.error('Node.prototype.replaceWith polyfill failed', error);
      }
    });
}