export class Alert {
    key?: string;
    summary?: AlertType;
    severity?: string;
    detail?: String;
    closable?: boolean;
    fade ?: boolean;
    keepAfterRouteChange ?: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}