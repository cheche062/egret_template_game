/**
 * xzby on 15-2-11.
 * 资源加载工具类，
 */
class ResourceUtils {
    private static _instance: ResourceUtils;
    /**资源组加载的各种事件*/
    private _groupsEvents: { [key: string]: { success?: Function, error?: Function, progress: Function, thisObject?: any } } = {};

    /**
     * 构造函数
     */
    public constructor() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        // RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, this);
    }

    public static get instance(): ResourceUtils {
        return this._instance = this._instance || new ResourceUtils();
    }

    /**加载资源配置文件*/
    public async loadConfig(data: { url: string, resourceRoot: string }[]) {
        for (let i = 0; i < data.length; i++) {
            await RES.loadConfig(data[i].url, data[i].resourceRoot);
        }
    }

    /**注册加载事件*/
    public registerLoadEvent(name: string, thisObject?: any, success?: Function, error?: Function, progress?: Function) {
        this._groupsEvents[name] = {
            thisObject,
            success,
            error,
            progress
        }
    }

    /**
     * 加载资源组
     * @param name 资源组名称
     */
    public loadGroup(name: string, priority?: number, reporter?: RES.PromiseTaskReporter): Promise<void> {
        return RES.loadGroup(name, priority, reporter);
    }

    /**
     * 同时加载多个组
     * @param $groupName 自定义的组名称
     * @param $subGroups 所包含的组名称或者key名称数组
     */
    public loadGroups(groupName, groupList:string[], priority?: number, reporter?: RES.PromiseTaskReporter): Promise<void> {
        if (RES.getGroupByName(groupName)) {
            throw Error(`已存在资源组名：${groupName}`);
        }
        RES.createGroup(groupName, groupList);
        return this.loadGroup(groupName, priority, reporter);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        if (this._groupsEvents[groupName]) {
            var success: Function = this._groupsEvents[groupName].success;
            var thisObject: any = this._groupsEvents[groupName].thisObject;
            if (success) {
                success && success.call(thisObject, event);
                this._groupsEvents[groupName] = null;
                delete this._groupsEvents[groupName];
            }
        }
    }

    /**
     * 资源组加载进度
     * event.itemsLoaded, event.itemsTotal
     */
    private onResourceLoadProgress(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        if (this._groupsEvents[groupName]) {
            var progress: Function = this._groupsEvents[groupName].progress;
            var thisObject: any = this._groupsEvents[groupName].thisObject;

            if (progress) {
                progress && progress.call(thisObject, event);
            }
        }
    }

    /**
     * 资源组加载失败
     * @param event
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        console.log("load group error: ", groupName);
        if (this._groupsEvents[groupName]) {
            var error: Function = this._groupsEvents[groupName].error;
            var thisObject: any = this._groupsEvents[groupName].thisObject;
            if (error) {
                error && error.call(thisObject, event);
            }
        }
    }

    /**
     * 获取文件的真实路径
     */
    public getFileRealPath(key: string): string {
        let fileInfo = RES.getResourceInfo(key);
        return fileInfo.root + fileInfo.url;
    }
}
