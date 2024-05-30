import type { AxiosInstance } from "axios";
import Echo from "laravel-echo";
import { route as ziggyRoute } from "ziggy-js";
import Pusher from "pusher-js";

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo;
        Pusher: Pusher;
    }

    var route: typeof ziggyRoute;
}
