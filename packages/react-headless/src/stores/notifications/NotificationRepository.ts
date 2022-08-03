import { postAPI } from '../../lib/ajax';
import INotificationRepository from '../../types/INotificationRepository';
import { QueryParams } from '../../types/INotificationsStoresCollection';
import INotificationStore from '../../types/INotificationStore';
import IRemoteNotification from '../../types/IRemoteNotification';
import RemoteRepository from '../repository/RemoteRepository';

interface IWrappedNotification {
  notification: IRemoteNotification;
}

/**
 * Class to interact with the notification API endpoints.
 *
 * @example
 * const repo = new NotificationRepository();
 * const notifications = repo.findBy({ unseen: true });
 */
export default class NotificationRepository
  extends RemoteRepository<IWrappedNotification, INotificationStore>
  implements INotificationRepository
{
  constructor(remotePathOrUrl = '/notifications') {
    super(remotePathOrUrl);
  }

  markAsRead(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/read`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  markAsUnread(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/unread`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  markAllAsSeen(params?: Omit<QueryParams, 'page' | 'per_page'>) {
    const url = `${this.remotePathOrUrl}/seen`;
    return postAPI(url, undefined, params)
      .then(() => true)
      .catch(() => false);
  }

  markAllAsRead(params?: Omit<QueryParams, 'page' | 'per_page'>) {
    const url = `${this.remotePathOrUrl}/read`;
    return postAPI(url, undefined, params)
      .then(() => true)
      .catch(() => false);
  }
}
