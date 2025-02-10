import type { Preview } from '@storybook/html';
import {
  GlobalConfig,
  NoOpLogger,
  resetEdgeHandlerConfig,
  resetEntityRelationConnectorConfig,
  resetHandleConfig,
  resetStyleDefaultsConfig,
  resetVertexHandlerConfig,
} from '@maxgraph/core';

const defaultLogger = new NoOpLogger();
// if you want to debug using the browser console, use the following configuration
// const defaultLogger = new ConsoleLogger();
// defaultLogger.infoEnabled = true;
// defaultLogger.debugEnabled = true;
// defaultLogger.traceEnabled = true;

const resetMaxGraphConfigs = (): void => {
  GlobalConfig.logger = defaultLogger;

  resetEdgeHandlerConfig();
  resetEntityRelationConnectorConfig();
  resetHandleConfig();
  resetStyleDefaultsConfig();
  resetVertexHandlerConfig();
};

// This function is a workaround to destroy mxGraph elements that are not released by the previous story.
// See https://github.com/maxGraph/maxGraph/issues/400
function destroyUnreleasedElements() {
  document
    .querySelectorAll('.mxPopupMenu,.mxTooltip,.mxWindow')
    .forEach((e) => e.remove());
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    // reset the global configurations, as they may have been globally changed in a story (for example, the Window story updates the logger configuration)
    // inspired by https://github.com/storybookjs/storybook/issues/4997#issuecomment-447301514
    (storyFn) => {
      resetMaxGraphConfigs();
      destroyUnreleasedElements();
      return storyFn();
    },
  ],
};

export default preview;
