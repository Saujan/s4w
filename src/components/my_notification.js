import { Button, notification } from 'antd';

function NotificationManager(type, msg) {
    var config = {
          placement: 'bottomRight',
          bottom: 50,
          duration: 3,
          message: '',
          description: msg
        };
    if (type == "success"){
        config['message'] = "Success"
        notification.success(config)
    }
    else{
        config['message'] = "Error"
        notification.error(config)

    }

}
export function MyNotification(type, msg) {
    NotificationManager(type, msg)
    return ""
}

export default MyNotification;