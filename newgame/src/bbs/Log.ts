/**
 * xzby on 2014/11/22.
 */
class Log {
    /**
     * Debug
     */
    public static log(...optionalParams): void {
        if (!ConstData.Isdebug) {
            return;
        }
       
        let message =optionalParams.shift();
        console.log(message, ...optionalParams);
    }

    public static debug(...optionalParams) {
        Log.log(optionalParams);
    }

    /**
     * Info
     */
    public static info(...optionalParams): void {
        let message = "[Info]" + optionalParams.shift();
        console.log(message, ...optionalParams);
    }

    /**
     * Warn
     */
    public static warn(...optionalParams): void {
        let message = "[Warn]" + optionalParams.shift();
        console.warn(message, ...optionalParams);
    }

    /**
     * Error
     */
    public static error(...optionalParams): void {
        let message = "[Error]" + optionalParams.shift();
        console.error(message, ...optionalParams);
    }
}