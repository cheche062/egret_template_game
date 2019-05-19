namespace bbs {
    export class screen {
        static DESGIN_W: number = 750;
        static DESGIN_H: number = 1334;
        static APP_W: number = 0;
        static APP_H: number = 0;
        static APP_FACTOR: number = 0; //真实设备尺寸与当前页面被缩放后的尺寸的比例；
        static devicePixelRatio: number = 0;
        static frameRate: number = 0;
        static statusBarHeight: number = 0;
        static sysInfo: any = 0;
        static center: { x, y } = { x: 0, y: 0 };

        static init(stage: egret.Stage): Promise<any> {
            screen.frameRate = stage.frameRate;
            return new Promise((resolve, reject) => {
                platform.getSystemInfo().then(res => {
                    screen.statusBarHeight = res.statusBarHeight * res.pixelRatio;
                    let scale = screen.DESGIN_W / (res.windowWidth * 2);
                    screen.APP_H = Math.ceil((res.windowHeight * 2) * scale);
                    screen.APP_W = screen.DESGIN_W;
                    screen.APP_FACTOR = res.pixelRatio * res.screenWidth / screen.APP_W;
                    screen.center = { x: screen.APP_W / 2, y: screen.APP_H / 2 };
                    screen.devicePixelRatio = res.pixelRatio;
                    screen.sysInfo = res;
                });
            })

        }

        /** 
         * 将设计稿中的像素值转换为真实的设备像素值;
         */
        static dev_px(design_px: number): number {
            return bbs.screen.APP_FACTOR * design_px;
        }
        static get is_devtools(): boolean {
            return this.sysInfo.platform.indexOf("devtools") >= 0;
        }

        static get is_android(): boolean {
            return this.sysInfo.system.indexOf("Android") >= 0;
        }

        static get is_ios(): boolean {
            return this.sysInfo.system.indexOf("iOS") >= 0;
        }
    }
}

