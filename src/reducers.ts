import * as _ from 'lodash';
import { types, util } from 'vortex-api';

import * as actions from './actions';
import { highlightConflictIcon } from './actions';

/**
 * reducer for changes to ephemeral session state
 */
const sessionReducer: types.IReducerSpec = {
  reducers: {
    [actions.setSource as any]: (state, payload) => {
      if (_.isEqual(payload, util.getSafe(state, ['connection', 'source'], undefined))) {
        // unchanged
        return state;
      }

      if (payload.pos !== undefined) {
        return util.setSafe(state, ['connection', 'source'], payload);
      } else if (payload.id === util.getSafe(state, ['connection', 'source', 'id'], undefined)) {
        return util.setSafe(state, ['connection', 'source'], undefined);
      } else {
        return state;
      }
    },
    [actions.setTarget as any]: (state, payload) => {
      if ((payload.pos !== undefined)
          && ((payload.id !== null)
              || (state.connection === undefined)
              || (state.connection.target === undefined)
              || (state.connection.target.id === undefined)
              || (state.connection.target.id === null))) {
        return util.setSafe(state, ['connection', 'target'], payload);
      } else if (payload.id === util.getSafe(state, ['connection', 'target', 'id'], undefined)) {
        return util.setSafe(state, ['connection', 'target'], undefined);
      } else {
        return state;
      }
    },
    [actions.setCreateRule as any]:
        (state, payload) => util.setSafe(state, ['dialog'], payload),
    [actions.closeDialog as any]:
        (state, payload) => util.setSafe(state, ['dialog'], undefined),
    [actions.setType as any]:
        (state, payload) => util.setSafe(state, ['dialog', 'type'], payload),
    [actions.setConflictInfo as any]:
        (state, payload) => util.setSafe(state, ['conflicts'], payload),
    [actions.setConflictDialog as any]:
        (state, payload) => util.setSafe(state, ['conflictDialog'], payload),
    [actions.highlightConflictIcon as any]:
        (state, payload) => util.setSafe(state, ['highlightConflicts'], payload),
    [actions.setEditCycle as any]:
        (state, payload) => util.setSafe(state, ['editCycle'], payload),
  },
  defaults: {
    connection: undefined,
    dialog: undefined,
    highlightConflicts: false,
    conflicts: {},
    conflictDialog: undefined,
    editCycle: undefined,
  },
};

export default sessionReducer;
