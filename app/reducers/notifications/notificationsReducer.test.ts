import notificationsReducer from '@reducers/notifications/notificationsReducer';
import { INotificationsState } from '@states/iNotificationsState';
import { NotificationsActionTypes } from '@actions/notifications/notificationsActionTypes';
import { NotificationsAction } from '@actions/notifications/notificationsAction';

describe('NotificationsReducer', () => {
  const mockState: INotificationsState = {
    notifications: ['1'],
  };

  it('should return passed state for GET_NOTIFICATIONS action', () => {
    const action: NotificationsAction = {
      type: NotificationsActionTypes.GET_NOTIFICATIONS,
    };
    const newState: INotificationsState = notificationsReducer(mockState, action);

    expect(newState).toEqual(mockState);
  });

  describe('ADD_NOTIFICATION', () => {
    it('should return new state with added notification', () => {
      const action: NotificationsAction = {
        type: NotificationsActionTypes.ADD_NOTIFICATION,
        payload: 'ADD_NOTIFICATION reducer has been called',
      };
      const newState: INotificationsState = notificationsReducer(mockState, action);

      expect(newState.notifications.length).toEqual(2);
      expect(newState.notifications[0]).toEqual(mockState.notifications[0]);
      expect(newState.notifications[1]).toEqual(action.payload);
    });

    it('should return new state with replaced oldest element if more than 2 notifications', () => {
      const fullMockState: INotificationsState = {
        ...mockState,
        notifications: mockState.notifications.concat('2'),
      };
      const action: NotificationsAction = {
        type: NotificationsActionTypes.ADD_NOTIFICATION,
        payload: 'ADD_NOTIFICATION reducer has been called',
      };
      const newState: INotificationsState = notificationsReducer(fullMockState, action);

      expect(newState.notifications.length).toEqual(2);
      expect(newState.notifications[0]).toEqual('2');
      expect(newState.notifications[1]).toEqual(action.payload);
    });
  });

  it('should return state with removed notification for REMOVE_NOTIFICATION action', () => {
    const action: NotificationsAction = {
      type: NotificationsActionTypes.REMOVE_NOTIFICATION,
      payload: 0,
    };
    const newState: INotificationsState = notificationsReducer(mockState, action);

    expect(newState.notifications.length).toEqual(0);
  });
});
