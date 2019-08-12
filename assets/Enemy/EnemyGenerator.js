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
        enemyPrefab: cc.Prefab,
        area: 200,
        timer: 2,
        timerCooldown: 3,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scheduleOnce(this.initializeGeneration, this.timerCooldown);
    },

    generate : function(){
        let enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this.node.parent;

        let position = new cc.v2(Math.random() - .5, Math.random() - .5);
        position = position.normalize();
        position = position.mul(this.area);
        position = this.node.position.add(position);

        enemy.position = position;
    },

    initializeGeneration : function(){
        this.schedule(this.generate, this.timer)
    },

    start () {

    },

    // update (dt) {},
});
