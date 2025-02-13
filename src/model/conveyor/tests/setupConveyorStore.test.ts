import { setupConveyorStore } from '../setupConveyorStore';

const modelsWithColor = {
  Book: {
    title: {
      label: 'The Title',
      type: 'ID',
    },
    color: {
      type: 'Color',
    },
  },
  Author: {
    name: {
      type: 'ID',
    },
  },
} as const;

const modelsWithOutColor = {
  Book: {
    title: {
      label: 'The Title',
      type: 'ID',
    },
  },
  Author: {
    name: {
      type: 'ID',
    },
  },
} as const;

const modelsWithOnlyColor = {
  Book: {
    color: {
      type: 'Color',
    },
  },
  Author: {
    favoriteColor: {
      type: 'Color',
    },
  },
} as const;

const types = { Color: {} };
// Successful usages:
// types: default + custom; model: default + custom
setupConveyorStore({ types, models: modelsWithColor });
setupConveyorStore({ types, models: modelsWithColor }, true);
// types: default + custom; model: custom
setupConveyorStore({ types, models: modelsWithOnlyColor });
setupConveyorStore({ types, models: modelsWithOnlyColor }, true);
// types: default + custom; model: default
setupConveyorStore({ types, models: modelsWithOutColor });
setupConveyorStore({ types, models: modelsWithOutColor }, true);

// @ts-expect-error | types: default; model: default + custom
setupConveyorStore({ models: modelsWithColor }); // FAIL
// @ts-expect-error
setupConveyorStore({ models: modelsWithColor }, true); // FAIL
// @ts-expect-error | types: default; model: custom
setupConveyorStore({ models: modelsWithOnlyColor }); // FAIL
// @ts-expect-error
setupConveyorStore({ models: modelsWithOnlyColor }, true); // FAIL
// types: default; model: default
setupConveyorStore({ models: modelsWithOutColor });
setupConveyorStore({ models: modelsWithOutColor }, true);

// @ts-expect-error | types: custom; model: default + custom
setupConveyorStore({ types, models: modelsWithColor }, false); // FAIL
// types: custom; model: custom
setupConveyorStore({ types, models: modelsWithOnlyColor }, false);
// @ts-expect-error | types: custom; model: default
setupConveyorStore({ types, models: modelsWithOutColor }, false); // FAIL

// @ts-expect-error | types: none; model: default + custom
setupConveyorStore({ models: modelsWithColor }, false); // FAIL
// @ts-expect-error | types: none; model: custom
setupConveyorStore({ models: modelsWithOnlyColor }, false); // FAIL
// @ts-expect-error | types: none; model: default
setupConveyorStore({ models: modelsWithOutColor }, false); // FAIL
