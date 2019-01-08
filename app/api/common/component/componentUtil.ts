import { notification } from 'antd';

export default class ComponentUtil {
  public static openNotification(description: string): void {
    notification.open({
      description,
      message: 'ID3 Editor',
    });
  }
}
