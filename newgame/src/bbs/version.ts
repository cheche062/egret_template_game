namespace bbs {
    export enum VersionCheckResult { localOld = 1, remoteOld, Equal };
    export class Version {
        private static _versionKey;
        private static _remoteVer;
        private static _onlineGroup: Array<string> = ["online_map2", "online_map3", "online_map4", "online_map5", "online_map6"];
        static checkRes(versionKey, remotePath): Promise<any> {
            return new Promise((resolve, reject) => {
                this._versionKey = versionKey;

                let remote = undefined, local = App.LocalStorage.getKey(versionKey) || '0';
                let checkFn = () => {
                    if (!local || !remote) return;
                    if (parseInt(local) == parseInt(remote)) {
                        resolve(VersionCheckResult.Equal);
                    } else if (parseInt(local) < parseInt(remote)) {
                        resolve(VersionCheckResult.localOld);
                    } else if (parseInt(remote) < parseInt(local)) {
                        resolve(VersionCheckResult.remoteOld);
                    }
                };

                Log.log(`${versionKey}: local(${local})`);

                RES.getResByUrl(remotePath, res => {
                    remote = res[versionKey];
                    this._remoteVer = remote;
                    Log.log(`${versionKey}: remote(${remote})`);
                    checkFn();
                }, this, 'json');
            });
        }

        static loadResComplete() {
            App.LocalStorage.setKeyValue(this._versionKey, this._remoteVer);
            setTimeout(() => platform.getFileUtil().bbs.startCache(), 8000);
        }
        static clearRes() {
            platform.getFileUtil().fs.remove('https');
            // Log.log(`${this._versionKey}: clearRes.`);
        }
        /**加载线上分组 */
        static loadOnlineGroup(resources, loadComplete: Function, initComplete: Function) {

            App.ViewManager.loadResource.call(this, resources, loadComplete, initComplete);
            bbs.Version.getNetworkType();
        }
        /**加载全部分组 */
        static loadOnlineTotalGroup() {
            // let resources = ["online_map2", "online_map3", "online_map4", "online_map5", "online_map6"];
            // App.ViewManager.loadResource.call(this, resources, this.loadOnlineTotalGroupComplet, null);
        }
        /**加载全部分组 */
        static loadOnlineTotalGroupComplet(resources, loadComplete: Function, initComplete: Function) {
            Log.log("所有分组加载完成");
        }
        /**获取手机网络 */
        static getNetworkType() {
            let self = this;
            let obj = {
                success(res) {
                    /**如果是wifi 就全部加载 以免夜长梦多 */
                    if (res.networkType == "wifi") {
                        bbs.Version.loadOnlineTotalGroup();
                    }
                },
                fail(res) {
                }, 
                complete(res) {
                }
            }
            wx.getNetworkType(obj);
        }
    }

}