/**
 * xzby on 2014/11/22.
 * Http请求处理
 */
class Http {
    private static _instance: Http;

    private _serverUrl: string;
    private _urlLoader: egret.URLLoader;
    private _request: egret.URLRequest;
    private _cache: Array<any>;
    private _cacheData: string;
    private _isRequesting: boolean;
    private _data: DynamicChange;
    private _type: string;
    //=============================================
    public requestIdHash
    public _requestId: number;
    /**
     * 构造函数
     */
    public constructor() {
        this._data = new DynamicChange();
        this._cache = [];
        this._requestId = 0;
        this._request = new egret.URLRequest();
        this._request.method = egret.URLRequestMethod.POST;

        this._urlLoader = new egret.URLLoader();
        this._urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
    }

    public static get instance(): Http {
        return this._instance = this._instance || new Http();
    }

    /**
     * 初始化服务器地址
     * @param serverUrl服务器链接地址
     */
    public initServer(serverUrl: string): void {
        this._serverUrl = serverUrl;
    }

    /**
     * 数据缓存
     * @returns {DynamicChange}
     * @constructor
     */
    public get Data(): DynamicChange {
        return this._data;
    }

    /**
     * Http错误处理函数
     * @param e
     */
    private onError(e: egret.Event): void {

        this.nextPost();
    }

    /**
     * 请求数据
     * @param    type
     * @param    t_variables
     */
    public send(type: string, urlVariables: egret.URLVariables, data?): void {
        this._cache.push([type, urlVariables]);

        this.post(data);
    }

    /**
     * 请求服务器
     */
    private post(data?): void {
        if (this._isRequesting) {
            return;
        }

        if (this._cache.length == 0) {
            return;
        }

        var arr: Array<any> = this._cache.shift();
        var type: string = arr[0];
        var urlVariables: egret.URLVariables = arr[1];
        this._type = type;
        this._request.url = this._serverUrl;
        if (data) { this._request.data = data; } else {
            this._request.data = urlVariables.variables["data"];
        }

        this._urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoaderComplete, this);
        this._urlLoader.load(this._request);
        this._isRequesting = true;
    }

    /**
     * 数据返回
     * @param event
     */
    private onLoaderComplete(event: egret.Event): void {
        this._urlLoader.removeEventListener(egret.Event.COMPLETE, this.onLoaderComplete, this);
        var t_obj: any = JSON.parse(this._urlLoader.data);
        if (!t_obj.hasOwnProperty("s") || t_obj["s"] == 0) {
            this._data.pUpdate.update(this._type, t_obj);
            App.MessageCenter.dispatch(this._type, t_obj);
        }
        else {
            Log.log("Http错误:" + t_obj["s"]);
        }
        this.nextPost();
    }

    /**
     * 开始下一个请求
     */
    private nextPost(): void {
        this._isRequesting = false;
        this.post();
    }
}
