import { Inject } from '../decorators/main.decorator.js';
import { Notification } from './notification.class.js';

class NotificationService {
    constructor($http) {
        this.injections = {
            $http: $http
        };

        this._initializeState();
        this._addFakeNotifications();
    }

    getQueue(params = { active: true }) {
        return this.state.queue;
    }

    close(params = { notification: null }) {
        this.injections.$http({
            url: '/xxx.json',
            method: 'PATCH',
            data: params
        });
    }

    addNotification(params = { notification: null }) {
        let notification = params.notification;

        if (!(params.notification instanceof Notification)) {
            notification = new Notification({ state: notification });
        }

        this.state.queue.push(notification);
    }

    _addFakeNotifications() {
        for (let i = 0; i < 3; i++) {
            this.state.queue.push(new Notification({ state: {
                from: 'userManagement',
                category: Notification.CATEGORIES.INFO,
                header: 'Password expiration',
                content: 'Your password expires in the next 2 days, please change it using the user management interface.',
                type: Notification.TYPES.NOTE
            }}));
        }
    }

    _initializeState() {
        this.state = _.merge({
            queue: []
        }, this.state || {});
    }

    @Inject('$http')
    static instanceFactory($http) {
        return new NotificationService($http);
    }
}

export default NotificationService;
export { NotificationService };