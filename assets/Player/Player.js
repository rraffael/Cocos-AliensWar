let Character = require("Character");

cc.Class({
    extends: Character,

    properties: {
        _acceleration: false,
        speed: 200,
        health: 100,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function () {
        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyPress, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyRelease, this)

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.changeDirection, this);
        canvas.on("mousedown", this.fire, this);
    },

    keyPress : function (event) {
        if(event.keyCode == cc.macro.KEY.d){
            this._acceleration = true
        }
    },

    keyRelease : function () {
        this._acceleration = false
    },

    changeDirection : function (event) {
        let mousePosition = event.getLocation();
        mousePosition = new cc.v2(mousePosition.x, mousePosition.y);
        
        let direction = mousePosition.sub(this.node.position);
        this._direction = direction.normalize();
    },

    damaged: function(dano){
        this.health -= dano;
        if(this.health <= 0)
            this.node.destroy();
    },

    start () {},

    update (dt) {
        if(this._acceleration){
            let displacement = this._direction.mul(this.speed * dt)
            this.node.position = this.node.position.add(displacement);
        }
    },
});
