const debug = require('debug')('trader:actions:positions');
import positions from '../services/blotter'
import teamTrades from '../services/teamTrades'

export const RECEIVE_POSITION = 'RECEIVE_POSITION';
export const RECEIVE_TEAM_TRADE = 'RECEIVE_TEAM_TRADE';
export const RECEIVE_TEAM_TRADE_BATCH = 'RECEIVE_TEAM_TRADE_BATCH';
export const CHANGE_TAB = 'CHANGE_TAB';

export function subscribePositions() {
  return function (dispatch) {
    return positions.subscribe(position => {
      return dispatch(receivePosition(position));
    })
  };
}

export function receivePosition(position) {
  return {
    type: RECEIVE_POSITION,
    position: position
  }
}

export function subscribeTeamTrades() {
  return function (dispatch) {
    teamTrades.buffer(teamTrades.debounce(75)).subscribe(trades => {
      return dispatch(receiveTeamTradeBatch(trades));
    });
  };
}

export function receiveTeamTradeBatch(trades) {
  debug('receiveTeamTradeBatch()');
  return {
    type: RECEIVE_TEAM_TRADE_BATCH,
    trades
  }
}

export function receiveTeamTrade(trade) {
  debug('receiveTeamTrade()');
  return {
    type: RECEIVE_TEAM_TRADE,
    trade
  }
}

export function changeTab(value) {
  return {
    type: CHANGE_TAB,
    value
  }
}