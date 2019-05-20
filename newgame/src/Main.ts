
class Main extends eui.UILayer {
    /**资源配置文件*/
    private loadconfig_list:{url:string, resourceRoot:string}[] = [
        {url: "resource/default.res.json", resourceRoot: "resource/"} 
    ];

    protected createChildren(): void {
        super.createChildren();

        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.start();
    }

    private async start() {
        await bbs.screen.init(this.stage);

        // 初始化所有场景
        this.initScene();
        //模块初始化
        this.initModule();

        await ResourceUtils.instance.loadConfig(this.loadconfig_list);

        //加载loading资源组
        await RES.loadGroup("loading");

        // 加载皮肤主题配置文件
        await this.loadTheme();

        //检查版本号
        await this.checkRes();

        //预加载preload资源组
        await ResourceUtils.instance.loadGroup("preload");

        //实例化Http请求
        // App.Http.initServer(HttpConst.HttpUrl);

        // 加载线上数据

        //发布资源加载完毕消息

        // 初始化音效

    }

    private checkRes() {
        //1. 检查版本号
        /*
         * 是否清楚缓存 重新更新
         */
        let PublishResAddr = "https://fish2static.spsiot.cn/";
        // let resExt = PublishResAddr == '' ? '' : (ConstData.Isdebug ? '_test_' + ConstData.ver : '_' + ConstData.ver);
        // let resExt = PublishResAddr == '' ? '' : (ConstData.Isdebug ? '_test_' + "1.4.0" : '_' + "1.4.0");
        let resExt = "_1.4.0";
        let resPath = `${PublishResAddr}resource${resExt}`;

        return new Promise((resolve, reject) => {
            bbs.Version.checkRes('res_version', `${resPath}/online.ver.json`)
                .then(res => {
                    Log.log(`res_version: check(${res})`);
                    if (res == bbs.VersionCheckResult.localOld) {
                        bbs.Version.clearRes();
                    }
                    bbs.Version.loadResComplete();
                    resolve();
                });
        })
    }

    private async runGame() {
        await this.loadResource()
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    /**
     * 初始化所有场景
     */
    private initScene(): void {
        // App.SceneManager.register(SceneConsts.Game, new GameScene());
    }

    /**
     * 初始化所有模块
     */
    private initModule(): void {
        // App.ControllerManager.register(ControllerConst.Login, new LoginController());
    }

}
