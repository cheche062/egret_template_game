/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    navigateToMiniProgram(object);
    checkVideoAd(backCall);
    showVideoAd(backCall);
    adPointShow(adUnitId);
    getXmadGame(): any;
    getFileUtil(): any;
    getFileSystemManager();
    loadSubpackage(object);
    loginByWX();
    loginByHortor(weak?, decode?);
    getUserInfo(): Promise<any>;
    previewImage(img);
    getPerformance();
    /**创建微信音频实例*/
    createInnerAudioContext();
    offHide(callback);
    shareMessageSDK(shareData);
    shareMessage(object: { shareType?, title?, imageUrl?, query?}, toGroup?: Boolean): Promise<any>;
    checkIPs(interfaceId, funCallback);
    /**
     * miniSDK 强登陆
     * @param object 创建用户信息按钮 https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
     * @param style  创建用户信息按钮 style 的结构
     * @returns Promise
     */
    hortorLogin(object?: any, style?: any): Promise<any>;

    /**
     * miniSDK 弱登陆
     * @param object 创建用户信息按钮 https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
     * @param style  创建用户信息按钮 style 的结构
     * @returns Promise
     */
    hortorWeakLogin(object?: any, style?: any): Promise<any>;

    /**
     * miniSDK 解密强登陆
     * @param object 创建用户信息按钮 https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
     * @param style  创建用户信息按钮 style 的结构
     * @returns Promise
     */
    hortorDecodeLogin(object?: any, style?: any): Promise<any>;

    /**
     * miniSDK 解密弱登陆
     * @param object 创建用户信息按钮 https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
     * @param style  创建用户信息按钮 style 的结构
     * @returns Promise
     */
    hortorDecodeWeakLogin(object?: any, style?: any): Promise<any>;

    login(): Promise<any>;

    getSystemInfo(): Promise<any>;

    showShareMenu(): Promise<any>;
    sharePointShow(type);
    /**
     * 主动拉起转发，进入选择通讯录界面。
     * @param {{title; imageUrl?; query?}} object   https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     * @param {Boolean=false} toGroup    是否需要分享到组 只支持微信2.0 之前到版本 2.1 后版本API 不支持
     * @returns {Promise<any>}
     */
    shareAppMessage(object: { shareType?, title?, imageUrl?, query?}, toGroup?: Boolean): Promise<any>;

    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     * object https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     */
    onShareAppMessage(object: any): Promise<any>;

    requestMidasPayment(id: number): Promise<any>;

    getLaunchOptionsSync();

    vibrateShort(): Promise<any>;

    vibrateLong(): Promise<any>;
    triggerGC();
    /**
     * 进入客服会话，要求在用户发生过至少一次 touch 事件后才能调用。
     * @param {{content 会话内消息卡片标题; thumb 会话内消息卡片图片路径}} object
     * @returns {Promise<any>}
     */
    callcustomerservice(object: { content, thumb }): Promise<any>;

    /**
     * 获取用户信息按钮
     * @param object 创建用户信息按钮 https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
     * @param style  创建用户信息按钮 style 的结构
     */
    createUserInfoButton(object?: any, style?: any): Promise<any>;


    /**
     * 接入微信广告
     * @param {{buttons: Array<any>; thisObject; success: Function; adUnitId?}} object
     * @param {{title; imageUrl?; query?}} shareObj    (default null 不转换为分享接口)  https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     * @param {boolean} toGroup  是否需要分享到组 只支持微信2.0 之前到版本 2.1 后版本API 不支持
     * @returns {Promise<any>}
     * @catch  {error} error.code 1:load error 不能加载广告， error.code 2:load error 不能播放广告  ,3 无效分享
     */
    createRewardedVideoAd(object?: { buttons: Array<any>, thisObject, success: Function, adUnitId?}): Promise<any>;


    /**
     * 游戏业务逻辑中只绑定一次
     * 监听小游戏回到前台的事件 游戏业务逻辑中只绑定一次
     * @param callback
     */
    onShow(callback);

    /**
     * 游戏业务逻辑中只绑定一次
     * 监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     * @param callback
     */
    onHide(callback);

    /**
     *
     * @param object
     */
    showToast(object);

    /**
     *
     */
    hideToast();

    exitMiniProgram(object): Promise<any>;

    /**写入玩家排行数据*/
    setUserCloudStorage(object): Promise<any>;
    /**获取微信开放数据域*/
    getOpenDataContext();
    /**获取微信主域和开放数据域共享的 sharedCanvas*/
    getSharedCanvas();
}
class DebugPlatform implements Platform {
    navigateToMiniProgram(object) { }
    checkVideoAd(backCall) { };
    showVideoAd(backCall) { };
    adPointShow(adUnitId) { };
    getXmadGame(): any { }
    getFileUtil(): any {
    }
    getFileSystemManager() { };
    loginByWX() { }
    loadSubpackage(object) { }
    async  triggerGC() { }
    loginByHortor(weak?, decode?) { }
    async getUserInfo() {
        return Promise.resolve({
            nickName: "username",
            encryptedData: '1234',
            iv: '1234',
            userInfo: {
                avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKGhw7omOMLwavZVuUwuVb8ANFw5jsUp6JTMy9icZt2gCCzAfCuuSpOoaMEADvSibcUc1Xpn1Rnk0lw/132',
                nickName: '大闸蟹',
            },
        })
    }
    async sharePointShow(type) { }
    async offHide(callback) {

    }
    async checkIPs(interfaceId, funCallback) {

    }
    async shareMessage(object: { title, imageUrl?, query?}, toGroup = false) {

    }
    async shareMessageSDK(shareData) {

    }
    async hortorLogin(object?: any, style?: any) {

    }

    async createInnerAudioContext() {

    };
    async previewImage(img) { }
    async hortorDecodeLogin(object?: any, style?: any) {

    }

    async hortorDecodeWeakLogin(object?: any, style?: any) {

    }

    async weakLogin(object?: any, style?: any) {

    }


    async login() {
        //return Promise.resolve(onSuccess, onShowBtn);
        // onSuccess();
        // onShowBtn();
    }

    async getSystemInfo() {
        return Promise.resolve({
            statusBarHeight: 20,
            pixelRatio: window.devicePixelRatio,
            windowWidth: document.body.clientWidth,
            windowHeight: document.body.clientHeight
        })
    }

    async showShareMenu() {

    }

    async hortorWeakLogin(object: any, style?: any) {

    }

    /**
     * 主动拉起转发，进入选择通讯录界面。
     * object https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     */
    async  shareAppMessage(object: { title, imageUrl?, query?}, toGroup = false) {

    }

    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     * object https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     */
    async onShareAppMessage(object: any) {

    }

    async requestMidasPayment(id: number) {

    }

    async getLaunchOptionsSync() {

    }

    async vibrateShort() {
    }

    async vibrateLong() {
    }

    async callcustomerservice(object) {

    }

    async createUserInfoButton(object: any, style?: any) {

    }

    async createRewardedVideoAd(object: any) {

    }

    async onShow(callback) {
    }

    async onHide(callback) {
    }

    async showToast(object) { }

    async hideToast() { }

    async exitMiniProgram() {

    }
    async getPerformance() {

    }
    setUserCloudStorage(object): Promise<any>{
        return new Promise((r, j)=>{r()});
    }

    getOpenDataContext(){}
    getSharedCanvas(){}
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}


declare let platform: Platform;

declare interface Window {

    platform: Platform
}





