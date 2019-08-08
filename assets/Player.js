// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        _acceleration: false,
        _direcao: cc.v2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this)

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.mudarDirecao, this);
    },

    teclaPressionada : function (event) {
        if(event.keyCode == cc.macro.KEY.d){
            this._acceleration = true
        }
    },

    teclaSolta : function (event) {
        this._acceleration = false
    },

    mudarDirecao : function (event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.v2(posicaoMouse.x, posicaoMouse.y);
        
        let direcao = posicaoMouse.sub(this.node.position);
        this._direcao = direcao.normalize();
    },

    start () {

    },

    update (dt) {
        if(this._acceleration){
            this.node.position = this.node.position.add(this._direcao);
        }
           
    },
});
