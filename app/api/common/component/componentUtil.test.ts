import { notification } from 'antd';
import ComponentUtil from './componentUtil';

describe('ComponentUtil class', () => {
  describe('openNotification function', () => {
    it('should open notification with default header', () => {
      spyOn(notification, 'open');
      const mockDescription = 'Example description';
      ComponentUtil.openNotification(mockDescription);

      expect(notification.open).toHaveBeenCalledWith({
        message: 'ID3 Editor',
        description: mockDescription,
      });
    });
  });
});
